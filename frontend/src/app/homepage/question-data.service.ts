import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionDataService {

  private readonly _appUrl = '/API/';

  constructor(private http: HttpClient) { }


  get questions(): Observable<Question[]> {
    return this.http
      .get(`${this._appUrl}questions/`)
      .pipe(map((list: any[]): Question[] => list.map(Question.fromJSON)));
  }

  addPublicQuestion(question: Question): Observable<Question> {
    return this.http
    .post(`${this._appUrl}questions/`, question)
    .pipe(map(Question.fromJSON));
  }
}
