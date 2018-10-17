import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CustomerService } from './customer.service';
import { EmployeeService } from './employee.service';

import { Customer } from './customer';
import { Employee } from './employee';
import { Order } from './order';
import { Shipper } from './shipper';

@Component({
    selector: 'customer-orders',
    templateUrl: './customer-orders.component.html',
    // styleUrls: [ './hero-detail.component.css' ]
})
export class CustomerOrdersComponent implements OnInit
{
    @Input() customer: Customer;
    orders: Order[];
    shippers: Shipper[];
    employees: Employee[];
    employeeMap: Map<number, Employee>;
    isLoading: boolean = false;
    errorMessage: string;

    constructor(
        private _customerService: CustomerService,
        private _employeeService: EmployeeService,
        private _route: ActivatedRoute,
        private _location: Location
    ) { }

    getOrdersByCustomer(): void {
        this.isLoading = true;
        this._customerService.getOrdersByCustomer(this.customer.customerID)
            .subscribe(orders => {
                this.orders = orders;
                this.isLoading = false;
            },
            error => this.errorMessage = <any>error,
        )
    }

    getAllShippers(): void {
        this.isLoading = true;
        this._customerService.getAllShippers()
            .subscribe(shippers => {
                this.shippers = shippers;
                this.isLoading = false;
            },
            error => this.errorMessage = <any>error,
        )
    }

    getAllEmployees(): void {
        this.isLoading = true;
        this._employeeService.getAllEmployees()
            .then(employees => {
                this.employees = employees;
                this.populateEmployeeMap(employees);
                this.isLoading = false;
            },
            error => this.errorMessage = <any>error,
        )
    }

    private populateEmployeeMap(employees: Employee[]) {
        for (var emp of employees) {
            this.employeeMap.set(emp.employeeID, emp);
        }
    }

    getEmployee(id: number): Employee {
        for (var emp of this.employees) {
            if (emp.employeeID == emp.employeeID)
                return emp;
        }
    }

    ngOnInit(): void {
        this.getOrdersByCustomer();
    }

    toString(): string {
        var output: string = "";
        output = "Orders - Type: " + this.orders.constructor.name + "\n";
        for (let order of this.orders) {
            output += JSON.stringify(order) + "\n";
        }
        return output;
    }

    save(): void {
        //this._service.update(this.hero)
        //    .then(() => this.goBack());
    }

    goBack(): void {
        this._location.back();
    }
}