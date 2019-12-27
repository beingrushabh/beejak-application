import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private toastr:ToastrService,
    private http : HttpClient){}

  public error = false;
    public loggedIN = new Subject();
  loginmessage: string;
  // output_login(data: object){
  //     loginmessage = this.data.message
  // }
  


  showToastererror(value : string){
    this.toastr.error(value);
  };
  user;
  loggedin ;
  login( usr1, pwd1 )
  {
    this.http.post("/api/method/login", {usr: usr1 , pwd: pwd1}).subscribe(
      data=>{
        console.log(data)
        //this.output_login(data)
        this.loggedin= true;
        this.loggedIN.next('few');
        this.user= data;
      },
      error => {
        this.error = true;
        this.loggedin= false;
        console.log("ERROR_RUSHABH"+ error); //gives an object at this point
       this.showToastererror('Cant login, try again');
    }
    )
  }
}
