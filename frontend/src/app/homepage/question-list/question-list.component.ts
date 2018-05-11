import { AuthenticationService } from './../../user/authentication.service';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { QuestionDataService } from './../question-data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Group } from '../../models/group.model';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { GroupDataService } from '../group-data.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';



declare var $: any;

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  private _questions: Question[];
  private _groups: Group[];
  private _user: User;

  public errorMsg: string;
  public group: FormGroup;
  public filterQuestionName: string;
  public filterQuestion$ = new Subject<string>();


  constructor(
    private _questionDataService: QuestionDataService,
    private fb: FormBuilder,
    private _router: Router,
    private _authService: AuthenticationService,
    private _groupDataService: GroupDataService
  ) {
    this.filterQuestion$
      .pipe(distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterQuestionName = val));
  }

  ngOnInit() {
    this._user = this._authService.user;

    this._questionDataService.questions.subscribe(
      items => {
        this._questions = items.reverse();

      }

    );

    this._groupDataService.getGroups().subscribe(
      items => {
        this._groups = items.filter(val => {
          return val.users.filter(val => {
            return val.username === this._authService.user.username;
          }).length === 0;

        });;
      }
    );
    this.group = this.fb.group({
      group_name: ['', [Validators.required, Validators.minLength(5)],
        this.serverSideValidateGroupname()],
      private: 'false'
    });

  }

  get questions() {
    return this._questions;
  }

  get groups() {
    return this._groups;
  }

  addPublicQuestion(question: Question) {
    this._questionDataService.addPublicQuestion(question).subscribe(
      item => {
        this._questions.push(item);
      },
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

  get user() {
    return this._authService.user;
  }

  onSubmitCreate() {
    const newGroup = new Group(this.group.value.group_name, this.group.value.private, this._authService.user);

    this._groupDataService.addGroup(newGroup).subscribe(item => {
        console.log(item);
        this._router.navigate([`/homepage/group/${item}`])
    }

    );
  }

  private serverSideValidateGroupname(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this._groupDataService
        .checkGroupNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { groupAlreadyExists: true };
          })
        )
    }
  }

  @HostBinding('class') classes = 'ui container';
}
