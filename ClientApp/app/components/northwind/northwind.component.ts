//
// Northwind and Angular2
//

import { Component, OnInit } from '@angular/core';

import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
    selector: 'northwind',
    templateUrl: './northwind.component.html',
    styleUrls: ['./northwind.component.css']
})

export class NorthwindComponent implements OnInit
{
    customers: Customer[] = [];

    constructor(private customerService: CustomerService) { }

    ngOnInit(): void {
        //this.customerService.getCustomers()
        //    .then(customers => this.customers = customers.slice(1, 5));
    }
}