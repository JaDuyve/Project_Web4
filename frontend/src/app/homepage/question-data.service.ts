import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

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

  removeQuestion(question: Question): Observable<Question> {
    return this.http
      .delete(`${this._appUrl}question/${question.id}`)
      .pipe(map(Question.fromJSON));
  }

  updateQuestion(question: Question): Observable<Question> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    console.log(question);
    return this.http
      .put(`${this._appUrl}question/${question.id}`, question, { headers })
      .pipe(map(Question.fromJSON));
  }

  addCommentToQuestion(com: Comment, question: Question): Observable<Comment> {
    const theUrl = `${this._appUrl}question/${question.id}/comments`;
    return this.http.post(theUrl, com)
      .pipe(map(Comment.fromJSON));
  }

  addCommentToComment(newComment: Comment, comment: Comment): Observable<Comment> {
    const theUrl = `${this._appUrl}comment/${comment.id}/comments`;
    return this.http.post(theUrl, newComment)
      .pipe(map(Comment.fromJSON));
  }

  getQuestion(id: string): Observable<Question> {
    const theUrl = `${this._appUrl}/question/${id}`;
    return this.http.get(theUrl).pipe(map(Question.fromJSON));
  }
}