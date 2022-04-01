import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

let db: Firestore;
let auth: Auth;

export function setDb(_db: Firestore, _auth: Auth) {
  db = _db;
  auth = _auth;
}

export function getDB(): Firestore {
  return db;
}

export function getAuth(): Auth {
  return auth;
}
