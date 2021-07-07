import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MomentPipe } from './moment.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BurgerMenuComponent } from './component/burger-menu/burger-menu.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { CreateUserComponent } from './component/createUser/create-user.component';
// Routes import
import {Routes, RouterModule} from '@angular/router';
import { AdminComponent } from './component/admin-tool/admin/admin.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { UserComponent } from './component/admin-tool/user/user.component';
import { MainComponent } from './component/main/main.component';
import { AdminModule } from './component/admin-tool/admin.module';
import { UnderstantdObservableComponent } from './understantd-observable/understantd-observable.component';

// ^^^


// Child Routes
const UserRoutes: Routes = [
    {path: 'info', component: UserComponent},
]


// Routes
const appRoutes: Routes =[
    { path: '', component: MainComponent},
    { path: 'admin', component: AdminComponent,},
    { path: 'user/:id', component: UserComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        MomentPipe,
        BurgerMenuComponent,
        CreateUserComponent,
        NotFoundComponent,
        MainComponent,
        UnderstantdObservableComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        InMemoryWebApiModule.forRoot(
            InMemoryDataService,{ dataEncapsulation: false,
            passThruUnknownUrl: true }
          ),
          AdminModule,
        RouterModule.forRoot(appRoutes),
        
    ],
    providers: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
