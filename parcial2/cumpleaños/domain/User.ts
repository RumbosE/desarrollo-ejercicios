import { Subscription } from "./Subscription";

export class User {
    constructor(
        public username: string,
        private birthdate: string,
        private email: string,
        public subscription: Subscription,
    ) {}

    getUsername(): string {
        return this.username;
    }

    getBirthdate(): string {
        return this.birthdate;
    }

    getEmail(): string {
        return this.email;
    }

    getIdRef(): string {
        return this.subscription.getIdRef();
    }

    getRenovationDate(): Date {
        return this.subscription.getRenovationDate();
    }

    getState(): string {
        return this.subscription.getState();
    }
}