import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../user/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'group-add-question',
  templateUrl: './group-add-question.component.html',
  styleUrls: ['./group-add-question.component.css']
})
export class GroupAddQuestionComponent implements OnInit {

  private question: FormGroup;
  public errorMsg: string;
  @Output() public newQuestion = new EventEmitter<Question>();

  private base64textString: string = "";
  private files;

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
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
        this.question.value.description);

      quest.authorId = this._authenticationService.user.id;

      this.newQuestion.emit(quest);
      // this._questionDataService.addPublicQuestion(quest).subscribe(
      //   item => console.log(item)
      //   ,
      //   (error: HttpErrorResponse) => {
      //     this.errorMsg = `Error ${error.status} while updating question for ${
      //       quest.description
      //       }: ${error.error}`;
      //   });
    }

    // this.router.navigate(['/homepage/list']);

  }

  _handleReaderLoaded(readerEvt): void {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    const quest = new Question(
      this.question.value.description, null,
      this.base64textString,
      this.files[0].type
    );
    quest.authorId = this._authenticationService.user.id;

    this.newQuestion.emit(quest);

    // this._questionDataService.addPublicQuestion(quest).subscribe(
    //   item => console.log(item)
    //   ,
    //   (error: HttpErrorResponse) => {
    //     this.errorMsg = `Error ${error.status} while updating question for ${
    //       quest.description
    //       }: ${error.error}`;
    //   });
    // this.router.navigate(['/homepage/list']);
  }

  handleFileSelect(evt) {
    this.files = evt.target.files;
  }

}
