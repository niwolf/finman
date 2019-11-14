import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
import CollectionReference = admin.firestore.CollectionReference;
import Timestamp = admin.firestore.Timestamp;


interface Item {
  title: string;
  value: number;
  date: Timestamp;
  origin: 'cash' | 'account';
}

const db = admin.firestore();

// Listens for new items created by a user and re-calculates his current budget
exports.updateBudget = functions.firestore.document('/users/{userId}/items/{itemId}')
                                     .onCreate(async(snapshot, context) => {
                                       // Grab the current value of what was written to the Realtime Database.
                                       const value = snapshot.get('value');
                                       const origin = snapshot.get('origin');
                                       const userId = context.params.userId;
                                       const userDoc:DocumentReference = db.doc(`/users/${userId}`);
                                       const userDocSnap: DocumentSnapshot = await userDoc.get();
                                       const currentBudget: {cash: number, account: number } = userDocSnap.get('currentBudget');

                                       console.log(userId, currentBudget);

                                       if(currentBudget)
                                       {
                                         const newBudget:{cash:number, account:number} = {cash: currentBudget.cash, account: currentBudget.account};
                                         if(origin === 'cash')
                                         {
                                           newBudget.cash += value;
                                         }
                                         else if(origin === 'account')
                                         {
                                            newBudget.account += value
                                         }
                                         return userDoc.update('currentBudget', newBudget);
                                       }
                                       else
                                       {
                                         const initialBudget: {cash:number, account:number} = userDocSnap.get('initialBudget');
                                         const itemCollection:CollectionReference = db.collection(`/users/${userId}/items`);
                                         const itemDocRefs:DocumentReference[] = await itemCollection.listDocuments();
                                         const itemDocPromises: Promise<DocumentSnapshot>[] = itemDocRefs.map(doc => doc.get());
                                         const itemDocSnaps: DocumentSnapshot[] = await Promise.all(itemDocPromises);
                                         const items: Item[] = itemDocSnaps.map(snap => snap.data() as Item);

                                         const reducer = (acc:number, curr:Item) => acc + curr.value;
                                         const cashSum:number = items.filter(item => item.origin === 'cash').reduce(reducer, 0);
                                         const accountSum:number = items.filter(item => item.origin === 'account').reduce(reducer, 0);

                                         const newBudget = {
                                           cash: initialBudget.cash + cashSum,
                                           account: initialBudget.account + accountSum
                                         };
                                         console.log('Created currentBudget', newBudget);

                                         return userDoc.update('currentBudget', newBudget);
                                       }
                                     });
