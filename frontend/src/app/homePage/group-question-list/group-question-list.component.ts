import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './../../user/authentication.service';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Group } from '../../models/group.model';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { GroupDataService } from '../group-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'group-question-list',
  templateUrl: './group-question-list.component.html',
  styleUrls: ['./group-question-list.component.css']
})
export class GroupQuestionListComponent implements OnInit {

  @Input() groupid: string;

  private _questions: Question[];
  public errorMsg: string;
  public filterQuestionName: string;
  public filterQuestion$ = new Subject<string>();

  constructor(
    private _groupDataService: GroupDataService,
    private _authService: AuthenticationService,
  ) {
    this.filterQuestion$
      .pipe(distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterQuestionName = val));
  }

  ngOnInit() {
    this._groupDataService.getQuestionGroup(this.groupid).subscribe(
      item => this._questions = item
    );
  }

  get questions(): Question[] {
    return this._questions;
  }

  addPublicQuestion(question: Question): boolean {
    this._groupDataService.addQuestionToGroup(this.groupid, question).subscribe(
      item => {
        this._questions.push(item);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding question ${question}: ${error.error}`;
      }
    );
    return false;
  }

  


  // removeQuestion(question: Question) {
  //   this._groupDataService.removeQuestion(question).subscribe(
  //     item => (this._questions = this._questions.filter(val => item.id !== val.id)),
  //     (error: HttpErrorResponse) => {
  //       this.errorMsg = `Error ${error.status} while removing question for ${
  //         question.description
  //         }: ${error.error}`;
  //     }
  //   );
  // }

}


