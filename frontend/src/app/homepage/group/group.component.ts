import { QuestionDataService } from './../question-data.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from './../../models/group.model';
import { Component, OnInit, group } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { GroupDataService } from '../group-data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private _group: Group;

  constructor(
    private route: ActivatedRoute,
    private _groupDataService: GroupDataService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(item => this._group = item['group']);
  }

  get group(): Group {
    return this._group;
  }

  joinGroup(): boolean {
    this._group.users.push(this._authenticationService.user);


    return false;
  }

}
