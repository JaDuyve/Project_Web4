import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Group } from '../models/group.model';
import { Question } from '../models/question.model';

@Injectable()
export class GroupDataService {

  private readonly _appUrl = '/API/';

  constructor(private http: HttpClient) { }

  getGroup(id: string): Observable<Group> {
    const theUrl = `${this._appUrl}groups/group/${id}`;
    return this.http.get(theUrl).pipe(map(Group.fromJSON));
  }

  addGroup(group: Group): Observable<boolean> {
    return this.http
      .post(`${this._appUrl}groups/add`, group)
      .pipe(
        map((item: any) => {
          if (item.groupadd === 'ok') {
            return false;
          } else {
            return true;
          }
      })
    );
  }

  checkGroupNameAvailability(groupname: string): Observable<boolean> {
    return this.http.post(`${this._appUrl}groups/checkgroupname`, { groupName: groupname }).pipe(
      map((item: any) => {
        if (item.groupname === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  addQuestionToGroup(groupid: string, question: Question): Observable<Question> {
    return this.http.post(`${this._appUrl}groups/group/${groupid}/question`, question)
      .pipe(
        map(Question.fromJSON)
      );
  }

  getQuestionGroup(groupid: string): Observable<Question[]> {
    return this.http.post(`${this._appUrl}groups/group/question`, {id: groupid})
      .pipe(
        map((list: any[]): Question[] => list.map(Question.fromJSON))
      );
  }

}
