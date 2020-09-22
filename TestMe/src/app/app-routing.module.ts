import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuizzCreateComponent} from './quizzes/quizz-create/quizz-create.component';
import {QuizzListComponent} from './quizzes/quizz-list/quizz-list.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {QuizTakeComponent} from './quizzes/quiz-take/quiz-take.component';
import {NotAuthComponent} from './auth/not-auth/not-auth.component';
import {TeacherGuard} from './auth/guards/teacher.guard';
import {StudentGuard} from './auth/guards/student.guard';
import {QuizResultsComponent} from './quizzes/quiz-results/quiz-results.component';
import {QuizzesTakenComponent} from './quizzes/quizzes-taken/quizzes-taken.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'list', component: QuizzListComponent, canActivate: [AuthGuard, TeacherGuard]},
  {path: 'list/:id', component: QuizzListComponent, canActivate: [AuthGuard, TeacherGuard]},
  {path: 'create', component: QuizzCreateComponent, canActivate: [AuthGuard, TeacherGuard]},
  {path: 'create/:id', component: QuizzCreateComponent, canActivate: [AuthGuard, TeacherGuard]},
  {path: 'takeQuiz', component: QuizTakeComponent, canActivate: [AuthGuard, StudentGuard]},
  {path: 'takeQuiz/:id', component: QuizTakeComponent, canActivate: [AuthGuard, StudentGuard]},
  {path: 'resultsTeacher', component: QuizResultsComponent, canActivate: [AuthGuard, TeacherGuard]},
  {path: 'resultsStudent', component: QuizzesTakenComponent, canActivate: [AuthGuard, StudentGuard]},
  {path: 'notAuth', component: NotAuthComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
