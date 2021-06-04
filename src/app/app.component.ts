import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherApiService } from './services/weather-api.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



    public weather: any;
    public weatherHourly: any;
    public date: Date = new Date();

    public time: string | undefined;

    public constructor(private http: HttpClient, private weatherApiService: WeatherApiService) {

        this.weather = [];


        setInterval(() => {
            this.time = new Date().toLocaleTimeString('ru-Ru');
        }, 1000)
    }

    public ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.getWeatherByCoordinates(position.coords)
                this.getWeatherHourlyByCoordinates(position.coords);
            });
        } else {
            console.error("The browser does not support geolocation...");
        }
    }

    getWeatherByCoordinates(coordinates: GeolocationCoordinates): void {
        this.weatherApiService.getWeatherByCoordinates(coordinates)
            .subscribe(result => {
                this.weather = result.forecast.slice(0, 7);  // take 7 elements
            }, error => {
                console.error(error);
            });


    }

    getWeatherHourlyByCoordinates(coordinates: GeolocationCoordinates): void {
        this.weatherApiService.getWeatherHourlyByCoordinates(coordinates)
            .subscribe(result => {
                this.weatherHourly = result.forecast;
            }, error => {
                console.error(error);
            });
    }

    getCurrentHourlyWeather() {
        if ((this.date.getTime()) == (this.weatherHourly.forescast.getTime())) return this.weatherHourly.forecast.utcTime.getTime()
    }



}

// grodno - 53.669852, 23.822354
// brest - 52.099743, 23.763865
// vitebsk - 55.191999, 30.192833
// gomel - 52.435879, 30.993137
// mogilev - 53.896670, 30.334958