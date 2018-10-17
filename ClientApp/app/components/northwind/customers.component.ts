import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Customer } from './customer'
import { CustomerListComponent } from './customer-list.component';

@Component({
    selector: 'customers',
    template: `
        <h1>Customers</h1>
        <div>
            <customer-list [customers]="customers"></customer-list>
        </div>
    `
})
export class CustomersComponent implements OnInit {

    customers: Customer[];

    constructor(private _http: Http) { }

    ngOnInit() {
    }
}