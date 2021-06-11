import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MomentPipe } from './moment.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';


@NgModule({
    declarations: [
        AppComponent,
        MomentPipe,
        BurgerMenuComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
