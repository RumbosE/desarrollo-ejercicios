abstract class State {
    protected phone: Phone;

    constructor(phone: Phone) {
        this.phone = phone;
    }

    abstract onhome():string;
    abstract onOffOn():string;
}

class Phone {
    private state: State;

    constructor() {
        this.state = new OffState(this);
    }

    setState(state: State) {
        this.state = state;
    }

    lock():string {
        return "Phone is locked";
    }

    home():string {
        return "Phone is at home-screen";
    }

    unlock():string {
        return "Phone is unlocked";
    }

    turnOn():string {
        return "Phone is turned on";
    }
}

class OffState extends State {

    constructor(phone: Phone) {
        super(phone);
    }

    onhome():string {
        return this.phone.home();
    }

    onOffOn():string {
        this.phone.setState(new PhoneReadyState(this.phone));
        return this.phone.turnOn();
    }
}

class PhoneReadyState extends State {
    constructor(phone: Phone) {
        super(phone);
    }

    onhome():string {
        return this.phone.home();
    }

    onOffOn():string {
        this.phone.setState(new OffState(this.phone));
        return this.phone.lock();
    }
}

class LockedState extends State {
    constructor(phone: Phone) {
        super(phone);
    }

    onhome():string {
        return this.phone.home();
    }

    onOffOn():string {
        this.phone.setState(new OffState(this.phone));
        return this.phone.lock();
    }
}

// Usage
const phone = new Phone();
console.log(phone.turnOn());
console.log(phone.lock());