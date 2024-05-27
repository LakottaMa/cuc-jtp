export class Colors {
    id?: string;
    name: string;
    charge: number;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.charge = obj ? obj.charge : '';
    }

    public toJSON() {
        return {
            name: this.name,
            charge: this.charge
        };
    }
}