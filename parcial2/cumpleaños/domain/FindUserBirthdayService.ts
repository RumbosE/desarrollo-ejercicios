import { User } from "./User";

export class FindUserBirthdayService {
    
    users: User[] = [];

    constructor( ) {}

    addUser(user: User): void {
        this.users.push(user);
    }

    removeUser(user: User): void {
        this.users = this.users.filter(u => u.getUsername() !== user.getUsername());
    }

    findBirthdayUsers(): User[] {
        const today = new Date();
        return this.users.filter(u => {
            const birthdate = new Date(u.getBirthdate());
            return birthdate.getDate() === today.getDate() && birthdate.getMonth() === today.getMonth();
        });
    }

}