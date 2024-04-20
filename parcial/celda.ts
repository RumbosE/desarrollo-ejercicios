class Optionale<T> {
    private value: T | undefined;
    private assigned: boolean;

    constructor(value: T | undefined) {
        this.value = value;
        if (value === undefined || value === null) {
            this.assigned = false;
        } else {
            this.assigned = true;
        }
    }

    hasValue(): boolean {
        return this.assigned;
    }

    getValue(): T {
        if (this.assigned) {
            return <T>this.value;
        } else {
            console.log("Value not assigned");
            throw new Error("Value not assigned");
        }
    }
}

class Celda<T> {
    valor: T;
    constructor(v: T) {
        this.valor = v;
    }

    reducir(f: (_x: T, _y: T) => T, p: (e: T) => boolean): Optionale<T> {
        if (p(this.valor)) {
            return new Optionale<T>(this.valor);
        } else {
            return new Optionale<T>(undefined);
        }
    }
}

class Caja<T> extends Celda<T> {
    elementos: Celda<T>[];

    constructor(v: T, e: Celda<T>[]) {
        super(v);
        if (e.length < 2) {
            throw new Error("Caja debe tener al menos dos elementos de tipo Celda");
        }
        this.elementos = e;
    }

    reducir(f: (_x: T, _y: T) => T, p: (e: T) => boolean): Optionale<T> {
        let total: T | undefined ;

        if (p(this.valor)) {
            total = this.valor;
        }
        if (this.elementos) {
            this.elementos.forEach((e) => {
                let c = e.reducir(f, p);
                if (c.hasValue()) {
                    total !==undefined? total = f(total,c.getValue()) : total= c.getValue()
                }
            });
        }
        return new Optionale<T>(total);
    }
}

let celda = new Celda<string>("hola2");
let celda2 = new Celda<string>("hola3");
let celda3 = new Celda<string>("hola4");

let caja = new Caja<string>("h", [celda, celda2, celda3]);

function textLongitud(x: string): boolean {
    return x.length > 2;
}

function concat(x: string, y: string): string {
    return x + " " + y;
}

let resultado = caja.reducir(concat, textLongitud);
if (resultado.hasValue()) {
    console.log(resultado.getValue());
} else {
    console.log("No se cumple la condición");
}
