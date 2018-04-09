import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: true })
    ],
    declarations: [
        PageNotFoundComponent,
        ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }