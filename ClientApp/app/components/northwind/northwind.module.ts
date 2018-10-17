import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NorthwindComponent } from './northwind.component';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerCreateComponent } from './customer-create.component';
//import { CustomerSearchComponent } from './customer-search.component';

import { CustomerOrdersComponent } from './customer-orders.component';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeCreateComponent } from './employee-create.component';

import { Helper } from '../../helper';
import { CustomerService } from './customer.service';
import { EmployeeService } from './employee.service';

import { NgxPaginationModule } from 'ngx-pagination'; 

import { NorthwindRoutingModule } from './northwind-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NorthwindRoutingModule,
        NgxPaginationModule
    ],
    declarations: [
        NorthwindComponent,
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerCreateComponent,
        CustomerOrdersComponent,
        //CustomerSearchComponent,
        EmployeeListComponent,
        EmployeeDetailComponent,
        EmployeeCreateComponent
    ],
    providers: [
        Helper,
        CustomerService,
        EmployeeService
    ]
})

export class NorthwindModule { }