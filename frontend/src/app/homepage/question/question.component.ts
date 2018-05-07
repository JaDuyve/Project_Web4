import { AuthenticationService } from './../../user/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../../models/comment.model';
import { QuestionDataService } from './../question-data.service';
import { Question } from '../../models/question.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() rmQuestion = new EventEmitter<Question>();

  private comment: FormGroup;
  public errorMsg: string;

  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.comment = this.fb.group({
      message: ['']
    });

    console.log(this.question.contentType);
  }

  removeQuestion(): boolean {
    this.rmQuestion.emit(this.question);
    return false;
  }

  addLike(): boolean {
    this.question.addLike(this._authenticationService.user$.value.username);
    this.updateQuestion(this.question);

    return false;
  }

  addDislike(): boolean {
    this.question.addDislike(this._authenticationService.user$.value.username);
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
    $(`.small.modal.${this.question.id}`).modal('show');
  }

  onSubmitComment() {
    const comment = new Comment(this.comment.value.message, this._authenticationService.user$.value.username, this.question.id);

    this._questionDataService.addCommentToQuestion(comment, this.question).subscribe(
      item => (this.question.addComment(item)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding a comment 
        : ${error.error}`;
      })
  }
}
