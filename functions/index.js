const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.checkUserRole = functions.database.ref('Users/C29iALoFhFUZg60xeJujX53pS2I3').onWrite(async (change, context) => {
  const userRef = admin.database().ref(`Users/${context.params.uid}`);
  const snapshot = await userRef.once('value');
  const role = snapshot.child('role').val();

  if (role === 'TEACHER') {
    await admin.auth().setCustomUserClaims(context.params.uid, { admin: true });
  } else {
    await admin.auth().setCustomUserClaims(context.params.uid, { admin: false });
  }
});
