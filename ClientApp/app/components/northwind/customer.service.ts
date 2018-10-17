/**
 * customer.service.ts
 * This is the service for getting Customer data.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

import { Helper } from '../../helper';
import { Logger } from '../../logger.service';

import { Customer } from './customer';
import { Order } from './order';
import { Shipper } from './shipper';

// Using Observable
@Injectable()
export class CustomerService
{
    private _customerUrl = 'api/customer';  // URL to web api
    private _headers;

    // dependency injection
    constructor(
        private _http: Http,
        private _helper: Helper,
        private _logger: Logger
    ) 
    { 
        this._headers = new Headers();
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Accept', 'application/json');
    }

    // Get all customer records
    getAllCustomers(): Observable<Customer[]> {
        return this._http.get(this._customerUrl)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    getAllCustomersSlowly(): Promise<Customer[]> {
        return new Promise(resolve => {
            // Simulate server latency with 3 second delay
            setTimeout(() => resolve(this.getAllCustomers()), 3000);
        });
    }

    // Get customer record with given id
    getCustomer(id: string): Observable<Customer> {
        const url = `${this._customerUrl}/${id}`;
        return this._http.get(url)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    // Get orders for given customer
    getOrdersByCustomer(customerid: string): Observable<Order[]> {
        const url = `${this._customerUrl}/${customerid}/GetOrdersByCustomer`;
        return this._http.get(url)
            .map(this.extractOrders)
            .catch(this._helper.handleError);
    }

    // Extract JSON data from Response
    private extractOrders(resp: Response): Order[] {
        let data: Order[] = resp.json();
        // strip time from dates
        data.forEach(item => {
            item.orderDate = item.orderDate.replace(/T\d{2}:\d{2}:\d{2}/, "");
            item.requiredDate = item.requiredDate.replace(/T\d{2}:\d{2}:\d{2}/, "");
            item.shippedDate = item.shippedDate.replace(/T\d{2}:\d{2}:\d{2}/, "");
        });
        return data;
    }

    // Get all shippers
    getAllShippers(): Observable<Shipper[]> {
        const url = `${this._customerUrl}/GetAllShippers`;
        return this._http.get(url)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    create(customer: Customer): Observable<Customer> {
        let options = new RequestOptions({ headers: this._headers });
        let body = JSON.stringify(customer);

        return this._http.post(this._customerUrl, body, options)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    update(customer: Customer): Observable<Customer> {
        let options = new RequestOptions({ headers: this._headers });
        let body = JSON.stringify(customer);

        const url = `${this._customerUrl}/${customer.customerID}`;
        return this._http.put(url, body, options)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    delete(id: string): Observable<void> {
        let options = new RequestOptions({ headers: this._headers });

        const url = `${this._customerUrl}/${id}`;
        return this._http.delete(url, options)
            .map(this._helper.extractData)
            .catch(this._helper.handleError);
    }

/*
    // Using Promise

    // Get all customer records
    getAllCustomers(): Promise<Customer[]> {
        return this._http.get(this._customerUrl)
            .toPromise()
            .then(this._helper.extractData)
            //.then(contacts => Array.from(contacts, c => new Contact(c)))
            .catch(this._helper.handleError);
    }

    // Get customer record with given id
    getCustomer(id: string): Promise<Customer> {
        const url = `${this._customerUrl}/${id}`;
        return this._http.get(url)
            .toPromise()
            //.then(response => response.json() as Customer)
            .then(this._helper.extractData)
            .catch(this._helper.handleError);
    }

    // Get orders for given customer
    getOrdersByCustomer(customerid: string): Promise<Order[]> {
        const url = `${this._customerUrl}/${customerid}/GetOrdersByCustomer`;
        return this._http.get(url)
            .toPromise()
            .then(resp => {
                let orders: Order[] = this.extractOrders(resp);
                return orders;
            })
            .catch(this._helper.handleError);
    }

    create(customer: Customer): Promise<Customer> {
        let options = new RequestOptions({ headers: this._headers });
        let body = JSON.stringify(customer);

        return this._http.post(this._customerUrl, body, options)
            .toPromise()
            .then(() => customer)
            .catch(this._helper.handleError);
    }
*/
}