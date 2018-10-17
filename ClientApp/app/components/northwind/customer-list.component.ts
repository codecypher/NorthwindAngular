/**
 * customer-list.component.ts
 * This component displays a list of customer records.
 *
 * Angular 2 server side paging using ng2-pagination
 * http://www.developerhandbook.com/web-api/angular-2-server-side-paging-using-ng2-pagination/
 *
 * Angular Paging
 * https://github.com/brantwills/Angular-Paging
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { NgxPaginationModule } from 'ngx-pagination';

export interface PagedResponse<T> {
    total: number;
    data: T[];
}

import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    // an array of style file names (with paths).
    styleUrls: [ './customer-list.component.css' ],
    //styles: [ require('./customer-list.component.css'), require('./styles.css') ]
})
export class CustomerListComponent implements OnInit
{
    title = 'Northwind Customers';
    customers: Customer[];
    isLoading: boolean = false;
    selectedCustomer: Customer;
    errorMessage: string;

    private _customerUrl = 'api/customer';  // URL to web api

    data: Observable<Customer[]>
    page: number = 1;
    pageSize: number = 10;
    total: number;

    //customer: Customer = {
    //    customerID: "AABBCC",
    //    companyName: 'Windstorm'
    //};

    // dependency injection
    constructor(
        private _router: Router,
        private _http: Http,
        private _service: CustomerService
    ) { }

    getAllCustomers(): void {
        this.isLoading = true;
        this._service.getAllCustomers()
            .subscribe(
                customers => this.customers = customers,
                error => this.errorMessage = <any>error
            );
        //this._service.getAllCustomers()
        //    .then( customers =>
        //    {
        //        this.customers = customers;
        //        this.isLoading = false;
        //    },
        //        error => this.errorMessage = <any>error,
        //    )
    }

    getCustomersSlowly(): void {
        //this.customerService.getCustomersSlowly().then(customers => this.customers = customers);
    }

    getPage(page: number, pageSize: number = 10) {
        const url = `${this._customerUrl}/GetData/${page}/${pageSize}`;
        this.data = this._http.get(url)
            .do((res: any) => {
                this.total = res.json().total;
                this.page = page;
            })
            .catch(error => this.errorMessage = error)
            .map((res: any) => res.json().data);

    }

    ngOnInit(): void {
        // When the page loads and is initialised, 
        // we want to grab the first page of data. 
        this.getPage(1);
        //this.getAllCustomers();
        //this.toString();
        //this.getCustomersSlowly();
    }

    isSelected(customer: Customer) {
        return customer.customerID === this.selectedCustomer.customerID;
    }

    onSelect(customer: Customer): void {
        this.selectedCustomer = customer;
        this.gotoDetail();
    }

    gotoDetail(): void {
        // Note that you're passing a two-element link parameters array 
        // — a path and the route parameter
        this._router.navigate(['/customer', this.selectedCustomer.customerID]);
    }

    create(): void {
        this._router.navigate(['/create-customer']);
    }

    toString(): string {
        var output: string = "";
        output = "Customers - Type: " + this.customers.constructor.name + "\n";
        for (let cust of this.customers) {
            output += JSON.stringify(cust) + "\n";
        }
        return output;
    }
}
