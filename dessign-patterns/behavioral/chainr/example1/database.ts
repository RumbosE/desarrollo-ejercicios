class Database {
    private readonly users: Map<string, string> = new Map<string, string>();

    public constructor() {
        this.users.set('admin_username', 'admin_password');
        this.users.set('user_username', 'user_password');
    }

    isValidUser(username: string): boolean {
        return this.users.has(username);
    }

    isValidPassword(username: string, password: string): boolean {
        return this.users.get(username) === password;
    }
}


interface IHandler {
    handle(username: string, password: string): boolean;
    setNextHandler(next: Handler): IHandler;
}

abstract class Handler implements IHandler{
    private next: IHandler;

    setNextHandler(next: Handler): IHandler {
        this.next = next;
        return next;
    }

    protected handleNext(username: string, password: string): boolean {
        if (this.next) {
            return this.next.handle(username, password);
        }
        console.log('No more handlers');
        console.log('You have passed all the handlers');
        console.log(' ');

        return true;    // No more handlers
    }

    abstract handle(username: string, password: string): boolean;
}

class UserExistHandler extends Handler {
    constructor(private readonly database: Database) {
        super();
        this.database = database;
    }

    handle(username: string, password: string): boolean {
        if (!this.database.isValidUser(username)) {
            console.log('User does not exist');
            console.log('UserExistHandler');
            return false;
        }
        console.log('User is valid');
        console.log(' ');
        return this.handleNext(username, password);
    }
}

class RoleCheckHandler extends Handler {

    handle(username: string, password: string): boolean {
        console.log(' ');
        if (username === 'admin_username') {
            console.log('RoleCheckHandler');
            console.log('Showing Admin page - Admin user');
            return true;
        }
        console.log('RoleCheckHandler loading default page - User');
        return this.handleNext(username, password);
    }
}

class ValidPasswordHandler extends Handler {
    constructor(private readonly database: Database) {
        super();
        this.database = database;
    }

    handle(username: string, password: string): boolean {
        if (!this.database.isValidPassword(username, password)) {
            console.log('Password is incorrect');
            console.log('PasswordCheckHandler');
            return false;
        }
        console.log('Password is correct');
        console.log(' ');
        return this.handleNext(username, password);
    }
}

class AuthService{
    private handler: Handler;

    constructor() {
        this.handler = new UserExistHandler(new Database());
        this.handler.setNextHandler(new ValidPasswordHandler(new Database()))
            .setNextHandler(new RoleCheckHandler());
    }

    login(username: string, password: string): boolean {
        if (this.handler.handle(username, password)) {
            console.log('User is logged in');
            return true;
        }
        console.log(' ');
        console.log('User is not logged in');
        return false;
    }
}

//uso del patron chain of responsability

const authService = new AuthService();
authService.login('user_username', 'user_passwor');
