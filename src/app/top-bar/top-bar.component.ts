import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_ZIPCODE } from '../location-reducer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  loc: string;
  zip: number;
  lat: bigint;
  lon: bigint;
  constructor(private store: Store<any>) { }
  ngOnInit() {}

  search(searchForm: NgForm) {
    if (searchForm.invalid) {
      return;
    }

    // this.store.dispatch({ type: SET_LOCATION, payload: this.loc })
    this.store.dispatch({ type: SET_ZIPCODE, payload: this.zip })
    // this.store.dispatch({ type: SET_LATITUDE, payload: this.lat })
    // this.store.dispatch({ type: SET_LONGITUDE, payload: this.lon })
  }
}