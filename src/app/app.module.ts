import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MomentPipe } from './moment.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { CreateUserComponent } from './createUser/create-user.component';



@NgModule({
    declarations: [
        AppComponent,
        MomentPipe,
        BurgerMenuComponent,
        CreateUserComponent,
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
          )
    ],
    providers: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
