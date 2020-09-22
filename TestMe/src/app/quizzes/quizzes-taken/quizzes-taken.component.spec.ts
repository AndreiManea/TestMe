import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTakenComponent } from './quizzes-taken.component';

describe('QuizzesTakenComponent', () => {
  let component: QuizzesTakenComponent;
  let fixture: ComponentFixture<QuizzesTakenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesTakenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
