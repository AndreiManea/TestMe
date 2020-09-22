import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-take-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class TakeQuestionComponent implements OnInit {
  @Input() question;
  @Input() questions;
  questionNr = 0;
  @Output() questionNrEmitter = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  submitQuestion() {
    this.questionNr += 1;
    this.questionNrEmitter.emit(this.questionNr);
  }
  answersData(form) {
    return form.get('answers').controls;
}
}
