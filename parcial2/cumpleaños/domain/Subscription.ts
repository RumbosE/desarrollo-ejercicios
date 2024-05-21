export class Subscription {
    constructor(
        public id_ref: string,
        public renovationDate: Date,
        public state: string,
    ) {}

    getRenovationDate(): Date {
        return this.renovationDate;
    }

    getState(): string {
        return this.state;
    }

    getIdRef(): string {
        return this.id_ref;
    }
}