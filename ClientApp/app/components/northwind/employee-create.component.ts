/**
 * employee-create.component.ts
 * This component is used to create a new employee record.
 */

import { Component, OnInit } from '@angular/core';

import { Router, Params } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { EmployeeService } from './employee.service';

import { Employee } from './employee';

@Component({
    selector: 'employee-create',
    templateUrl: './employee-create.component.html',
})
export class EmployeeCreateComponent implements OnInit
{
    employee: Employee;
    id: string;
    errorMessage: string;
    message: string;

    // dependency injection
    constructor(
        private _service: EmployeeService,
        private _router: Router,
        private _location: Location
    ) { }

    ngOnInit(): void {
        this.employee = new Employee();
    }

    save(): void {
        this._service.create(this.employee)
            .then(
                response => this.message = "Record created successfully.",
                error => this.errorMessage = <any>error
            )
        console.log(this.employee.toString());
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
        this._router.navigate(['/employees']);
    }
}