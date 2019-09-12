import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  template: `
  <div class="alert alert-secondary">
   <h2 style="color:green;">Liste des customers </h2> 
  </div>

  <a routerLink="/customer/new" class="btn btn-success"> Nouveau Customer</a>
    <table class="table table-hover">
    <thead>
      <th>id</th>
      <th>Nom complet</th>
      <th>E mail</th>
      <th>Factures ( nbr ) </th>
       <th></th>
    </thead>
    
    <tbody>
      <tr *ngFor="let customer of customers">
        <td>{{ customer.id }}</td>
        <td> <a routerLink="/customers/{{ customer.id }}">
                {{ customer.firstName }} {{ customer.lastName }}
            </a>
        </td>
        <td>{{ customer.email }}</td> 
        <td><a class="badge badge-success">{{ customer.invoices.length }}</a></td>
        <td><a class="btn btn-danger">Supprimer</a></td>
      </tr>
    </tbody>
    </table>
  `,
  styles: []
})
export class CustomersComponent implements OnInit {


  customers: Customer[] = [];

  
  constructor(private service: CustomersService, private route: ActivatedRoute) { }

  ngOnInit() {
    // sans le Resolver
        //this.service.findAll().subscribe(customersObs => this.customers = customersObs);

        //  Avec le reolver
        this.customers = this.route.snapshot.data.apiCustomers;

  }

}
