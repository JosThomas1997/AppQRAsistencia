 
const admin = require('firebase-admin');

// Reemplaza './ruta/al/archivo/serviceAccountKey.json' con la ruta real de tu archivo JSON
const serviceAccount = require('./registrappmain-firebase-adminsdk-jvsnt-ace26567d7.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Función para eliminar usuarios por lotes de hasta 1000
async function deleteAllUsers() {
  try {
    const listUsersResult = await admin.auth().listUsers(1000); // Listar hasta 1000 usuarios

    const uids = listUsersResult.users.map(userRecord => userRecord.uid); // Extraer los UIDs de los usuarios

    if (uids.length > 0) {
      await admin.auth().deleteUsers(uids);
      console.log(`Eliminados ${uids.length} usuarios`);

      // Llama a la función de nuevo si hay más usuarios
      if (listUsersResult.pageToken) {
        await deleteAllUsers(listUsersResult.pageToken); // Elimina el siguiente lote si hay más usuarios
      }
    } else {
      console.log('No hay usuarios para eliminar.');
    }
  } catch (error) {
    console.error('Error al eliminar usuarios:', error);
  }
}

deleteAllUsers();
