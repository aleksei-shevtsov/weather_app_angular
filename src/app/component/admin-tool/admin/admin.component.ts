import { Component, NgModule, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { CreateUserComponent } from '../../createUser/create-user.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public userService: UserService) { }

  public users: User[] = [];

  ngOnInit(): void {
    this.getDataBase()
  }

  getDataBase() {
    this.userService.getUsers().subscribe(x => {
      this.users = x
    }
    )
  }

}

