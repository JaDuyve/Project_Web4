import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuardService } from '../user/auth-guard.service';
import { RouterModule, Routes, PreloadingStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomepageModule } from '../homepage/homepage.module';

//tijdelijk
const appRoutes: Routes = [
    {
        path: 'homepage',
        canActivate: [AuthGuardService],
        loadChildren: 'app/homepage/homepage.module#HomepageModule',
        data: {preload: true}
    },
    { path: '', redirectTo: 'homepage/list', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        
        RouterModule.forRoot(appRoutes, { preloadingStrategy: SelectivePreloadStrategy })
    ],
    providers: [SelectivePreloadStrategy],
    declarations: [
        ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }