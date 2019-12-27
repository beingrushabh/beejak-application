import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { user } from './user';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import {AppComponent} from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class FormService {
  refersh = new Subject();
  filtered = new Subject();
  private subject1 = new Subject<any>();

  postUrl = '/api/method/frappe.desk.form.save.savedocs';
  constructor(private http: HttpClient,
    //private AppComponent:AppComponent
    private Router:Router,
    private toastr : ToastrService
       ) {}

  updateUrl ="/api/method/erpnext.projects.doctype.rate_form.rate_form.updateField";
  filterUrl ="/api/method/erpnext.projects.doctype.rate_form.rate_form.fiterField";
  
  httpOptions = {
  headers: new HttpHeaders({
      'Content-type':'application/json',
      'Authorization' : 'my-auth-token' 
  })
}
status : string;

  addPost(userModel: user){
    return this.http.post(this.postUrl,{doc:JSON.stringify(userModel),action:"Save"})
  }

  showToaster(value : string){
    this.toastr.success(value);
  };

  showToastererror(value : string){
    this.toastr.error(value);
  };
  reload(){
    this.Router.navigate(["./list"]);
};
  updatePost(name :  string){
    console.log(name);
    return this.http.post(this.updateUrl,
      { name : name }).
      subscribe( 
        (data) =>{
          console.log(data)
          console.log("dyammmm"),
        this.updated=true,
        this.refersh.next('asda')
        this.showToaster('Query updated successully');
       },
       (error)=>{
        this.showToastererror('Error');
       }
      )
  }
  data : object;
  filterPost(filter, filter1, addsort, pcurrent, plength){
    console.log(filter);
    console.log(filter1);
    return this.http.post(this.filterUrl,{
      filter : filter,
      filter1: filter1,
      addsort:addsort,
      pstart: pcurrent,
      plength: plength
    })
  }

  uniqueURL="/api/method/erpnext.projects.doctype.rate_form.rate_form.uniqueElement"
  uniqueElement(field){
    console.log(field);
    return this.http.post(this.uniqueURL,{
      field : field
    })
  }
  updated = false;
}
