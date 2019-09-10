import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { CustomersComponent } from './customers/customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerViewComponent } from './customers/customer-view/customer-view.component';



const routes: Routes = [
  { path: "customers", component: CustomersComponent},
  { path: "customers/new", component: CustomerFormComponent },
  { path: "customers/:id/edit", component: CustomerFormComponent },
  { path: "customers/:id", component: CustomerViewComponent },
  { path: "", redirectTo: "/customers", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
