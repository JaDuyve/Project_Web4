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

  getGroup(groupname: string): Observable<Group> {
    const theUrl = `${this._appUrl}groups/groupname/`;
    return this.http.post(theUrl, {id: groupname}).pipe(map(Group.fromJSON));
  }

  getGroups(): Observable<Group[]> {
    const theUrl = `${this._appUrl}groups/groups/`;
    return this.http.get(theUrl).pipe(map((list: any[]): Group[] => list.map(Group.fromJSON)));
  }

  addGroup(group: Group): Observable<string> {
    return this.http
      .post(`${this._appUrl}groups/add`, group)
      .pipe(
        map((item: any) => {
          return item.groupid;
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

  updateGroup(group: Group): Observable<boolean> {
    return this.http.put(`${this._appUrl}groups/group/${group.id}`, group)
      .pipe(
        map((item: any) => {
          return true;
        })
      );{}
  }

}
