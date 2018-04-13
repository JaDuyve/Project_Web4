import { QuestionDataService } from './../question-data.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from './../../models/group.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private _group: Group;

  constructor(
    private route: ActivatedRoute,
    private _questionDataService: QuestionDataService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(item => this._group = item['group']);
  }

}
