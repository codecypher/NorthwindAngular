import { Shipper } from './shipper';
import { Employee } from './employee';

export class Order
{
    orderID: number;
    CustomerID: string;
    EmployeeID: number;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    shipVia: string;
    freight: number;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;

    shipper: Shipper;
    employee: Employee;

    toString(): string {
        return JSON.stringify(this);
    }
}
