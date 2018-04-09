import { Question } from './../../models/question.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  @Output() public newQuestion = new EventEmitter<Question>();
  private question: FormGroup;
  public errorMsg: string;

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit() {
    this.question = this.fb.group({
      description: ['']
    });
  }

  onSubmit() {
    const question = new Question(this.question.value.description, "jari");
        
    this.newQuestion.emit(question);
  }

}
