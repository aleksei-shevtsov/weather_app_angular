import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent implements AfterViewInit  {

  @ViewChild("toggle", { read: ElementRef })
  toggle: ElementRef | undefined;

  @Output() newItemEvent = new EventEmitter<string>();

  citiesArray: string[] = ['Hrodno', 'Brest', 'Minsk'];

  constructor() { }

  ngAfterViewInit():void {
    if (this.toggle != undefined)
      console.log('toggle:', this.toggle.nativeElement)
  }

  toggleClick(firstValue: HTMLElement, secondValue: HTMLElement):void {
    console.log(firstValue);
    firstValue.classList.toggle('active');
    secondValue.classList.toggle('active');
  }

  // toggleActiveClass(burgerClass: any, first: any, second: any, third: any, fourth: any) {
  //   burgerClass.classList.toggle('active');
  //   first.classList.toggle('active');
  //   second.classList.toggle('active');
  //   third.classList.toggle('active');
  //   fourth.classList.toggle('active');
  // }


  name: string = "";

  getNameOfCity(city: any): void {
    console.log(city);
    let cityName = document.getElementById(city);
    this.name = city
    this.newItemEvent.emit(city);

    console.log(cityName)

  }



}
