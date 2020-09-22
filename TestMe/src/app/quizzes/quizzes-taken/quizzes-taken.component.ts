import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {QuizzesService} from '../quizzes.service';
import {AuthService} from '../../auth/auth.service';
import {QuizTake} from '../models/quizTake.model';

@Component({
  selector: 'app-quizzes-taken',
  templateUrl: './quizzes-taken.component.html',
  styleUrls: ['./quizzes-taken.component.scss']
})
export class QuizzesTakenComponent implements OnInit {
  token: string;
  authStatus = {authStatus: false, userType: '', userId: '', userEmail: ''};
  authStatusListener: Subscription;
  results: QuizTake [];
  resultsUpdated: Subscription;

  constructor(private quizzesService: QuizzesService, private authService: AuthService) {
  }

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
      this.authStatus = {
        authStatus: authStatus.authStatus,
        userType: authStatus.userType,
        userId: authStatus._id,
        userEmail: authStatus.userEmail
      };
    });


    this.quizzesService.getResults();
    this.resultsUpdated = this.quizzesService.getResultsUpdated().subscribe(results => {
      this.results = results;
      console.log(results);
    });

  }
}
