import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherApiService } from './services/weather-api.service'
import { Observable } from 'rxjs';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { IforecastLocation } from './model/IforecastLocation';
import { Iforecast } from './model/Iforecast';
import { User } from './model/User';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public city = "";
    public weather: any[] = [];
    public weatherHourly: any[] = [];
    public getStateName: any;

    public checker: boolean = false;
    public time: string | undefined;

// CRUD - operators variables
    users: Array<User> = [];
    editedUser: User|null = null;
    isNewRecord: boolean = false;

// Reactive forms
     login: string = "";
     password: string = "";

    public constructor(private http: HttpClient, private weatherApiService: WeatherApiService, public userService: UserService) {

        this.userService.getUsers().subscribe((x: User[]) => console.log('Armagedon - ', x));

            setInterval(() => {
                this.time = new Date().toLocaleTimeString('ru-Ru');
            }, 1000)
    }

    public ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.getWeatherByCoordinates_component(position.coords);
                this.getWeatherHourlyByCoordinates_component(position.coords);
            });
        } else {
            console.error("The browser does not support geolocation...");
        }
    }

    getUsers_component(): void{
        let itemOfUsers: any;
        this.userService.getUsers().subscribe((data)=> {
            itemOfUsers = data
            console.log("getUsers action - ", itemOfUsers)
            this.users = data;
        })
    }

    createUser_component(): void {
        this.userService.createUser({login: this.login, password: this.password}).subscribe((x:any)=>  {
            console.log("createUser action - ",x)
            this.userService.getUsers().subscribe((x)=> console.log('getUsers in CreateUsers',x))})
    }

    editUser_component():void {
    }

    deleteUser_component():void {
        this.userService.getUsers().subscribe((x)=>console.log('getter',x))
        this.userService.deleteUser(1)
        .subscribe(data => {
            this.users = this.users.filter(item => item.id !==1);
            console.log('Post deleted successfully!');
        this.userService.getUsers().subscribe((x)=>console.log('getter',x))

            console.log(data)
        })
    }




    getCurrentHourlyWeather(): void {
        const startDate: number = new Date().getTime();
        const finalDate: number = startDate + (12 * 60 * 60 * 1000);
        this.weatherHourly = (this.weatherHourly as Iforecast[]).filter((v) => (
            new Date(v.utcTime).getTime() > startDate && new Date(v.utcTime).getTime() <= finalDate))

    }

    getWeatherByCoordinates_component(coordinates: GeolocationCoordinates): void {
        this.weatherApiService.getWeatherByCoordinates_service(coordinates)
            .subscribe((weatherByCoordinates_serviceResult: IforecastLocation) => {
                this.weather = weatherByCoordinates_serviceResult.forecast.slice(0, 7);  // take 7 elements
                this.getStateName = weatherByCoordinates_serviceResult.state
                console.log('Имя штата - ', this.getStateName)
            }, error => {
                console.error(error);
            });
    }

    getWeatherHourlyByCoordinates_component(coordinates: GeolocationCoordinates): void {
        this.weatherApiService.getWeatherHourlyByCoordinates_service(coordinates)
            .subscribe(weatherHourlyByCoordinates_serviceResult => {
                this.weatherHourly = weatherHourlyByCoordinates_serviceResult.forecast;
                this.getCurrentHourlyWeather();
            }, error => {
                console.error(error);
            });
    }

    getResponseHourlyByCityName(cityName: string): void {
        this.weatherApiService.getWeatherHourlyByName_service(cityName)
            .subscribe((getWeatherHourlyByName_serviceResult: IforecastLocation) => {
                this.weatherHourly = getWeatherHourlyByName_serviceResult.forecast;
                this.getCurrentHourlyWeather()
            })
    }

    getResponseByCityName(cityName: string): void {
        console.log('this is cityname', this.city)
        this.weatherApiService.getWeatherByName_service(cityName)
            .subscribe((getWeatherByName_serviceResult: IforecastLocation) => {
                this.weather = getWeatherByName_serviceResult.forecast.slice(0, 7);
            })
    }

    getHourlyAndDailyResponse(event: string) {
        this.getResponseHourlyByCityName(event);
        this.city = event;
        this.getResponseByCityName(event);
    }

    public chekerFunc_1() {
        if (this.weather.length !== 0 && this.weatherHourly.length !== 0) {
            return true;
        }
        return false;
    };

    public chekerFunc_2() {
        if (this.weather.length !== 0 && this.weatherHourly.length !== 0) {
            return true;
        }
        return false;
    };


    showCityName() {
        if (this.city === "") {
            return this.getStateName;
        }
        return this.city;
    }


}
// grodno - 53.669852, 23.822354
// brest - 52.099743, 23.763865
// vitebsk - 55.191999, 30.192833
// gomel - 52.435879, 30.993137
// mogilev - 53.896670, 30.334958