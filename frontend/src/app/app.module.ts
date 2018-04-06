import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';


import { AppComponent } from './app.component';
import { AddPublicQuestionComponent } from './homePage/add-public-question/add-public-question.component';
import { PublicQuestionComponent } from './homePage/public-question/public-question.component';
import { CommentComponent } from './comment/comment.component';
import { PublicQuestionListComponent } from './homepage/public-question-list/public-question-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPublicQuestionComponent,
    PublicQuestionComponent,
    CommentComponent,
    PublicQuestionListComponent
  ],
  imports: [
    BrowserModule, SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }