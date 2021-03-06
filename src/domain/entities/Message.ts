import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

export class Message {
  readonly uid: string;
  readonly content: string;
  readonly fromUid: string;
  readonly createdAt: Date;

  constructor({
    uid,
    fromUid,
    content,
    createdAt,
  }: {
    uid: string;
    fromUid: string;
    content: string;
    createdAt: Date;
  }) {
    this.uid = uid;
    this.fromUid = fromUid;
    this.content = content;
    this.createdAt = createdAt;
  }
}

export function assertMessage(data: DocumentData): asserts data is Message {
  const d = data as Partial<Message>; // 補完のためキャスト
  if (
    !(
      typeof d?.uid === "string" &&
      typeof d?.content === "string" &&
      typeof d?.fromUid === "string" &&
      typeof data.createdAt?.toDate === "function"
    )
  ) {
    throw new Error("data is not Message type");
  }

  // Timestamp => Date
  data.createdAt = data.createdAt.toDate();
}

export const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: WithFieldValue<Message>) {
    return message;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    assertMessage(data);
    return data;
  },
};
