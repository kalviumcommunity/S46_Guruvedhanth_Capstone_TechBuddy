import { atom } from 'recoil';

export const usernameState = atom({
  key: 'usernameState', // Unique ID for this atom
  default: '', // Initial value for the atom
});
