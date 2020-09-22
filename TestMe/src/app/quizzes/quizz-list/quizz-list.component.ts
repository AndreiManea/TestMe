import { Component, OnInit } from '@angular/core';
import {QuizzesService} from '../quizzes.service';
import {Quiz} from '../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-quizz-list',
  templateUrl: './quizz-list.component.html',
  styleUrls: ['./quizz-list.component.scss']
})
export class QuizzListComponent implements OnInit {

  quizzes: Quiz[];
  currentId: string;
  mode;
  currentQuiz: Quiz = {userId: null, _id: null, userEmail: null, quizTitle: null, questions: null, quizCode: null};
  authStatus = {authStatus: false, userType: ''};
  authStatusListener: Subscription;
  constructor(private quizService: QuizzesService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }
  ngOnInit(): void {
    const token = this.authService.getToken();
    const userType = this.authService.getUserType();
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();
    const userName = this.authService.getUserName();

    if (token) {
      this.authService.setAuthStatus(true, userType, userId, userEmail, userName);
    }
    this.authStatus = this.authService.getAuthStatus();
    this.authStatusListener = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.authStatus = authStatus;
    });
    if (!this.authStatus) {
      this.router.navigateByUrl('/login');
    }
    this.quizService.getQuizzes();
    this.quizService.getQuizzesUpdated().subscribe((updatedQuizzes) => {
      this.quizzes = updatedQuizzes;
    });
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has('id')) {
        this.mode = 'view';
        this.currentId = paramMap.get('id');
        this.quizService.getQuiz(this.currentId).subscribe((apiData) => {
            this.currentQuiz = apiData.foundQuiz;
        });
      } else {
        this.mode = 'list';
        this.currentId = null;
      }
    });
  }
  viewQuiz(id: string) {
    this.router.navigateByUrl('/list/' + id);
  }
  editQuiz() {
   this.router.navigateByUrl('/create/' + this.currentId);
  }
  deleteQuiz() {
    this.quizService.deleteQuiz(this.currentId);
    this.router.navigateByUrl('/list');
  }
}
