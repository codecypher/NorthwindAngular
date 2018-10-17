/**
 * employee-list.component.ts
 * This component displays a list of employee records.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/operator/catch';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'employee-list',
    templateUrl: './employee-list.component.html',

    // an array of style file names (with paths).
    //styleUrls: [ './customer-list.component.css', './styles.css' ],
    //styles: [ require('./customer-list.component.css'), require('./styles.css') ]
})
export class EmployeeListComponent implements OnInit
{
    title = 'Northwind Employees';
    employees: Employee[];
    isLoading: boolean = false;
    selectedEmployee: Employee;
    errorMessage: string;

    // dependency injection
    constructor(
        private _router: Router,
        private _service: EmployeeService
    ) { }

    getAllEmployees(): void {
        this.isLoading = true;
        this._service.getAllEmployees()
            .then(employees =>
            {
                this.employees = employees;
                this.isLoading = false;
            },
                error => this.errorMessage = <any>error
            )
        //this.employees.forEach(item => {
        //    item.hireDate = ...
        //}));
    }

    ngOnInit(): void {
        this.getAllEmployees();
    }

    isSelected(employee: Employee) {
        return employee.employeeID === this.selectedEmployee.employeeID;
    }

    onSelect(employee: Employee): void {
        this.selectedEmployee = employee;
        this.gotoDetail();
    }

    gotoDetail(): void {
        // Note that you're passing a two-element link parameters array 
        // — a path and the route parameter
        this._router.navigate(['/employee', this.selectedEmployee.employeeID]);
    }

    create(): void {
        this._router.navigate(['/create-employee']);
    }

    toString(): string {
        var output: string = "";
        output = "Employees - Type: " + this.employees.constructor.name + "\n";
        for (let emp of this.employees) {
            output += JSON.stringify(emp) + "\n";
        }
        return output;
    }
}
