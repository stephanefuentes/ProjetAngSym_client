import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }


public findAll()
{
  return this.http.get("http://localhost:8000/customers").pipe(
    map(data => {

      const customers = data["hydra:member"] as Customer[];

      return customers;
    })

  );
}


}
