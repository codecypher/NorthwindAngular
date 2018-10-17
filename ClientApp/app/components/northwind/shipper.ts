export class Shipper
{
    shipperID: number;
    companyName: string;
    phone: string;

    toString(): string {
        return JSON.stringify(this);
    }
}