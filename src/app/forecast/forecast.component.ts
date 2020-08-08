import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  currentWeather: any = <any>{};
  forecast: any = <any>{};
  daily: any = <any>{};
  lat: string;
  lon: string;
  msg: string;
  chart: any = <any>{};
  constructor(
    private store: Store<any>,
    private weatherService: WeatherService,
    private elementRef: ElementRef
  ) {
    this.loc$ = store.pipe(select('loc'));
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    })
  }
  ngOnInit() {
  }
  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc)
      .subscribe(res => {
        this.currentWeather = res;
        console.log(this.currentWeather)
      }, err => {
}, () => {
        this.searchForecast(loc);
      })
  }
  searchForecast(loc: string) {
    this.weatherService.getForecast(loc)
      .subscribe(res => {
        this.forecast = res
        console.log(this.forecast)
        let temp_max = res['list'].map(res => res.main.temp_max)
        let temp_min = res['list'].map(res => res.main.temp_min)
        let alldates = res['list'].map(res => res.dt)
        let weatherDates = []
        let max = []
        let min = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          console.log(jsdate)
          weatherDates.push(jsdate.toLocaleString('en',{day: 'numeric'}))
        })
        temp_max.forEach((res) => {
          max.push(res)
        })
        temp_min.forEach((res) => {
          min.push(res)
        })
        console.log(max)
        console.log(min)
        let htmlRef = this.elementRef.nativeElement.querySelector(`canvas`);
        this.chart = new Chart(htmlRef, {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                data: max,
                borderColor: "#3cba9f",
                fill: true
              },
              { 
                data: min,
                borderColor: "#ffcc00",
                fill: true
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        })
        console.log(this.chart)
        // this.lat = res['list'].map(res => res.city.coord.lat);
        // this.lon = res['list'].map(res => res.city.coord.lon);
      }, err => {
        // this.searchDaily(this.lat, this.lon)
    })
  }
  // searchDaily(lat: string, lon: string){
  //   this.weatherService.getDaily(lat,lon)
  //   .subscribe(res => {
  //     this.daily = res
  //   })
  // }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}