import { HttpErrorResponse } from '@angular/common/http';
import { Comment } from './../../models/comment.model';
import { QuestionDataService } from './../question-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  private newComment: FormGroup;

  public errorMsg: string;

  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.newComment = this.fb.group({
      message: ['']
    });
  }

  addLike(): boolean {
    
    this.comment.addLike();
    // this.updateQuestion(this.question);

    return false;
  }

  addDislike(): boolean {
    this.comment.addDislike();
    // this.updateQuestion(this.question);
    return false;
  }

  showModal(): void {

    console.log(this.comment.message);
    console.log(this.comment.id);
    // $(`.small.modal.${this.comment.id()}`).modal('show');
  }

  onSubmitComment() {
    const newComment = new Comment(this.newComment.value.message, 'jari', this.comment.id);

    this._questionDataService.addCommentToComment(newComment, this.comment).subscribe(
      item => (this.comment.addComment(item)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding a comment 
        : ${error.error}`;
      })
  }
};