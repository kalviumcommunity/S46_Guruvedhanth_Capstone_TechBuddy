import { atom } from 'recoil';

export const usernameState = atom({
  key: 'usernameState', // Unique ID for this atom
  default: 'Tony', // Initial value for the atom
});


export const currentQuestionIdState = atom({
  key: 'currentQuestionId', 
  default: "1234567890",
});

export const currentAnswerIdState=atom({
  key:"currentAnswerId",
  default:""
})

export const commentsState = atom({
  key: 'commentsState',
  default: [],
});


export const category=atom({
  key:"category",
  default:"javascript"
})