const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.makeTeacherAdmin = functions.database
  .ref('Users/{uid}')
  .onCreate((snapshot, context) => {
    const { uid } = context.params;
    const { role } = snapshot.val();
    if (role === 'TEACHER') {
      return admin.database().ref(`Admins/${uid}`).set({ admin: true });
    } else {
      return null;
    }
  });
