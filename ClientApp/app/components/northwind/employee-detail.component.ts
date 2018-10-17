/**
 * employee-detail.component.ts
 * This component displays a employee record.
 */

import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { EmployeeService } from './employee.service';

import { Employee } from './employee';

@Component({
    selector: 'employee-detail',
    templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent implements OnInit, AfterViewInit {
    id: string;
    employee: Employee;
    employeeList: Employee[];
    isLoading: boolean = false;
    errorMessage: string;
    message: string;

    // dependency injection
    constructor(
        private _service: EmployeeService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _location: Location
    ) { }

    getEmployee(): void {
        //this.customerService.getCustomer(id)
        //    .subscribe(
        //        customer => this.customer = customer,
        //        error => this.errorMessage = <any>error
        //    );
        this.isLoading = true;
        // Route parameters are always strings.        
        this._route.params
            .switchMap((params: Params) => this._service.getEmployee(+params['id']))
            .subscribe((emp: Employee) => {
                this.employee = emp;
                this.isLoading = false;
            }, error => this.errorMessage = <any>error
            );
    }

    getAllEmployees(): void {
        this.isLoading = true;
        this._service.getAllEmployees()
            .then((employees) => {
                this.employeeList = employees;
                this.isLoading = false;
                this.toString();
            }, error => this.errorMessage = <any>error
            );
        //employeeList.forEach(item => {
        //    item.hireDate = ...
        //}));
    }

    ngOnInit(): void {
        this.getEmployee();
        this.getAllEmployees();
        //console.log("ngOnInit: " + $('body'));
    }

    ngAfterViewInit(): void {
    }

    save(): void {
        this._service.update(this.employee)
            .then(() => this.message = "Record updated successfully.");
    }

    delete(): void {
        this._service.delete(this.employee.employeeID)
            .then(() => this.goBack());
    }

    goBack(): void {
        //this._location.back();
        this._router.navigate(['/employees']);
    }

    toString(): string {
        var output: string = "";
        output = "Employees - Type: " + this.employeeList.constructor.name + "\n";
        for (let emp of this.employeeList) {
            output += JSON.stringify(emp) + "\n";
        }
        return output;
    }
}