declare namespace INVOICES {
    type Address = {
        street_address: string;
        city: string;
        state: string;
        country: string;
        zip: number;
    }
    type Bill = {
        name: string;
        address: Address;
        gstin: string;
    }
    type Area = {
        length?: number;
        breadth?: number;
        unit: string;
        size: number;
        rate?: number;
    }
    type Invoice = {
        invoice_id: string;
        createdAt: string;
        billFrom: Bill;
        billTo: Bill;
        supplyAddress: Address;
        rentalArea: Area;
        amount: number;
        total_amount: number;
        sac: number;
        pan: string;
    }
}