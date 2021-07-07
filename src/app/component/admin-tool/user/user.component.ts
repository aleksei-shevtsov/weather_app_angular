import { Component, OnInit } from '@angular/core';
import { Subscription, fromEvent, OperatorFunction } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { mergeMap, map } from 'rxjs/operators';
import { User } from 'src/app/model/User';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public id: any;
  public user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    console.log('userComp')
    route.params
      .pipe(mergeMap((value: Params/*{id:1}*/) => {
        console.log('this is value pipe',value)
        return userService.getUserById(value.id);
      }))
      .subscribe((params: any) => {
        this.user = params
        console.log('heeey', params, this.user.id)
      });
  }

  ngOnInit(): void {

  }


}
