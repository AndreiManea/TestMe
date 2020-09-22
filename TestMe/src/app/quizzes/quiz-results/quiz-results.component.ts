import { Component, OnInit } from '@angular/core';
import {QuizzesService} from '../quizzes.service';
import {QuizTake} from '../models/quizTake.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  token: string;
  authStatus = {authStatus: false, userType: '', userId: ''};
  authStatusListener: Subscription;
  results: QuizTake [];
  resultsUpdated: Subscription;
  constructor(private quizzesService: QuizzesService, private authService: AuthService) { }

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






    this.quizzesService.getResults();
    this.resultsUpdated = this.quizzesService.getResultsUpdated().subscribe(results => {
      this.results = results;
    });
  }

}
