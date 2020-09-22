import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Input() question;
  @Input() nr: number;
  @Input() mode: string;
  @Output() deleteQuestionId = new EventEmitter();
  answerId: number;
  constructor() { }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      this.answerId = Number(this.question.controls.answers.controls[this.question.controls.answers.controls.length - 1].controls.id.value);
    } else {
      this.answerId = 0;
    }
      }
  questionsData() {
    return this.question.get('answers');
  }
  initAnswer() {
    this.answerId += 1;
    return new FormGroup({
      id: new FormControl(this.answerId.toString()),
      answerTitle: new FormControl(''),
      correct: new FormControl('')
    });
  }
  removeQuestion(id: string) {
    this.deleteQuestionId.emit(id);
  }
  addAnswer() {
    const control = this.question.get('answers') as FormArray;
    control.push(this.initAnswer());
  }
  deleteAnswer(answerId) {
    const control = this.question.get('answers') as FormArray;
    control.controls.forEach((answer: FormGroup) => {
      if (answer.controls.id.value > answerId) {
        answer.controls.id.setValue(answer.controls.id.value - 1);
      }
    });
    this.answerId -= 1;
    console.log('From Answer delete ' + (answerId));
    control.removeAt(answerId);
  }
}
