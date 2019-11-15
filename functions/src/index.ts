import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import CollectionReference = admin.firestore.CollectionReference;
import Timestamp = admin.firestore.Timestamp;

import Change = functions.Change;
import EventContext = functions.EventContext;



interface Item {
  title: string;
  value: number;
  date: Timestamp;
  origin: 'cash' | 'account';
}

const db = admin.firestore();

async function initCurrentBudget(userDocSnap: DocumentSnapshot, userId:string, userDoc: DocumentReference)
{
  const initialBudget: { cash: number, account: number } = userDocSnap.get('initialBudget');
  const itemCollection: CollectionReference = db.collection(`/users/${userId}/items`);
  const itemDocRefs: DocumentReference[] = await itemCollection.listDocuments();
  const itemDocPromises: Promise<DocumentSnapshot>[] = itemDocRefs.map(doc => doc.get());
  const itemDocSnaps: DocumentSnapshot[] = await Promise.all(itemDocPromises);
  const items: Item[] = itemDocSnaps.map(snap => snap.data() as Item);

  const reducer = (acc: number, curr: Item) => acc + curr.value;
  const cashSum: number = items.filter(item => item.origin === 'cash').reduce(reducer, 0);
  const accountSum: number = items.filter(item => item.origin === 'account').reduce(reducer, 0);

  const newBudget = {
    cash:    initialBudget.cash + cashSum,
    account: initialBudget.account + accountSum
  };

  console.log('Budget created for user', userId);
  return userDoc.update('currentBudget', newBudget);
}

function updateCurrentBudget(currentBudget: { cash: number; account: number }, change:Change<DocumentSnapshot>, userId:string, userDoc:DocumentReference)
{
  // Get an object with the current document value.
  // If the document does not exist, it has been deleted.
  const doc = change.after.exists ? change.after : change.before;

  const origin = doc.get('origin');
  let value:number = doc.get('value');
  if(!change.after.exists) { value = change.before.get('value') * -1; } // document deleted
  if(change.after.exists && change.before.exists) { value = change.after.get('value') - change.before.get('value') } // document updated

  const newBudget: { cash: number, account: number } = {
    cash:    currentBudget.cash,
    account: currentBudget.account
  };
  if (origin === 'cash')
  {
    newBudget.cash += value;
  } else if (origin === 'account')
  {
    newBudget.account += value;
  }
  console.log('Budget updated for user', userId);
  return userDoc.update('currentBudget', newBudget);
}

async function updateBudget(change: Change<DocumentSnapshot>, context: EventContext)
{
  // Grab the current values.
  const userId = context.params.userId;
  const userDoc: DocumentReference = db.doc(`/users/${userId}`);
  const userDocSnap: DocumentSnapshot = await userDoc.get();
  const currentBudget: { cash: number, account: number } = userDocSnap.get('currentBudget');

  if (currentBudget)
  {
    return updateCurrentBudget(currentBudget, change, userId, userDoc);
  } else
  {
    return initCurrentBudget(userDocSnap, userId, userDoc);
  }
}

// Listens for new items created by a user and re-calculates his current budget
exports.updateBudget = functions.firestore.document('/users/{userId}/items/{itemId}').onWrite(updateBudget);

