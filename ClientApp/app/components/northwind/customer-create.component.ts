/**
 * customer-create.component.ts
 * This component is used to create a new customer record.
 */

import { Component, OnInit } from '@angular/core';

import { Router, Params } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { CustomerService } from './customer.service';

import { Customer } from './customer';

@Component({
    selector: 'customer-create',
    templateUrl: './customer-create.component.html',
})
export class CustomerCreateComponent implements OnInit
{
    customer: Customer;
    id: string;
    errorMessage: string;
    message: string;

    // dependency injection
    constructor(
        private _service: CustomerService,
        private _router: Router,
        private _location: Location
    ) { }

    ngOnInit(): void {
        this.customer = new Customer();
    }

    save(): void {
        this._service.create(this.customer)
            .subscribe(
                response => this.message = "Record created successfully.",
                error => this.errorMessage = <any>error
            )
        console.log(this.customer.toString());
    }

    //add(name: string): void {
    //    name = name.trim();
    //    if (!name) { return; }
    //    this._service.create(name)
    //        .then(hero => {
    //            this.customers.push(hero);
    //            this.selectedCustomer = null;
    //        });
    //}

    goBack(): void {
        //this._location.back();
        this._router.navigate(['/customers']);
    }
}