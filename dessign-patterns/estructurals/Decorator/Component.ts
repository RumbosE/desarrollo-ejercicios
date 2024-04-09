interface Component{
    operation(): string;
}

class ConcretComponent implements Component{
    operation(): string {
        return 'ConcreteComponent';
    }
}

class Decorator implements Component{

    constructor(protected component: Component){
        this.component = component;
    }

    operation():string{
        return this.component.operation();
    }
}

class ComponentDecoratorA extends Decorator{
    
    public operation(): string{
        return `Componente decorador A(${super.operation()})`;
    }
}

const component = new ConcretComponent();
const decorator = new ComponentDecoratorA(component);

console.log(`hola`);
console.log(decorator.operation());