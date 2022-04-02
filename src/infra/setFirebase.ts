import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

export function setDb({
  _db,
  _auth,
  _storage,
}: {
  _db: Firestore;
  _auth: Auth;
  _storage: FirebaseStorage;
}) {
  db = _db;
  auth = _auth;
  storage = _storage;
}

export function getFirestore(): Firestore {
  return db;
}

export function getAuth(): Auth {
  return auth;
}

export function getStorage(): FirebaseStorage {
  return storage;
}
