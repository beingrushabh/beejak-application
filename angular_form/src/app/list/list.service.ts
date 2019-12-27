import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient) {
      }

  getUrl = '/api/resource/Rate_Form?fields=["stationcode","praveshid","stationassociate","typeofassociate","typeofcalculation","slsptemplates","vehicleused","totalsmallrate","totallargerate","totalpickuprate","reasons","remarks","owner","status","name"]?limit_start=0&limit_page_length=25';
getPost(){
    return this.http.get(this.getUrl);
  }

}



