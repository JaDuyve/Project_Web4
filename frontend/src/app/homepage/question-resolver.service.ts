import { QuestionDataService } from './question-data.service';
import { Observable } from 'rxjs/Observable';
import { Question } from './../models/question.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class QuestionResolverService implements Resolve<Question> {

  
  constructor(private _questionDataService: QuestionDataService) { }

  resolve(route: ActivatedRouteSnapshot, 
    state:  RouterStateSnapshot): Observable<Question>  {
    return this._questionDataService.getQuestion(route.params['id']);
  }

}
