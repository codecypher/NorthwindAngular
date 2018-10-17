/**
 * customer-detail.component.ts
 * This component displays a customer record.
 */

import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { CustomerService } from './customer.service';

import { Customer } from './customer';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent implements OnInit
{
    id: string;
    customer: Customer;
    isLoading: boolean = false;
    errorMessage: string;
    message: string;

    // dependency injection
    constructor(
        private _service: CustomerService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location
    ) { }

    getCustomer(): void {
        //this.customerService.getCustomer(id)
        //    .subscribe(
        //        customer => this.customer = customer,
        //        error => this.errorMessage = <any>error
        //    );
        // Route parameters are always strings.        
        this._route.params
            .switchMap((params: Params) => this._service.getCustomer(params['id']))
            .subscribe(customer => {
                this.customer = customer;
                this.isLoading = false;
            }, error => this.errorMessage = <any>error);
    }

    ngOnInit(): void {
        this.getCustomer();
    }

    save(): void {
        this._service.update(this.customer)
            .subscribe(() => this.message = "Record updated successfully.");
    }

    delete(): void {
        this._service.delete(this.customer.customerID)
            .subscribe(() => this.goBack());
    }

    get printCustomer() { return JSON.stringify(this.customer); }
    
    goBack(): void {
        //this._location.back();
        this._router.navigate(['/customers']);
    }
}