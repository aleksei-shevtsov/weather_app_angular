import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherApiService } from '../services/weather-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.css']
})
export class BurgerMenuComponent implements OnInit {

  @ViewChild("toggle", { read: ElementRef })
  toggle: ElementRef | undefined;
  selectedItem: any;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.toggle != undefined)
      console.log('toggle:', this.toggle.nativeElement)
  }

  toggleClick(event: any, firstValue: any, secondValue: any,) {
    console.log(firstValue);
    firstValue.classList.toggle('active');
    secondValue.classList.toggle('active');
  }

  getNameOfCity(a: string) {
    console.log(a);
    this.newItemEvent.emit(a);
  }
}
