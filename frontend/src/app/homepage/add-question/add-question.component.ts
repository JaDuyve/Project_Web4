import { QuestionDataService } from './../question-data.service';
import { Question } from './../../models/question.model';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Output() public newQuestion = new EventEmitter<Question>();
  private question: FormGroup;
  public errorMsg: string;
  // public uploader: FileUploader = new FileUploader({});;
  private selectedFile = null;

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _questionDataService: QuestionDataService
  ) { 
    
  }

  ngOnInit() {
    this.question = this.fb.group({
      description: ['']
    });
  }

  onSubmit() {
    const quest = new Question(this.question.value.description, this._authenticationService.user$.value);
    
    this.newQuestion.emit(quest);
    // this._questionDataService.uploadFile(this.selectedFile);
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

}
