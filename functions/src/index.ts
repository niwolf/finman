import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import DocumentReference = admin.firestore.DocumentReference;
import DocumentSnapshot = admin.firestore.DocumentSnapshot;
admin.initializeApp();

const db = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.calcCurrentBudget = functions.firestore.document('/users/{userId}/items/{itemId}')
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
                                         // const initialBudget: {cash:number, account:number} = userDocSnap.get('initialBudget');
                                         // const itemCollection:CollectionReference = db.collection(`/users/${userId}/items`);
                                         // const items:DocumentReference[] = await itemCollection.listDocuments();
                                         // const cashSum:number = items.filter(item => item.)
                                         console.error('No current budget available');
                                         return null;
                                       }
                                     });
