import { AuthenticationService } from './../../user/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionDataService } from './../question-data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Group } from '../../models/group.model';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';



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
  public filterQuestionName: string;
  public filterQuestion$ = new Subject<string>();


  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder,
    private _authService: AuthenticationService
  ) { 
    this.filterQuestion$
      .pipe(distinctUntilChanged(),
      debounceTime(400),
      map(val => val.toLowerCase())
    )
    .subscribe(val => (this.filterQuestionName = val));
  }

  ngOnInit() {
    this._questionDataService.questions.subscribe(
      items => this._questions = items
      
    );
    // .subscribe(
    //   data => {this._questions = data},
    //   (error: HttpErrorResponse) => {
    //     this.errorMsg = `Error ${
    //       error.status
    //     } while trying to retrieve questions: ${error.error}`;
    //   }
    // );

    this.group = this.fb.group({
      group_name: [''],
      private: ''
    });

  }

  get questions() {
    console.log(this._questions);
    return this._questions;
  }

  addPublicQuestion(question: Question) {
    this._questionDataService.addPublicQuestion(question).subscribe(
      item => {this._questions.push(item);
      console.log(item)},
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
    const newGroup = new Group(this.group.value.group_name, this.group.value.private, this._authService.user.id);
    

  }  

  @HostBinding('class') classes = 'ui container';
}
