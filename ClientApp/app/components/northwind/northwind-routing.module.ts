import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NorthwindComponent } from './northwind.component';

import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerCreateComponent } from './customer-create.component';

import { EmployeeListComponent } from './employee-list.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeCreateComponent } from './employee-create.component';

const routes: Routes = [
    { path: 'customers', component: CustomerListComponent },
    { path: 'customer/:id', component: CustomerDetailComponent },
    { path: 'create-customer', component: CustomerCreateComponent },

   { path: 'employees', component: EmployeeListComponent },
   { path: 'employee/:id', component: EmployeeDetailComponent },
   { path: 'create-employee', component: EmployeeCreateComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class NorthwindRoutingModule { }
