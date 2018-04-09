import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../../models/comment.model';
import { QuestionDataService } from './../question-data.service';
import { Question } from '../../models/question.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() rmQuestion = new EventEmitter<Question>();

  errorMsg: string;

  constructor(private _questionDataService: QuestionDataService) {

  }

  ngOnInit() {
  }

  removeQuestion(): boolean {
    this.rmQuestion.emit(this.question);
    return false;
  }

  addLike(): boolean {
    this.question.addLike();
    this.updateQuestion(this.question);

    return false;
  }

  addDislike(): boolean {
    this.question.addDislike();
    this.updateQuestion(this.question);
    return false;
  }

  updateQuestion(question: Question) {
    this._questionDataService.updateQuestion(question).subscribe(
      item => (console.log(item)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while updating question for ${
          question.description
          }: ${error.error}`;
      });
  }

  showModal(): void {
    $('.small.modal').modal('show');
  }
}
