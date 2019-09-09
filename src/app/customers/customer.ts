export interface Customer {

    id: number;
    firstName: string;
    lastName: string;
    email:string;
    invoices?: any[];
    user?: any;
}
