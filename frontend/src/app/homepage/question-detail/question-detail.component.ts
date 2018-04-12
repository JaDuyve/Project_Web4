import { QuestionDataService } from './../question-data.service';
import { Question } from './../../models/question.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  private _question: Question;

  constructor(
    private route: ActivatedRoute,
    private _questionDataService: QuestionDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => this._question = item['question']);
  }

}
