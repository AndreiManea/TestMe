export interface Quiz {
  userId: string;
  userEmail: string;
  _id: string;
  quizTitle: string;
  questions: {
    id: string,
    questionTitle: string,
    answers: {
      id: string,
      answerTitle: string,
      correct: string
    }[]
  }[];
  quizCode: string;
}
