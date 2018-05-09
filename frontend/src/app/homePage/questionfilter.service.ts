import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models/question.model';

@Pipe({
  name: 'questionFilter'
})
export class QuestionfilterService implements PipeTransform{

  transform(questions: Question[], description: string): Question[] {
    if (!description || description.length === 0){
      return questions;
    }
    return questions.filter(
      question => question.description && question.description.toLowerCase().includes(description.toLowerCase())
    )
  }
  constructor() { }

}
