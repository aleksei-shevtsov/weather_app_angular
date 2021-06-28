import { Component, OnInit} from '@angular/core';
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
  
  // Forms variables
  users: Array<User> = [];
  public response = '';

  myForm: FormGroup;

  constructor(public userService: UserService) {
    this.myForm = new FormGroup({
      userLogin: new FormControl("", [
        Validators.pattern("[A-Za-z0-9].{4,}"),
        Validators.required,
        this.customValidator
      ]),
      userPassword: new FormControl("", [
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{8,}")/*lowerCase,upperCase,numbers,at least 8 sym*/,
        Validators.required
      ])
    });
  }

  submit(): void {
    console.log("MyForm ", this.myForm);
  }


  customValidator(control: FormControl): {[s:string]:boolean}|null{
    if ((control.value) && ((control.value as string).includes("fuck"/*bad word*/))){
      return {"userLogin": true};
    }
    return null
  }

  ngOnInit(): void {
    this.getUsers_Component()
  }

  getUsers_Component(): void {
    let itemOfUsers: Array<User>;
    this.userService.getUsers().subscribe((data:Array<User>) => {
      itemOfUsers = data
      console.log("getUsers action - ", itemOfUsers)
      this.users = data;
    })

  }
  createUser_Component(): void {
    this.userService.createUser({
      login: this.myForm.controls.userLogin.value,
      password: this.myForm.controls.userPassword.value
    }).subscribe((x: User) => {
      console.log("createUser action - ", x);
      this.userService.getUsers().subscribe((x: Array<User>) => console.log('getUsers in CreateUsers', x));
    })
    this.myForm.reset();
    this.response = 'User created!';
  }

  enterCreateUser() {
    document.body.style.overflowY = "hidden";
    this.toggle = !this.toggle
  }

  cancelCreateUser() {
    document.body.style.overflowY = "scroll";
    this.toggle = !this.toggle
    /* WORK ON IT */
    var background_createUser: Element = document.getElementsByClassName("background_createUser")[0];
    /* WORK ON IT */
  }

}
