import { Router } from '@angular/router';
import { QuestionDataService } from './../question-data.service';
import { Question } from './../../models/question.model';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public question: FormGroup;
  public errorMsg: string;

  private base64textString: string = "";
  private files;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _questionDataService: QuestionDataService
  ) {

  }

  

  ngOnInit() {
    this.question = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      image: ''
    });
  }

  onSubmit() {
    if (this.files) {
      let file = this.files[0];

      if (file) {
        let reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

      }

    } else {

      const quest = new Question(
        this.question.value.description);

      quest.authorId = this._authenticationService.user.id;

      this._questionDataService.addPublicQuestion(quest).subscribe(
        item => console.log(item)
        ,
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while updating question for ${
            quest.description
            }: ${error.error}`;
        });
    }

    this.router.navigate(['/homepage/list']);

  }

  _handleReaderLoaded(readerEvt): void {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    const quest = new Question(
      this.question.value.description,null,
      this.base64textString,
      this.files[0].type
    );
    quest.authorId = this._authenticationService.user.id;


    this._questionDataService.addPublicQuestion(quest).subscribe(
      item => console.log(item)
      ,
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while updating question for ${
          quest.description
          }: ${error.error}`;
      });
    this.router.navigate(['/homepage/list']);
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
  }


}
