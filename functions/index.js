const functions = require("firebase-functions");
const admin = require('firebase-admin');
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.checkUserRole = functions.auth.user().onCreate(async (user) => {
    const userRef = admin.database().ref(`Users/${user.uid}`);
    const snapshot = await userRef.once('value');
    const role = snapshot.child('role').val();
  
    if (role === 'TEACHER') {
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    }
  });