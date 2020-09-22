export interface QuizTake {
  _id: string;
  userId: string;
  result: number;
  questionsNr: number;
  quizTitle: string;
  creator: string;
}
