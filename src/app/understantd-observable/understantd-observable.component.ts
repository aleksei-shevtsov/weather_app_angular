import { HttpClient, HttpParams } from '@angular/common/http';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, Subject } from 'rxjs';
import { debounceTime, map, multicast } from 'rxjs/operators';
import { IforecastLocation } from '../model/IforecastLocation';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { WeatherApiService } from '../services/weather-api.service';

@Component({
  selector: 'app-understantd-observable',
  templateUrl: './understantd-observable.component.html',
  styleUrls: ['./understantd-observable.component.css']
})
export class UnderstantdObservableComponent implements OnInit {
  public city = "";
  weather: any;
  private APP_ID: string = "DemoAppId01082013GAL";
  private APP_CODE: string = "AJKnXv84fjrb0KIHawS0Tg";
  private API_URL: string = "https://weather.api.here.com/weather/1.0/report.json";
  private url = '/api/users';


  constructor(private weatherApiService: WeatherApiService, private http: HttpClient, public userService: UserService) { }


  ngOnInit(): void {
    // this.usersGet();
    this.getUsers().subscribe()
    setTimeout(() => {
      this.getUsers().subscribe()  
    }, 1000);
        
    this.getNumbers().subscribe(x => console.log('this subject',x))
  }

  
  // .subscribe((x)=>this.getUsers().subscribe((x)=>x))
  public users: any;
  public result: any;

  public getUsers(): Observable<any> {

    if (this.users) {
      console.log('1---')
      return of(this.users);

    } else {
      console.log('2---')
      return this.userService.getUsers().pipe(map((users)=>this.users= users))
    }
  }

  
  
private getNumbers():BehaviorSubject<any>{
  const subject = new BehaviorSubject(1);
      of(5).pipe(
        debounceTime(1000),
        map((x:any) => {
         return x+1
        }),
        map((x:any) => x*2),
        map((x:any) => {
          subject.next(x)
          return x
        }),
        map((x:any) => x-2),
      ).subscribe()

      return subject
    }
} 