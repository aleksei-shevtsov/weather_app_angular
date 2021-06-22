import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherApiService } from '../services/weather-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent implements AfterViewInit  {

  @ViewChild("toggle", { read: ElementRef })
  toggle: ElementRef | undefined;
  selectedItem: any;

  @Output() newItemEvent = new EventEmitter<string>();

  citiesArray: string[] = ['Hrodno', 'Brest', 'Minsk'];

  constructor() { }

  ngAfterViewInit() {
    if (this.toggle != undefined)
      console.log('toggle:', this.toggle.nativeElement)
  }

  toggleClick(event: any, firstValue: any, secondValue: any) {
    console.log(firstValue);
    firstValue.classList.toggle('active');
    secondValue.classList.toggle('active');
  }

  toggleActiveClass(burgerClass: any, first: any, second: any, third: any, fourth: any) {
    burgerClass.classList.toggle('active');
    first.classList.toggle('active');
    second.classList.toggle('active');
    third.classList.toggle('active');
    fourth.classList.toggle('active');
  }


  name: string = "";

  getNameOfCity(city: any): void {
    console.log(city);
    let cityName = document.getElementById(city);
    this.name = city
    this.newItemEvent.emit(city);

    console.log(cityName)

  }



}
