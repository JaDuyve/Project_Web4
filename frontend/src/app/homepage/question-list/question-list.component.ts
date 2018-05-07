import { AuthenticationService } from './../../user/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionDataService } from './../question-data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Group } from '../../models/group.model';

declare var $: any;

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  private _questions: Question[];

  public errorMsg: string;
  public group: FormGroup;

  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder,
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this._questionDataService.questions.subscribe(
      data => {this._questions = data},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve questions: ${error.error}`;
      }
    );

    this.group = this.fb.group({
      group_name: [''],
      private: ''
    });

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

  showGroupModal(): void {
    $(`.small.modal.group`).modal('show');
  }

  removeQuestion(question: Question) {
    this._questionDataService.removeQuestion(question).subscribe(
      item => (this._questions = this._questions.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing question for ${
          question.description
          }: ${error.error}`;
      }
    );
  }

  onSubmitCreate() {
    const newGroup = new Group(this.group.value.group_name, this.group.value.private, this._authService.user$.value.username);
    

  }  

  @HostBinding('class') classes = 'ui container';
}
