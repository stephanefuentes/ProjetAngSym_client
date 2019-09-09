import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers',
  template: `
    <table class="table table-hover">
    <thead>
      <th>id</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>E mail</th>
      <th></th>
    </thead>
    <tbody>
      <tr *ngFor="let customer of customers">
        <td>{{ customer.id }}</td>
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.email }}</td> 
        <td></td>
      </tr>
    </tbody>
    </table>
  `,
  styles: []
})
export class CustomersComponent implements OnInit {


  customers: Customer[] = [];

  
  constructor(private service: CustomersService) { }

  ngOnInit() {
    this.service.findAll().subscribe(customersObs => this.customers = customersObs);

  }

}
