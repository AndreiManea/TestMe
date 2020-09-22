import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuizzesService} from '../quizzes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from '../models/quiz.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-quizz-create',
  templateUrl: './quizz-create.component.html',
  styleUrls: ['./quizz-create.component.scss']
})
export class QuizzCreateComponent implements OnInit {
  quizForm: FormGroup;
  quizFormData: Quiz;
  mode: string;
  questionId: number;
  answerId: number;
  authStatus = {authStatus: false, userType: ''};
  authStatusListener: Subscription;
  constructor(private quizzesService: QuizzesService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}


  ngOnInit(): void {
    const token = this.authService.getToken();
    const userType = this.authService.getUserType();
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();
    const userName = this.authService.getUserName();

    if (token) {
      this.authService.setAuthStatus(true, userType, userId, userEmail, userName);
    }
    this.authStatusListener = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.authStatus = {authStatus: authStatus.authStatus, userType: authStatus.userType};
      if (!this.authStatus) {
        this.router.navigateByUrl('/login');
      }
    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';

        const currentQuizId = paramMap.get('id');

        this.quizzesService.getQuiz(currentQuizId).subscribe((apiData) => {

          this.quizFormData = apiData.foundQuiz;

          this.questionId = Number(this.quizFormData.questions[this.quizFormData.questions.length - 1].id);

          const allQuestions = this.quizFormData.questions.map(question => question);

          this.quizForm = new FormGroup({
            userId: new FormControl(this.quizFormData.userId),
            userEmail: new FormControl(this.quizFormData.userEmail),
            id: new FormControl(currentQuizId),
            quizTitle: new FormControl(this.quizFormData.quizTitle),
            questions: new FormArray(this.initQuestions(allQuestions)),
            quizCode: new FormControl(this.quizFormData.quizCode)
          });

        });
      } else {

        this.mode = 'create';
        this.questionId = -1;
        this.answerId = -1;
        this.quizFormData = null;
        this.quizForm = new FormGroup({
          userId: new FormControl(this.authService.getUserId()),
          userEmail: new FormControl(this.authService.getUserEmail()),
          id: new FormControl(null),
          quizTitle: new FormControl(''),
          questions: new FormArray([
            this.initQuestion(),
          ]),
          quizCode: new FormControl('')
        });
      }
    });
  }

  // CREATE MODE RELATED
  initQuestion() {
    this.questionId += 1;
    if (this.answerId !== -1) {
      this.answerId -= 1;
    }
    console.log(this.questionId);
    return new FormGroup({
      id: new FormControl(this.questionId.toString()),
      questionTitle: new FormControl(''),
      answers: new FormArray([
        this.initAnswer(),
      ])
    });
  }

  initAnswer() {
    this.answerId += 1;
    return new FormGroup({
      id: new FormControl(this.answerId.toString()),
      answerTitle: new FormControl(''),
      correct: new FormControl('')
    });
  }

  deleteQuestion(questionId) {
    const control = this.quizForm.get('questions') as FormArray;
    control.controls.forEach((question: FormGroup) => {
       if (question.controls.id.value >= questionId) {
         question.controls.id.setValue(question.controls.id.value - 1);
       }
    });
    this.questionId -= 1;
    console.log('From delete ' + (questionId));
    control.removeAt(questionId);
  }

  // EDIT MODE RELATED
  initQuestions(allQuestions: { id: string, questionTitle: string, answers: { id: string, answerTitle: string, correct: string }[] }[]) {
    const allQuestionsArray = [];
    allQuestions.forEach((question) => {
     const questionForm =  new FormGroup({
        id: new FormControl(question.id),
        questionTitle: new FormControl(question.questionTitle),
        answers: new FormArray(this.initAnswers(question.answers))
      });
     allQuestionsArray.push(questionForm);
  });
    return allQuestionsArray;
  }

  initAnswers(allAnswers: { id: string, answerTitle: string, correct: string }[]) {
    const allAnswersArray = [];
    allAnswers.forEach((answer) => {
       const answerForm = new FormGroup({
        id: new FormControl(answer.id),
        answerTitle: new FormControl(answer.answerTitle),
        correct: new FormControl(answer.correct)
      });
       allAnswersArray.push(answerForm);
    });
    return allAnswersArray;
  }

  formData(form) {
    return form.get('questions');
  }
  addQuestion() {
    const control = this.quizForm.get('questions') as FormArray;
    control.push(this.initQuestion());
    console.log('From add ' + this.questionId);
  }
  saveQuiz() {
    if (this.mode === 'create') {
      this.quizzesService.addQuiz(this.quizForm.value);
      console.log(this.quizForm.value);
    } else {
      this.quizzesService.updateQuiz(this.quizForm.value.id, this.quizForm.value);
    }
    this.router.navigateByUrl('/list');
  }
}
