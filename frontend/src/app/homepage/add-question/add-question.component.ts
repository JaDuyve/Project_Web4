import { QuestionDataService } from './../question-data.service';
import { Question } from './../../models/question.model';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
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

  private base64textString: string = "";
  private files;

  constructor(
    private fb : FormBuilder,
    private _authenticationService: AuthenticationService,
    private _questionDataService: QuestionDataService
  ) {

  }

  ngOnInit() {
    this.question = this.fb.group({
      description: [''],
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
        this.question.value.description,
        this._authenticationService.user$.value.username);

      console.log(quest);

      this.newQuestion.emit(quest);
    }



  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    
    const quest = new Question(
      this.question.value.description,
      this._authenticationService.user$.value.username,
      this.base64textString,
      this.files[0].type
    );

    this.newQuestion.emit(quest);
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
  }


}
