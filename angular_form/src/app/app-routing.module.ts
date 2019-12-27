import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  // {path :"" , component: AppComponent},
  {path : "form", component: FormComponent},
  { path: "list", component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [FormComponent, ListComponent];
