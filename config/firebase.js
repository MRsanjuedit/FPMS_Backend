
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '..', 'serviceAccountKey.json');

let auth = null;
let db = null;

try {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, 'utf8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  auth = admin.auth();         
  db = admin.firestore();

  console.log("FIREBASE CONNECTED SUCCESSFULLY");
} catch (error) {
  console.error("FIREBASE CONNECTION FAILED - Server will run without Firebase");
  console.error(error.message);
}

export { auth, db };
