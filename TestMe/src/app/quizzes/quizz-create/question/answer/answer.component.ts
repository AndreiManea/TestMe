import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {
  @Input() quizForm: FormGroup;
  @Input() answer: FormGroup;
  @Input() nr: number;
  @Input() answerValue: {id: string, answerTitle: string, correct: string};
  @Output() deleteAnswerId = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  removeAnswer(id: string) {
    this.deleteAnswerId.emit(id);
  }
}
