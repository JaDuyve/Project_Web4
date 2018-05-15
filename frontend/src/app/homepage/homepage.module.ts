import { basehttpInterceptorProviders } from './../http-interceptors/index';
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
import { GroupResolverService } from './group-resolver.service';
import { GroupQuestionListComponent } from './group-question-list/group-question-list.component';
import { GroupAddQuestionComponent } from './group-add-question/group-add-question.component';
import { ChatComponent } from './chat/chat.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ChatService } from './chat.service';


const routes: Routes = [
    { path: 'list', component: QuestionListComponent },
    { path: 'add', component: AddQuestionComponent },
    { path: 'homepage', component: HomepageComponent },
    {
        path: 'question-detail/:id',
        component: QuestionDetailComponent
        ,
        resolve: { question: QuestionResolverService }
    },
    {
        path: 'group/:id',
        component: GroupComponent,
        resolve: { group: GroupResolverService }
    },
    {
        path: 'chat',
        component: ChatComponent
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
        QuestionfilterService,
        GroupQuestionListComponent,
        GroupAddQuestionComponent,
        ChatComponent,
        MessagesListComponent,
        MessageItemComponent,
        MessageFormComponent
    ],
    providers: [basehttpInterceptorProviders,
         httpInterceptorProviders, 
         QuestionDataService, 
         GroupDataService, 
         QuestionResolverService, 
         GroupResolverService,
        ChatService]
})

export class HomepageModule { }