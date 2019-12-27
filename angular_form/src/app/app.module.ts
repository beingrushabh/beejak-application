import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AppRoutingModule, routingcomponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule, MatTableModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [AppComponent, routingcomponents],
  imports: [BrowserModule, 
    AppRoutingModule,
    FormsModule, 
    AngularMultiSelectModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule, 
    MatTableModule, 
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}




