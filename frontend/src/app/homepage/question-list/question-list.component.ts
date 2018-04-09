import { QuestionDataService } from './../question-data.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  private _questions: Question[];

  public errorMsg: string;

  constructor(private _questionDataService: QuestionDataService) { }

  ngOnInit() {
    this._questionDataService.questions.subscribe(
      data => {this._questions = data},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve questions: ${error.error}`;
      }
    );

  }

  get questions() {
    return this._questions;
  }

  addPublicQuestion(question: Question) {
    this._questionDataService.addPublicQuestion(question).subscribe(
      item => this._questions.push(item),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding question ${question}: ${error.error}`;
      }
    );
  }

}
