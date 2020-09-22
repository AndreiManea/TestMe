import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NgForm} from '@angular/forms';
import {Quiz} from '../models/quiz.model';
import {QuizTake} from '../models/quizTake.model';
import {Subscription} from 'rxjs';
import {QuizzesService} from '../quizzes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-quiz-take',
  templateUrl: './quiz-take.component.html',
  styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit {
  quizForm: FormGroup;
  quizToTake: Quiz;
  questions: any;
  answers = [];
  questionNr = 0;
  result = 0;
  mode: string;
  authStatus = {authStatus: false, userType: '', userId: ''};
  authStatusListener: Subscription;
  token: string;
  constructor(private quizService: QuizzesService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    const userType = this.authService.getUserType();
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();
    const userName = this.authService.getUserName();
    if (this.token) {
      this.authService.setAuthStatus(true, userType, userId, userEmail, userName);
    }

    this.authStatusListener = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.authStatus = {authStatus: authStatus.authStatus, userType: authStatus.userType, userId: authStatus._id};
    });


    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {

        // Implement a way to compare the quizToTake each question answers array
        // with
        // the new answers array that should be the values users checks during the quiz
        // Implement get a quiz if user refreshes, try to save what user enters during the quiz
        this.mode = 'startQuiz';
        this.quizToTake = this.quizService.getQuizToTake();
        const allQuestions = this.quizToTake.questions.map(question => question);
        this.quizForm = new FormGroup({
          quizTitle: new FormControl(this.quizToTake.quizTitle),
          questions: new FormArray(this.initQuestion(allQuestions))
        });
        this.questions = this.quizToTake.questions;
      } else {
        this.mode = 'startQuizCode';
      }
    });
  }

  startQuiz(quizCodeForm: NgForm) {
    if (quizCodeForm.invalid) {
      return ;
    }
    this.quizService.checkQuizCode(quizCodeForm.controls.quizCode.value);
  }


  initQuestion(questions: { id: string, questionTitle: string, answers: { id: string, answerTitle: string, correct: string }[] }[]) {
    const questionsArray = [];
    questions.forEach(question => {
      const questionForm = new FormGroup({
        id: new FormControl(this.questionNr),
        questionNr: new FormControl(this.questionNr + 1),
        questionTitle: new FormControl(question.questionTitle),
        answers: new FormArray(this.initAnswer(question.answers))
      });
      questionsArray.push(questionForm);
    });
    return questionsArray;
  }

  initAnswer(allAnswers: { id: string, answerTitle: string, correct: string }[]) {
    const answersArray = [];
    allAnswers.forEach(answer => {
      const answerForm = new FormGroup({
        answerTitle: new FormControl(answer.answerTitle),
        id: new FormControl(answer.id),
        correct: new FormControl(false)
      });
      answersArray.push(answerForm);
    });
    return answersArray;
  }

  questionsData(form) {
    return form.get('questions').controls[this.questionNr];
  }

  getQuestionNr(questionNr) {
    this.questionNr = questionNr;
  }

  submitQuiz(userForm) {
    if (this.questions.length <= this.questionNr) {
      const userInputForm = userForm.controls.questions.value.map((question, index) => {
        return {
          answers: question.answers.map((answer, i) => {
            return {id: i.toString(), answerTitle: answer.answerTitle, correct: answer.correct.toString()};
          }),
          id: index.toString(),
          questionTitle: question.questionTitle
        };
      });
      this.quizToTake.questions.forEach( (question, index) => {
        console.log(question.answers);
        console.log(userInputForm[index].answers);
        if (JSON.stringify(question.answers) === JSON.stringify(userInputForm[index].answers)) {
          this.result += 1;
        }
      });
      const result: QuizTake = {
        _id: null,
        creator: this.quizToTake.userEmail,
        userId: this.authService.getUserEmail(),
        result: this.result,
        questionsNr: this.questions.length,
        quizTitle: this.quizForm.controls.quizTitle.value
      };
      this.quizService.submitQuizToTake(result);
      this.mode = 'resultQuiz';
    } else {
      return ;
    }
  }
}
