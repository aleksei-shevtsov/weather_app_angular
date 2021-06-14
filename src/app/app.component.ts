import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WeatherApiService } from './services/weather-api.service'
import { Observable } from 'rxjs';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { IforecastLocation } from './model/IforecastLocation';
import { Iforecast } from './model/Iforecast'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public city = "";
    public weather: any[] = [];
    public weatherHourly: any[] = [];

    public time: string | undefined;

    public constructor(private http: HttpClient, private weatherApiService: WeatherApiService) {

        setInterval(() => {
            this.time = new Date().toLocaleTimeString('ru-Ru');
        }, 1000)
    }

    getCurrentHourlyWeather(): void {
        const startDate: number = new Date().getTime();
        const finalDate: number = startDate + (12 * 60 * 60 * 1000);
        this.weatherHourly = (this.weatherHourly as Iforecast[]).filter((v) => new Date(v.utcTime).getTime() > startDate && new Date(v.utcTime).getTime() <= finalDate)
    }



    public ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.getWeatherByCoordinates_component(position.coords)
                this.getWeatherHourlyByCoordinates_component(position.coords);
            });
        } else {
            console.error("The browser does not support geolocation...");
        }
    }

    getWeatherByCoordinates_component(coordinates: GeolocationCoordinates): void {
        this.weatherApiService.getWeatherByCoordinates_service(coordinates)
            .subscribe((weatherByCoordinates_serviceResult: IforecastLocation) => {
                this.weather = weatherByCoordinates_serviceResult.forecast.slice(0, 7);  // take 7 elements
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

        this.weatherApiService.getWeatherByName_service(cityName)
            .subscribe((getWeatherByName_serviceResult: IforecastLocation) => {
                this.weather = getWeatherByName_serviceResult.forecast.slice(0, 7);
            })
    }

    getHourlyAndDailyResponse(event: string) {
        this.getResponseByCityName(event);
        this.getResponseHourlyByCityName(event)
        this.city = event;
    }
    
    showCityName() {
        return this.city
    }


}



function showCityName() {
    throw new Error('Function not implemented.');
}
// grodno - 53.669852, 23.822354
// brest - 52.099743, 23.763865
// vitebsk - 55.191999, 30.192833
// gomel - 52.435879, 30.993137
// mogilev - 53.896670, 30.334958