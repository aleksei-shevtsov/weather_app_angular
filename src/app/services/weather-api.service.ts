import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private APP_ID: string = "DemoAppId01082013GAL" ;
  private APP_CODE: string = "AJKnXv84fjrb0KIHawS0Tg";

  constructor(private http: HttpClient) { }

  public getWeatherByCoordinates(coordinates: GeolocationCoordinates): Observable<any> {
   return this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.APP_ID + "&app_code=" + this.APP_CODE, "jsonpCallback")
        .pipe(map(result => { console.log(result); return (<any>result).dailyForecasts.forecastLocation; }))  
}

public getWeatherHourlyByCoordinates(coordinates: GeolocationCoordinates): Observable<any> {
  return this.http.jsonp("https://weather.api.here.com/weather/1.0/report.json?product=forecast_hourly&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.APP_ID + "&app_code=" + this.APP_CODE, "jsonpCallback")
        .pipe(map(result => { console.log(result); return (<any>result).hourlyForecasts.forecastLocation; }))
}

}
