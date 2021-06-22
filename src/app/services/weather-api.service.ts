import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';
import { IforecastLocation } from '../model/IforecastLocation'


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private APP_ID: string = "DemoAppId01082013GAL";
  private APP_CODE: string = "AJKnXv84fjrb0KIHawS0Tg";
  private API_URL: string = "https://weather.api.here.com/weather/1.0/report.json";
   

  constructor(private http: HttpClient) { }



  public getWeatherByCoordinates_service(coordinates: GeolocationCoordinates): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      product: 'forecast_7days_simple',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      app_id: this.APP_ID,
      app_code: this.APP_CODE
    })
    return this.http.get(`${this.API_URL}`, { params: params })
      .pipe(tap(console.log), map(result => { console.log(result); return (<any>result).dailyForecasts.forecastLocation; }))
  }

  public getWeatherHourlyByCoordinates_service(coordinates: GeolocationCoordinates): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      product: 'forecast_hourly',
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      app_id: this.APP_ID,
      app_code: this.APP_CODE
    })
    return this.http.get(`${this.API_URL}`, { params: params })
      .pipe(map(result => { console.log('ByCoordinates_ 2 ',result); return (<any>result).hourlyForecasts.forecastLocation; }))
  }


  public getWeatherByName_service(name: string) {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      product: 'forecast_7days_simple',
      name: name,
      app_id: this.APP_ID,
      app_code: this.APP_CODE
    })
    return this.http.get(`${this.API_URL}`, { params: params })
      .pipe(map(result => { console.log('RABOTAET_1 ',result); return (<any>result).dailyForecasts.forecastLocation; }))
  }

  public getWeatherHourlyByName_service(name: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.appendAll({
      product: 'forecast_hourly',
      name: name,
      app_id: this.APP_ID,
      app_code: this.APP_CODE
    })
    return this.http.get(`${this.API_URL}`, { params: params })
      .pipe(map(result => { console.log('RABOTAET_2 ',result); return (<any>result).hourlyForecasts.forecastLocation; }))
  }
}
