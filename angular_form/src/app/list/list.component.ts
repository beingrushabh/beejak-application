import { Component, OnInit, ViewChild} from '@angular/core';
import { ListService } from './list.service';
import { Status } from './status';
import { FormService } from '../form/form.service';
import { user } from '../form/user';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Filter } from './filter';
import { error } from 'protractor';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import {MultiselectVar} from './multiselect-var'
import {AppService} from '../app.service'

//import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  constructor(
    private ListService: ListService,
    private formService : FormService,
    private router : Router,
    private toastr : ToastrService,
    private appservice: AppService,
    ) { 
      this.formService.refersh.subscribe(
        data=>{
          this.getPost()
          this.Marray=[];
          this.reset.next('fre');
        } 
      )
      this.reset.subscribe(
        data => {
          this.Select_Multiple();
        }
      )
  
    }
    showToaster(value : string){
      this.toastr.success(value);
    };

    showToastererror(value : string){
      this.toastr.error(value);
    };
reset =new Subject();

    ngOnInit(){
      this.getPost();
      this.dropdownSettings = {                              //angular multivariable setting
        singleSelection: false,
        text:"Station Codes",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        badgeShowLimit:0,
        classes:"myclass col-lg-3 custom-class"
      };  
      this.dropdownSettings1 = {                          //angular multivariable setting
        singleSelection: false,
        text:"Station Associate",
        selectAllText:'Select All',
        unSelectAllText:'UnSelect All',
        enableSearchFilter: true,
        badgeShowLimit:0,
        classes:"myclass custom-class"
      };     
  
      
      this.formService.uniqueElement('stationcode')             //gets unique element to show in filter
  .subscribe(
    data => this.output(data),
    error=> this.showToastererror('error in seeking data')
  );
  // console.log(this.sctemp);
  this.formService.uniqueElement('stationassociate') .subscribe(
    data => this.output1(data),
    error=> this.showToastererror('error in seeking data')
  );
    }


    isnotAdmin(){                     // this enables and disables the change  status button( pending and disable) according to the user
      console.log("admin"+this.appservice.user.full_name);
      if(this.appservice.user.full_name=="Administrator")
      {return false}
      else
      {return true}
    }
    

  dropdownSettings1;
  dropdownSettings;
  user1= [];
  user2 : object;
  user3 : object;
  user4= new MultiselectVar(null,"");
  SelectMultiple="Select";
countsc=0;
countsa=0;



  Marray=[];
  Multiple_Update(value: string, value1 : string, status_c : boolean)             //function to update status of multiple ststus in one go
  { 
    var index = this.Marray.indexOf(value);
    if(index>=0)
    { this.Marray.splice(index, 1);}
    else if(value1 == "pending")
    {this.Marray.push(value);}
  }

  MultipleDoneCheck = false;

  Select_Multiple(){
   if(this.Marray.length == 0)
   {
    this.SelectMultiple="Select"
     return "invalid";
    }
   else if(this.MultipleDoneCheck)
   {
     this.MultipleDoneCheck = false
     this.SelectMultiple="pending"
     return "btn-Dark"
   }
   else 
   {
     this.SelectMultiple="pending"
     return "btn-primary"
   }
  }

  Execute_Multiple(){
    for(let one of this.Marray)
    {
      this.Status_change(one); 
    }
    this.MultipleDoneCheck = true;
  }
  sctemp;
  satemp=[];
  i=0;
  output(data: object){
      console.log("yoyoyoy " + data);
     
      for(let instance of (<any>data).message) {
            
        this.user4.itemName = instance.stationcode;
        this.user4.id=this.i;
        this.i++;    
        this.user1.push(this.user4);
          }
          this.i=0;
          this.sctemp = this.user1;
          this.user1=[];   
  }
  output1(data: object){
    console.log("output1 " + data);
   
    for(let instance of (<any>data).message) {
          this.user4.itemName=instance.stationassociate;
          this.user4.id=this.i;
          this.i++;  
          this.user1.push(this.user4);
          this.user4=new MultiselectVar(null,"");
        }
        this.i=0;
        this.satemp = this.user1;
        this.user1=[];    
}


  outputfil(data: object){
    console.log("yoyoyoy " + data);
   
    for(let instance of (<any>data).message[1]) {
          this.user2=instance;
          this.user1.push(this.user2);
        }
        this.user3 = this.user1;
        this.user1=[];
    
}

set_currentp(val : number){
  this.pcurrent= val;
  this.Submit_filter();
  console.log(this.pcurrent);
  console.log(this.plength);
}
next_page(){
 if(Number(this.pcurrent) + Number(this.plength)> this.pagecount)
 {
   this.showToastererror("no more pages")
 }
 else{
  this.pcurrent= Number(this.pcurrent) + Number(this.plength);
  this.Submit_filter();
  console.log(this.pcurrent);
}}
prev_page(){
  this.pcurrent =Number(this.pcurrent) - Number(this.plength);
  if(this.pcurrent < 0)
  {
    this.showToastererror('no prev page')
    this.pcurrent=0;
  }
  console.log(this.pcurrent);
  this.Submit_filter();
}
pageshowing(){
  if(Number(this.pcurrent) + Number(this.plength) > this.pagecount)
 { return this.pagecount}
return  Number(this.pcurrent) + Number(this.plength);
}

  FilterID1=["stationcode","praveshid","stationassociate"];
  FilterID2 = "Equal";
  sort_options=["modified","creation"];
toggle_class(temp : string){
  if(temp == "pending")
  {
    return "btn-primary";
  }
  else{
    return "btn-dark";
  }
}

  ListFilter=new Filter(null,"stationcode","","Rate_Form");
  updateUrl1 : string;
  status1 = new Status("pending");
  status=this.status1.current_status;


  Addsort = "modified desc"
  Addsort1 = "modified";  
  sort_way = "desc";

  ListFilterAdd: string;
  ListFilterAddMultiple1 =[];
  ListFilterAddMultiple2 =[];
  ListFilterJson=[];

  Status_change(value: string){ 
    console.log(value);
    this.formService.updatePost(value);
    };
    new_filter: object;
    index=0;
   
    map1 = new Map();
temp1:string;
temp2=[];

filterif=false;
    Add_filter(){
      this.ListFilterAddMultiple1=[];
      this.ListFilterAddMultiple2=[];
      console.log("fc"+this.filter_sc);
      if(this.filter_sc != "" && this.filter_sc)
      {
        this.filterif=true;
        for(let x of this.filter_sc)
      {
        this.temp1= x.itemName;
        this.temp2.push(this.temp1);
       
      }
      this.filter_sct=this.temp2;
        this.ListFilterAddMultiple1.push("stationcode");
        this.ListFilterAddMultiple2.push(this.filter_sct); 
        this.temp2=[];         
      }
      if(this.filter_pid!="")
      {
        this.filterif=true;
        this.ListFilterAddMultiple1.push("praveshid");
        this.ListFilterAddMultiple2.push(this.filter_pid);        
      }
      if(this.filter_sa != "" && this.filter_sa)
      {
        this.filterif=true;
      for(let x of this.filter_sa)
      {
        this.temp1= x.itemName;
        this.temp2.push(this.temp1);
      }
      this.filter_sat=this.temp2
        this.ListFilterAddMultiple1.push("stationassociate");
        this.ListFilterAddMultiple2.push(this.filter_sat); 
        this.temp2=[];  
      }
      if(!this.ListFilterAddMultiple1.length)
      {
        this.filterif=false;
      }    
      this.index++;
      this.pcurrent=this.pstart;
      this.Submit_filter();
      this.showToaster("Filter Applied")
      
    }


    filter_sc;
    filter_sct;
    filter_pid="";
    filter_sa;
    filter_sat;
    pagecount: number;
    data1;
    Submit_filter(){
     this.formService.filterPost(JSON.stringify(this.ListFilterAddMultiple1),JSON.stringify(this.ListFilterAddMultiple2),this.Addsort,this.pcurrent, this.plength)
     .subscribe(
        data =>{
          console.log(data)
          this.pagecount=((<any>data).message[0]),
          this.outputfil(data)
        },
        error =>{
          this.showToastererror("error");
        }
      );
      console.log("data1"+this.data1);
    }
    Clear_filter(){
      this.ListFilterAddMultiple1=[];
      this.ListFilterAddMultiple2=[]; 
      this.Submit_filter();
      this.filter_sc=[];
      this.filter_sa=[];
      this.showToastererror("All filters removed");
      this.Add_filters();
      this.filterif=false;
    }
    temp;
    addsortbool=false;
    Add_Sort(){
      this.addsortbool=!this.addsortbool;
      this.Addsort=this.Addsort1 + " " + this.sort_way;
      this.Submit_filter();
    }
    arrow="fas fa-arrow-up";
    plength= 25;
    pstart=0;
    pcurrent= 0;

    toggle_sort_way(){
      
      if(this.sort_way=="desc")
      {
        this.sort_way="asc";
      }
      else
      {
        this.sort_way="desc";
      }
      this.Addsort=this.Addsort1 + " " + this.sort_way;
      this.Submit_filter();
      
      this.arrow="fas fa-arrow-up";

      if(this.sort_way=="desc")
      {
        this.arrow= "fas fa-arrow-up";
      }
      else{
        this.arrow= "fas fa-arrow-down";
      }
    }


getPost(){
  this.Submit_filter();
   }
   
addFilter= false;

Add_filters(){                  // add filter toggle
      this.addFilter=!this.addFilter;
    }

request_input="false";
doubleConfirm = false;
}


