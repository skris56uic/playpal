import { ContactInformation } from "../models/venue";

const possibleNames = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
];

export const getRandomContactInformation = (): ContactInformation => {
  const name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
  const phoneNumber = `+1-${Math.floor(
    Math.random() * 9000000000 + 1000000000
  )}`;
  return { name, phoneNumber };
};
