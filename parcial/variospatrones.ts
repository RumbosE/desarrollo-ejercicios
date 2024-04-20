interface ISubject{

    subscribers: ISubscriber [];

    addSubscriber(s: ISubscriber): void;

    removeSubscriber(s: ISubscriber): void;

    notify(): void;
}

interface ISubscriber{
    update(c:string): void;
}

abstract class CompoDecorador implements ISubject, ISubscriber{

    subscribers: ISubscriber[] = [];
    

    constructor(public state: string){
        this.subscribers = [];
    }

    addSubscriber(s:ISubscriber){
        this.subscribers.push(s);
    }

    removeSubscriber(s: ISubscriber) {
        let index = this.subscribers.indexOf(s);
        if(index != -1) this.subscribers.splice(index,1)
    }

    notify(){
        this.subscribers.forEach(s => s.update(this.state))
    }

    update(c: string){
        this.state = `Updated for:${c} ${this.state}` ;
    };
    

    abstract operation(): string;
}

class ConcreteComponent extends CompoDecorador{
    constructor(state: string){
        super(state);
    }

    operation(): string{
        return this.state;
    }
}

class ComposeComponent extends CompoDecorador{

    hijos: CompoDecorador[] = [];

    constructor(state: string){
        super(state);
    }

    addComponent(c: CompoDecorador){
        this.hijos.push(c);
    }

    removeComponent(c: CompoDecorador){
        let index = this.hijos.indexOf(c);
        if(index != -1) this.hijos.splice(index,1)
    }

    operation(): string{
        return `Padre: ${this.state} - Hijos:${this.hijos.map(c => c.operation()).join(" ")}`;
    }
}

abstract class BaseDecorator extends CompoDecorador{

    constructor(c: CompoDecorador){
        super(c.state);
    }

    operation(): string{
        return this.state;
    }
}

class ConcreteDecoratorA extends BaseDecorator{
    
        operation(): string{
            return `ConcreteDecoratorA: (${super.operation()})`;
        }
}

class ConcreteDecoratorB extends BaseDecorator{

    operation(): string{
        return `ConcreteDecoratorB: (${super.operation()})`;
    }
}

let component = new ConcreteComponent("Simple");
let decorator1 = new ConcreteDecoratorA(component);

let component2 = new ConcreteComponent("Simple2");
let decorator2 = new ConcreteDecoratorB(component2);

let compose = new ComposeComponent("Compose");
compose.addComponent(decorator1);
compose.addComponent(decorator2);

console.log(compose.operation());

decorator2.addSubscriber(decorator1);
decorator2.notify();

console.log('Updated:');
console.log(compose.operation());

compose.addSubscriber(decorator2);
compose.addSubscriber(decorator1);
compose.notify();
console.log('Updated:');
console.log(compose.operation());