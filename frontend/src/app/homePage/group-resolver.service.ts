import { QuestionDataService } from './question-data.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GroupDataService } from './group-data.service';
import { Group } from '../models/group.model';

@Injectable()
export class GroupResolverService {

  constructor(private _groupDataService: GroupDataService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Group> {
    return this._groupDataService.getGroup(route.params['id']);
  }

}
