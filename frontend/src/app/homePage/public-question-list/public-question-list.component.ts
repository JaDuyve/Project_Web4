import { PublicQuestion } from './../public-question/public-question.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-question-list',
  templateUrl: './public-question-list.component.html',
  styleUrls: ['./public-question-list.component.css']
})
export class PublicQuestionListComponent implements OnInit {

  private PublicQuestion: PublicQuestion[];
  public errorMsg: string;

  
  constructor() { }

  ngOnInit() {
  }

}
