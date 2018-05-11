import { AuthGuardService } from './user/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageModule } from './homepage/homepage.module';
import { AppRoutingModule } from './app-routing/app-routing.models';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSemanticModule } from 'ng-semantic';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    
  
  ],
  imports: [
    BrowserModule,
    UserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})

export class AppModule { }
