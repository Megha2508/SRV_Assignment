import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import { findLast } from '@angular/compiler/src/directive_resolver';
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
  lati:bigint
  long:bigint
  msg: string;
  alldates = []
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
        this.lati = this.currentWeather.coord.lat
        this.long = this.currentWeather.coord.lon
      }, err => {}, () => {
        this.searchForecast(this.lati, this.long);
      })
  }
  searchForecast(lat: bigint, lon: bigint) {
    this.weatherService.getForecast(lat, lon)
      .subscribe(res => {
        this.forecast = res
        let temp_max = res['daily'].map(res => res.temp.max)
        let temp_min = res['daily'].map(res => res.temp.min)
        this.alldates = res['daily'].map(res => res.dt)
        this.alldates.splice(7)
        let weatherDates = []
        let Day = []
        let max = []
        let min = []
        let desc = this.forecast.current['weather'].map(res => res.description)
        this.alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleString('en',{day: 'numeric'}))
        })
        console.log(Day)
        temp_max.forEach((res) => {
          max.push(res)
        })
        temp_min.forEach((res) => {
          min.push(res)
        })
        let htmlRef = this.elementRef.nativeElement.querySelector(`canvas`);
        this.chart = new Chart(htmlRef, {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              { 
                label: 'Max Temp',
                data: max,
                borderColor: "#3cba9f",
                fill: true
              },
              { 
                label: 'Min Temp',
                data: min,
                borderColor: "#ffcc00",
                fill: true
              }
            ]
          },
          options: {
            tooltips:{
              callbacks: {
                afterBody: function(tooltipItem, data){
                  return "Condition: " + desc
                }
              }
            },
            legend: {
              display: true
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
      }, err => {
    })
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}