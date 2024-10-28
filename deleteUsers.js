const admin = require('firebase-admin');


const serviceAccount = require('./registrappmain-firebase-adminsdk-jvsnt-ace26567d7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();


async function deleteAllFirestoreUsers() {
  try {
    const usersCollection = firestore.collection('usuarios');
    const snapshot = await usersCollection.get();

    if (snapshot.empty) {
      console.log('No hay documentos en la colección usuarios.');
      return;
    }

 
    const batch = firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

   
    await batch.commit();
    console.log(`Eliminados ${snapshot.size} documentos de la colección 'usuarios'`);
  } catch (error) {
    console.error('Error al eliminar documentos de Firestore:', error);
  }
}


deleteAllFirestoreUsers();
