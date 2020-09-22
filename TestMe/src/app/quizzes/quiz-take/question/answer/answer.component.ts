import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-take-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class TakeAnswerComponent implements OnInit {
  @Input() answer;
  constructor() { }

  ngOnInit(): void {
  }

}
