/**
 * employee.service.ts
 * This is the service for getting Employee data.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

import { Employee } from './employee';
import { Helper } from '../../helper';
import { Logger } from '../../logger.service';

// Using Promise
@Injectable()
export class EmployeeService
{
    private _employeeUrl = 'api/employee';  // URL to web api
    private _headers;
    private _employees: Employee[];
    private _errorMessage: string;

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
    
    getAllEmployees(): Promise<Employee[]> {
        return this._http.get(this._employeeUrl)
            .toPromise()
            .then((response) => {
                let data: Employee[] = this.extractAllEmployees(response);
                return data;
            }, error => this._errorMessage = <any>error)
            //.then(this._helper.extractData)
            //.then(contacts => Array.from(contacts, c => new Contact(c)))
            .catch(this._helper.handleError);
    }

    // Extract JSON data from Response
    private extractAllEmployees(resp: Response): Employee[] {
        let data: Employee[] = resp.json();
        // strip time from dates
        data.forEach(item => {
            if (item.birthDate != null)
                item.birthDate = item.birthDate.replace(/T\d{2}:\d{2}:\d{2}/g, "");
            if (item.hireDate != null)
            item.hireDate = item.hireDate.replace(/T\d{2}:\d{2}:\d{2}/g, "");
        });
        //return data || {};
        return data;
    }

    getEmployee(id: number): Promise<Employee> {
        const url = `${this._employeeUrl}/${id}`;
        return this._http.get(url)
            .toPromise()
            //.then(response => response.json() as Customer)
            .then(resp => {
                let emp: Employee = resp.json();
                emp = this.stripTime(emp);
                return emp;
            })
            .catch(this._helper.handleError);
    }

    private stripTime(emp: Employee): Employee {
        if (emp.birthDate != null)
            emp.birthDate = emp.birthDate.replace(/T\d{2}:\d{2}:\d{2}/g, "");
        if (emp.hireDate != null)
            emp.hireDate = emp.hireDate.replace(/T\d{2}:\d{2}:\d{2}/g, "");
        //emp.hireDate =
        //    new Date(emp.hireDate.toString().replace(/T\d{2}:\d{2}:\d{2}/g, ""));
        return emp;
    }

    create(employee: Employee): Promise<Employee> {
        let options = new RequestOptions({ headers: this._headers });
        let body = JSON.stringify(employee);

        return this._http.post(this._employeeUrl, body, options)
            .toPromise()
            .then(() => employee)
            .catch(this._helper.handleError);
    }

    update(employee: Employee): Promise<Employee> {
        let options = new RequestOptions({ headers: this._headers });
        let body = JSON.stringify(employee);

        const url = `${this._employeeUrl}/${employee.employeeID}`;
        return this._http.put(url, body, options)
            .toPromise()
            .then(() => employee)
            .catch(this._helper.handleError);
    }

    delete(id: number): Promise<void> {
        let options = new RequestOptions({ headers: this._headers });

        const url = `${this._employeeUrl}/${id}`;
        return this._http.delete(url, options)
            .toPromise()
            .then(() => null)
            .catch(this._helper.handleError);
    }
}