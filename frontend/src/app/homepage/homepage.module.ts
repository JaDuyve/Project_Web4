import { QuestionResolverService } from './question-resolver.service';
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
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { GroupComponent } from './group/group.component';
import { QuestionfilterService } from './questionfilter.service';
import { BaseUrlInterceptor } from '../http-interceptors/BaseUrlInterceptor';
import { GroupDataService } from './group-data.service';


const routes: Routes = [
    { path: 'list', component: QuestionListComponent },
    { path: 'add', component: AddQuestionComponent },
    { path: 'homepage', component: HomepageComponent },
    {
        path: 'question-detail/:id',
        component: QuestionDetailComponent
        ,
        resolve: { question: QuestionResolverService }
    }
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
        QuestionDetailComponent,
        GroupComponent,
        QuestionfilterService
    ],
    providers: [BaseUrlInterceptor, httpInterceptorProviders, QuestionDataService, GroupDataService, QuestionResolverService]
})

export class HomepageModule { }