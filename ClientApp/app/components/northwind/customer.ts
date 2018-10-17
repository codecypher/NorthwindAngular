export class Customer
{
    customerID: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;

    toString(): string {
        return JSON.stringify(this);
    }
}