import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  public toggle: boolean = false;

  myForm: FormGroup;

  constructor(public userService: UserService) {
    this.myForm = new FormGroup({
      userLogin: new FormControl("", [
        Validators.pattern("[A-Za-z0-9].{4,}"),
        Validators.required
      ]),
      userPassword: new FormControl("", [
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}"),
        Validators.required
      ])//lowerCase,upperCase,numbers,at least 8 sym
    });
  }

  submit() {
    
    console.log(this.myForm);
  }
  // Forms variables
  users: Array<User> = [];
  public response = '';


  ngOnInit(): void {
  }

  getUsers_Component(): void {
    let itemOfUsers: any;
    this.userService.getUsers().subscribe((data) => {
      itemOfUsers = data
      console.log("getUsers action - ", itemOfUsers)
      this.users = data;
    })

  }
  createUser_Component(): void {
    this.userService.createUser({
      login: this.myForm.controls.userLogin.value,
      password: this.myForm.controls.userPassword.value
    }).subscribe((x: any) => {
      console.log("createUser action - ", x)
      this.userService.getUsers().subscribe((x) => console.log('getUsers in CreateUsers', x))
    })
    this.myForm.reset()
    this.response = 'User created!';
  }

  enterCreateUser() {
    document.body.style.overflowY = "hidden";
    this.toggle = !this.toggle
  }

  cancelCreateUser() {
    document.body.style.overflowY = "scroll";
    this.toggle = !this.toggle
  }

}
