import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';


import { AppComponent } from './app.component';
import { NieuwsfeedComponent } from './nieuwsfeed/nieuwsfeed.component';
import { AddPublicQuestionComponent } from './add-public-question/add-public-question.component';
import { PublicQuestionComponent } from './public-question/public-question.component';


@NgModule({
  declarations: [
    AppComponent,
    NieuwsfeedComponent,
    AddPublicQuestionComponent,
    PublicQuestionComponent
  ],
  imports: [
    BrowserModule, SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }