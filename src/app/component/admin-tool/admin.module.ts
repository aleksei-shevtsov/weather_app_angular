import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

@NgModule({
    imports:      [ BrowserModule, RouterModule ],
    declarations: [ AdminComponent, UserComponent ],
    exports: [ AdminComponent, UserComponent ]
})
export class AdminModule { }