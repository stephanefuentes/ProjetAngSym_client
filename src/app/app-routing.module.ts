import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { CustomersComponent } from './customers/customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { CustomerViewComponent } from './customers/customer-view/customer-view.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';



const routes: Routes = [
  { path: "customers", component: CustomersComponent},
  { path: "customers/new", component: CustomerFormComponent },
  { path: "customers/:id/edit", component: CustomerFormComponent },
  { path: "customers/:id", component: CustomerViewComponent },
  { path: "", redirectTo: "/customers", pathMatch: "full" },

  { path: "login", component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CustomersModule, AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
