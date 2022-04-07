import { customAlphabet, urlAlphabet } from "nanoid";

const one = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  1
);

const seven = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789",
  7
);

const url = customAlphabet(urlAlphabet, 8);

const uid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789",
  20
);

export const KeyGenerator = {
  generateVariableKey(): string {
    return one() + seven();
  },
  generateUriKey(): string {
    return url();
  },
  generateUid(): string {
    return uid();
  },
};
