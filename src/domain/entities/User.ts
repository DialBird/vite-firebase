import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export class User {
  readonly email: string;
  readonly uid: string;
  readonly username: string;

  constructor({
    email,
    uid,
    username,
  }: {
    email: string;
    uid: string;
    username: string;
  }) {
    this.email = email;
    this.uid = uid;
    this.username = username;
  }
}

export function assertUser(data: DocumentData): asserts data is User {
  const d = data as Partial<User>; // 補完のためキャスト
  if (
    !(
      typeof d?.uid === "string" &&
      typeof d?.email === "string" &&
      typeof d?.username === "string"
    )
  ) {
    throw new Error("data is not User type");
  }
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>) {
    return user;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    assertUser(data);
    return data;
  },
};
