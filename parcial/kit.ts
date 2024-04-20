interface IElement{
    codigo: string;
    precio: number;
    calcularPrecio(): number;
}

class Elemento implements IElement{

    constructor(public codigo: string, public precio: number){}

    calcularPrecio(): number {
        return this.precio;
    }
}

class Kit implements IElement{
    private elements: IElement[] = [];
    public precio: number = 0;
    private strategy: IDescuentoStrategy | undefined = undefined;

    constructor(public codigo: string){}

    agregarElemento(element: IElement): void{
        this.elements.push(element);
    }

    aplicarDescuento(): void{
        if (this.strategy) {
            this.precio = this.strategy.apply(this.precio);
        }else{
            console.log("No se ha asignado un descuento");
        }
    }

    calcularPrecio(): number {
        this.elements.forEach(element => {
            this.precio +=  element.calcularPrecio();
        });
        return this.precio;
    }

    setStregy(strategy: IDescuentoStrategy): void{
        this.strategy = strategy;
    }
}

interface IDescuentoStrategy{
    apply(precio: number): number;
}

class DescuentoDiez implements IDescuentoStrategy{
    apply(precio: number): number {
        return precio - precio * 0.1;
    }
}

// usando el patrón de diseño Strategy y composicion, se puede agregar un descuento a un kit

let kit = new Kit("kit1");
let element1 = new Elemento("element1", 100.15);
let element2 = new Elemento("element2", 20.15);

kit.agregarElemento(element1);
kit.agregarElemento(element2);

let kit2 = new Kit("kit2");
let element3 = new Elemento("element3", 200.15);
kit2.agregarElemento(element3);
kit2.agregarElemento(kit);

kit2.setStregy(new DescuentoDiez());

console.log(`precio : ${kit2.calcularPrecio()} \n`);
kit2.aplicarDescuento();
console.log(`precio: ${kit2.precio} con descuento\n`);