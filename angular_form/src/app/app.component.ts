import { Component } from "@angular/core";
import {Login} from './login';
import {AppService} from './app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})
export class AppComponent {

  constructor(
    private AppService : AppService,
    private  toastr: ToastrService
    ){
      this.AppService.loggedIN.subscribe(
        data =>{
          this.loggedin = this.AppService.loggedin,
          this.showToaster("Logged in successfully")
        }
      )
  }
  loggedin : boolean;
  
  login(){
    this.AppService.login(this.loginModel.username,this.loginModel.password);
}
onSubmit(){
  
}
head="List View";
  loginModel = new Login("administrator","admin");
   formUp = true;
    head1 = "List view"

    routing_link: string;   
    //routing_link = "./list";  

    toggleForm(){
    this.formUp = !this.formUp;
    if(!this.formUp)
    {
      this.routing_link = "./list"
      this.head1 = "New Entry";
    }
    else{
      this.routing_link = "./form"
      this.head1 = "List View";
    }
  };

  showToaster(value : string){
    this.toastr.success(value)
}


};

