import { atom } from "recoil";

export const modalState = atom({
  key: "modalState", // unique ID
  default: false, // default value
});

export const tweetIdState = atom({
  key: "tweetIdState", // unique ID
  default: "id", // default value
});
