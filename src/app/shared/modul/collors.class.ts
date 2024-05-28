import { Timestamp } from "@angular/fire/firestore";

export class Colors {
    id?: string;
    name: string;
    charge: string;
    date: Date;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.charge = obj ? obj.charge : '';
        this.date = obj ? obj.date: '';
    }

    public toJSON() {
        return {
            name: this.name,
            charge: this.charge,
            date: this.date instanceof Date ? Timestamp.fromDate(this.date) : this.date
        };
    }
}