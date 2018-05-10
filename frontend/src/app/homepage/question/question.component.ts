import { User } from './../../models/user.model';
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
  private base64textString: string;
  private files;

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

    $(`.ui.accordion.${this.question.id}`).accordion();
  }

  removeQuestion(): boolean {
    this.rmQuestion.emit(this.question);
    return false;
  }

  addLike(): boolean {
    this.question.addLike(this._authenticationService.user$.value);
    this.updateQuestion(this.question);

    return false;
  }

  addDislike(): boolean {
    this.question.addDislike(this._authenticationService.user$.value);
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
    if (this.files) {
      let file = this.files[0];

      if (file) {
        let reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

      }

    } else {

      const comment = new Comment(
        this.comment.value.message, 
        this._authenticationService.user, 
        "",
        "",
        this.question.author.username,
        this.question.id
      );

      comment.authorId = this._authenticationService.user.id;
     
      this._questionDataService.addCommentToQuestion(comment, this.question).subscribe(
        item => (this.question.addComment(item)),
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while adding a comment 
            : ${error.error}`;
        })
    }
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    const comment = new Comment(
      this.comment.value.message,
      this._authenticationService.user,
      this.base64textString,
      this.files[0].type,
      this.question.author.username,
      this.question.id
    );
    comment.authorId = this._authenticationService.user.id;
    console.log(comment);
    this._questionDataService.addCommentToQuestion(comment, this.question).subscribe(
      item => (this.question.addComment(item)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding a comment 
          : ${error.error}`;
      })
  }

  showImageModal(): void {
    $(`.basic.modal.${this.question.id}.image`).modal('show');
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
  }

  updateQuestionSol(comment: Comment) {
    this.question.hasSolution = true;
    this.updateQuestion(this.question);
    return false;
  }
}
