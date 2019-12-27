import { Component, OnInit } from '@angular/core';
import { user } from './user';
import {FormService} from './form.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit{
  constructor(
    private FormService : FormService ,
    private toastr: ToastrService,
    ){}
    ngOnInit(){}


    showToaster(value : string){
      this.toastr.success(value);
    };
  
    showToastererror(value : string){
      this.toastr.error(value);
    };


  userModel = new user("","","","Small Only","System based calculation","template 1","ARMADA",null,null,null,"Reach pincoce","","Rate_Form","pending");  
  base=new user("","","","Small Only","System based calculation","template 1","ARMADA",null,null,null,"Reach pincoce","","Rate_Form","pending");
  associates = ["Small Only", "Large Only", "Both"];
  cobjects = [
    "System based calculation",
    "ID based calculation(for small and volumetric shipments)"
  ];
  SLSPtemplates = ["template 1", "template 2"];
  SLSPStations = ["abcd", "efgh", "ijkl"];
  vehicles = ["ARMADA", "Fixed vehicle from vendor", "Own(van or bike)"];
  foptions = [
    "Reach pincoce",
    "Difficult Area",
    "Others - provide details in remarks"
  ];

  onSubmit(){                             //after submit form is passed to reset
   console.log(this.userModel);
   console.log(JSON.stringify(this.userModel));
    this.FormService.addPost(this.userModel).subscribe(
      data => {
      this.showToaster("submitted successfully"),
      this.reset();
     },
      error => {
      this.showToastererror("error");
      }
    );;
      };
   reset(){
      this.userModel=this.base;
   }   
}
