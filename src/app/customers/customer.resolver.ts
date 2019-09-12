import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';


@Injectable({
    providedIn: 'root'
})
export class CustomerResolver implements Resolve<Customer> {

    constructor(private service: CustomersService) {}

    resolve(route: ActivatedRouteSnapshot,
            state:RouterStateSnapshot
            ): Customer |Observable<Customer> | Promise<Customer> {
        //throw new Error("Method not implemented.");

        const id = +route.paramMap.get('id');

        return this.service.find(id);





        
    }
   

}