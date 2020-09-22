import {Injectable} from '@angular/core';
import {Quiz} from './models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {QuizTake} from './models/quizTake.model';
import {AuthService} from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  private quizzes: Quiz[] = [];
  private quizzesUpdated = new Subject<Quiz[]>();
  private quizToTake: Quiz;
  private quizToTakeId: string;
  private results: QuizTake [];
  private resultsUpdated = new Subject<QuizTake []>();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  getQuizzes() {
    this.http.get<{ quizzes: Quiz[] }>('http://localhost:3000/api/list')
      .subscribe((apiData) => {
        this.quizzes = apiData.quizzes;
        this.quizzesUpdated.next([...this.quizzes]);
      });
  }

  getQuizzesUpdated() {
    return this.quizzesUpdated.asObservable();
  }

  getQuiz(id: string) {
    return this.http.get<{ foundQuiz: Quiz }>('http://localhost:3000/api/list/' + id);

  }

  addQuiz(quizFormData: Quiz) {
    this.http.post<{ message: string, _id: string }>('http://localhost:3000/api/create', quizFormData).subscribe((apiData) => {
      console.log(apiData.message);
      quizFormData._id = apiData._id;
      this.quizzes.push(quizFormData);
      console.log(this.quizzes);
      this.quizzesUpdated.next([...this.quizzes]);
    });
  }

  updateQuiz(id: string, quizFormData: Quiz) {
    this.http.put<{ message: string }>('http://localhost:3000/api/create/' + id, quizFormData).subscribe((apiData) => {
      console.log(apiData.message);
    });
  }

  deleteQuiz(id: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api/list/' + id).subscribe((apiData) => {
      console.log(apiData.message);
      this.quizzes.filter((quiz) => quiz._id !== id);
      this.quizzesUpdated.next([...this.quizzes]);
    });
  }

  checkQuizCode(quizCode: string) {
    this.http.post<{ quiz: Quiz }>('http://localhost:3000/api/quizCode', {quizCode}).subscribe((apiData) => {
      this.quizToTake = apiData.quiz;
      this.quizToTakeId = apiData.quiz._id;
      if (this.quizToTake) {
        this.router.navigateByUrl('/takeQuiz/' + this.quizToTakeId);
      } else {
        alert('No such quiz with the specified code exists');
      }
    });
  }

  getQuizToTake() {
    return this.quizToTake;
  }

  submitQuizToTake(quiz: QuizTake) {
    this.http.post<{ message: string }>('http://localhost:3000/api/result', quiz).subscribe((apiData) => {
      console.log(apiData.message);
    });
  }

  getResults() {
    if (this.authService.getUserType() === 'teacher') {
      this.http.get<{ results: QuizTake [] }>('http://localhost:3000/api/resultsTeacher').subscribe((apiData) => {
        this.results = apiData.results;
        this.resultsUpdated.next([...this.results]);
      });
    } else {
      this.http.get<{ results: QuizTake [] }>('http://localhost:3000/api/resultsStudent').subscribe((apiData) => {
        this.results = apiData.results;
        this.resultsUpdated.next([...this.results]);
      });
    }
  }

  getResultsUpdated() {
    return this.resultsUpdated.asObservable();
  }

}
