
enum SubsState {
    Active,
    Hold,
    Suspended,
}

class Subscription {
    id_ref: string;
    renovation: Date;
    state: SubsState;

    // getIdRef(): string{
    //     return this.id_ref;
    // }

    // getRenovation(): Date{
    //     return this.renovation;
    // }

    // getState(): SubsState{
    //     return this.state;
    // }
}

class User {
    username: string;
    subscription: Subscription;
    birthdate: Date;
    email: string;

    // getUsername(): string{
    //     return this.username;
    // }

    // getSubscriptionState(): SubsState{
    //     return this.subscription.getState();
    // }

    // getSubscriptionRenovation(): Date{
    //     return this.subscription.getRenovation();
    // }

    // getIDRef(): string{
    //     return this.subscription.getIdRef();
    // }

    // getBirthdate(): Date{
    //     return this.birthdate;
    // }

    // getEmail(): string{
    //     return this.email;
    // }
}

interface IUsersRepository {
    findBirthdayUsers(date: Date): User[];
}

class UsersRepository implements IUsersRepository {
    constructor() { }

    findBirthdayUsers(date: Date): User[] {
        return [
            {
                username: "user1",
                subscription: {
                    id_ref: "123",
                    renovation: new Date("2021-10-10"),
                    state: SubsState.Active,
                },
                birthdate: new Date("2002-10-10"),
                email: "hola@gmail.com",
            },
        ];
    }
}

class BirthdayService {
    constructor(private repository: IUsersRepository) { }

    FindUsersBirthday(): User[] {
        return this.repository.findBirthdayUsers(new Date());
    }
}

class Either<TLeft, TRight> {
    private readonly value: TLeft | TRight;
    private readonly left: boolean;

    private constructor(value: TLeft | TRight, left: boolean) {
        this.value = value;
        this.left = left;
    }

    isLeft(): boolean {
        return this.left;
    }

    getLeft(): TLeft {
        if (!this.isLeft()) throw new Error();
        return <TLeft>this.value;
    }

    isRight(): boolean {
        return !this.left;
    }

    getRight(): TRight {
        if (!this.isRight()) throw new Error();
        return <TRight>this.value;
    }

    static makeLeft<TLeft, TRight>(value: TLeft) {
        return new Either<TLeft, TRight>(value, true);
    }

    static makeRight<TLeft, TRight>(value: TRight) {
        return new Either<TLeft, TRight>(value, false);
    }
}

class Resulte<T> {
    private value: T;
    private _error: Error;
    private _isError: boolean;

    private constructor(isError: boolean,
        value?: T, _error?: Error) {
        this.value = value!;
        this._error = _error!;
        this._isError = isError;
    }

    public isError(): boolean {
        return this._isError;
    }

    getValue(): T {
        if (this.isError()) throw new Error();
        return this.value;
    }

    getError(): Error {
        if (!this.isError()) throw new Error();
        return this._error;
    }

    static makeResult<T>(value: T) {
        return new Resulte<T>(false, value);
    }

    static makeError<T>(error: Error) {
        return new Resulte<T>(true, undefined, error);
    }
}

interface IService<D,R,E> {
    execute(data: D): Either<D,E>|R;
}

interface ISender<T> {
    send(data: T): Resulte<T>;
}

class PushNotificationSender implements ISender<User> {

    send(data: User): Resulte<User> {
        console.log(`Sending push notification to ${data.username}`);
        return Resulte.makeResult(data);
    }
}

class CurrenUserService implements IService<User, void,Error> {

    constructor(private sender: ISender<User>) {}

    execute(data: User): Either<User, Error> | void {
        if (this.checkSubscription(data)) {
            let result = this.sender.send(data);
            if (result.isError()) {
                return Either.makeRight(result.getError());
            }
            return Either.makeLeft(data);
        }
    }

    checkSubscription(user: User): boolean {
        if (user.subscription.state === SubsState.Active) {
            return true;
        }
        return false;
    }

}

class EmailSender implements ISender<User> {
        send(data: User): Resulte<User> {
            if(data.email === undefined) return Resulte.makeError(new Error('Email is not defined'));
            console.log(`Sending email to ${data.email}`);
            return Resulte.makeResult(data);
        }
    
}

class OneMonthExpiratedService implements IService<User, void, Error> {
    constructor(private sender: ISender<User>) { }

    execute(data: User): Either<User, Error> | void {
        if (this.checkSubscription(data)) {
            let result = this.sender.send(data);
            if (result.isError()) {
                return Either.makeRight(result.getError());
            }
            return Either.makeLeft(data);
        }
    }

    checkSubscription(user: User): boolean {
        let today = new Date();
        let renovation = user.subscription.renovation;
        let diff = today.getTime() - renovation.getTime();
        let diffDays = diff / (1000 * 3600 * 24);
        if (diffDays >= 30 || user.subscription.state === SubsState.Hold) {
            return true;
        }
        return false;
    }

}

class ExpiredSubscriptionService implements IService<User, void, Error> {
    constructor(private sender: ISender<User>) { }

    execute(data: User): Either<User, Error> | void {
        if (this.checkSubscription(data)) {
            let result = this.sender.send(data);
            if (result.isError()) {
                return Either.makeRight(result.getError());
            }
            return Either.makeLeft(data);
        }
    }

    checkSubscription(user: User): boolean {
        let today = new Date();
        let renovation = user.subscription.renovation;
        if (user.subscription.state === SubsState.Suspended || today.getTime() > renovation.getTime()){
            return true;
        }
        return false;
    }


}

class CongratsUserService {
    private notifiers: IService<User,void,Error>[]
    constructor(private service: BirthdayService) {
        this.notifiers = [
            new CurrenUserService(new PushNotificationSender()),
            new OneMonthExpiratedService(new EmailSender()),
            new ExpiredSubscriptionService(new EmailSender())
        ]
    }

    CongratsUsers(): void {
        const users = this.service.FindUsersBirthday();
        users.forEach((user) => {
            for(let n of this.notifiers){
                n.execute(user);
            }
        });
    }
}
