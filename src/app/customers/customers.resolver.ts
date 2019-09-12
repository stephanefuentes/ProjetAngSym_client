import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from './customer';
import { Observable } from 'rxjs';
import { CustomersService } from './customers.service';


@Injectable({
    providedIn: 'root'
})
export class CustomersResolver implements Resolve<Customer[]>
{

    constructor(private service: CustomersService) {}



    resolve(
        route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot
         ): Customer[] | Observable<Customer[]> | Promise<Customer[]> {
        //throw new Error("Method not implemented.");

        return this.service.findAll();
    }
    
}