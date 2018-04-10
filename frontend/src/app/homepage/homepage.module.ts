import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionComponent } from './question/question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDataService } from './question-data.service';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { httpInterceptorProviders } from '../http-interceptors';


const routes: Routes = [
    { path: 'homepage', component: HomepageComponent }
];


@NgModule({
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        
    ],
    declarations: [
        CommentComponent,
        QuestionComponent,        
        QuestionListComponent,
        AddQuestionComponent,
        HomepageComponent,
    ],
    providers: [httpInterceptorProviders, QuestionDataService]
})

export class HomepageModule { }