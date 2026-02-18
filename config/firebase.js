
import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let auth = null;
let db = null;

try {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
  };

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
