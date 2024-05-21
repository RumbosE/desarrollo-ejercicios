import { User } from "../../domain/User";
import { IService } from "../models/IService";

export class NotifyUserBirthDayService {
    constructor(private activeMethods: IService<User,User,Error>[]) { }
    
    addMethod(method: IService<User,User,Error>): void {
        this.activeMethods.push(method);
    }

    removeMethod(method: IService<User,User,Error>): void {
        this.activeMethods = this.activeMethods.filter(m => m !== method);
    }

    notify(user: User): void {
        this.activeMethods.forEach(method => {
            method.execute(user);
        });
    }
}