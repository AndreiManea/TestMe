import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { QuizzCreateComponent } from './quizzes/quizz-create/quizz-create.component';
import { QuizzListComponent } from './quizzes/quizz-list/quizz-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CreateQuestionComponent } from './quizzes/quizz-create/question/question.component';
import { CreateAnswerComponent } from './quizzes/quizz-create/question/answer/answer.component';
import { TakeQuestionComponent} from './quizzes/quiz-take/question/question.component';
import { TakeAnswerComponent} from './quizzes/quiz-take/question/answer/answer.component';
import {MatRadioModule} from '@angular/material/radio';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from "@angular/material/dialog";
import { QuizTakeComponent } from './quizzes/quiz-take/quiz-take.component';
import { NotAuthComponent } from './auth/not-auth/not-auth.component';
import {StudentGuard} from './auth/guards/student.guard';
import {TeacherGuard} from './auth/guards/teacher.guard';
import {AuthInterceptor} from './auth/auth-interceptor';
import { QuizResultsComponent } from './quizzes/quiz-results/quiz-results.component';
import { QuizzesTakenComponent } from './quizzes/quizzes-taken/quizzes-taken.component';
import {ErrorInterceptor} from './error.interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuizzCreateComponent,
    QuizzListComponent,
    CreateQuestionComponent,
    TakeQuestionComponent,
    CreateAnswerComponent,
    TakeAnswerComponent,
    LoginComponent,
    RegisterComponent,
    QuizTakeComponent,
    NotAuthComponent,
    QuizResultsComponent,
    QuizzesTakenComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard, StudentGuard, TeacherGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ]
  ,
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
