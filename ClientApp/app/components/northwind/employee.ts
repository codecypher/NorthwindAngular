export class Employee
{
    employeeID: number;
    firstName: string;
    lastName: string;
    title: string;
    birthDate: string;
    hireDate: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    homePhone: string;
    extension: string;
    notes: string;
    reportsTo: number;

    get fullName(): string
    {
        return this.firstName + " " + this.lastName;
    }

    toString(): string
    {
        return JSON.stringify(this);
    }
}