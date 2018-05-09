import { User } from './../../models/user.model';
import { AuthenticationService } from './../../user/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from '../../models/comment.model';
import { QuestionDataService } from './../question-data.service';
import { Question } from '../../models/question.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  private _question: Question;
  private comment: FormGroup;
  public errorMsg: string;
  private base64textString: string;
  private files;

  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      item => (this._question = item['question']),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve recipe: ${error.error}`;
      }
    );

    this.comment = this.fb.group({
      message: ['']
    });


  }

  get question(): Question {
    return this._question;
  }

  addLike(): boolean {
    this._question.addLike(this._authenticationService.user$.value);
    this.updateQuestion(this._question);

    return false;
  }

  addDislike(): boolean {
    this._question.addDislike(this._authenticationService.user$.value);
    this.updateQuestion(this._question);
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
    $(`.small.modal.${this._question.id}`).modal('show');
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

      const comment = new Comment(this.comment.value.message, 
        null, "","",
        this._question.author.id,
        this._question.id);

      comment.authorId = this._authenticationService.user.id;
     
      this._questionDataService.addCommentToQuestion(comment, this._question).subscribe(
        item => (this._question.addComment(item)),
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
      null,
      this.base64textString,
      this.files[0].type,
      this._question.author.id,
      this._question.id
    );
    comment.authorId = this._authenticationService.user.id;
    console.log(comment);
    this._questionDataService.addCommentToQuestion(comment, this._question).subscribe(
      item => (this._question.addComment(item)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding a comment 
          : ${error.error}`;
      })
  }

  showImageModal(): void {
    $(`.basic.modal.${this._question.id}.image`).modal('show');
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
  }
}
