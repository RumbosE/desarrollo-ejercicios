abstract class Casilla<F, V> {
  private vecinos: Map<F, Casilla<F,V>>;
  protected valor: V | null;
  
  constructor(){
    this.vecinos = new Map();
    this.valor = null;
  }

  addVecino(lado: F, vecino: Casilla<F,V>) : void{
    this.vecinos.set(lado, vecino);
  }  

  setValor(valor: V) : void {
    this.valor = valor;
  }
  
  getValor(): V {
    if(this.valor == null){
      throw new Error("No hay valor");
    }
    return this.valor;
  }
  
  addValor(valor: V){
    this.valor = valor;
    //iterar por los vecinos
    let contador = 1;
    let iguales: F[] = [];
    for (let key of this.vecinos.keys()) {
      let vecino = this.vecinos.get(key);
      if(vecino !== undefined && this.iguales(this.valor, vecino.getValor())){
        contador = contador + 1;
        iguales.push(key);
      }
    }
    //si el contador es mayor o igual a 3, eliminar y reducir
    console.log(contador);
    if(contador >= 3){
      for(let key of iguales){
        let vecino = this.vecinos.get(key);
        (vecino?.clear());
      }

      this.valor = this.unificar(this.valor);
    }
  }

  abstract iguales(valor1: V, valor2: V): boolean;
  abstract unificar(valor: V): V;
  abstract clear(): void;
}

//Aspectos claves: Enumerados, Arreglos y Map



//********************Caso de Casilla con números
//Tipo enumerado
enum Cuadrado {
  Arriba,
  Abajo,
  Derecha, 
  Izquierda
}

class CuadradoNumerico extends Casilla<Cuadrado, number> {
  iguales(valor1: number, valor2: number): boolean {
    return valor1 == valor2;
  }

  unificar(valor: number): number {
    if(this.valor == 2){
      return 4;
    }
    if(this.valor == 4){
      return 8;
    }
    return 0;
  }
  
  clear(): void {
    this.valor = 0;
  }
}

let vec1 : CuadradoNumerico  = new CuadradoNumerico();
vec1.setValor(4);

let vec2 : CuadradoNumerico  = new CuadradoNumerico();
vec2.setValor(4);

let cas1 : CuadradoNumerico  = new CuadradoNumerico();
cas1.addVecino(Cuadrado.Arriba, vec1);
cas1.addVecino(Cuadrado.Abajo, vec2);
cas1.addValor(4);
console.log(cas1);




//********** EJERCICIO 3

class Celda<T> {
  valor: T;

  constructor(valor: T) {
    this.valor = valor;
  }

  reducir(f: (e1: T, e2: T) => T): T {
    return this.valor;
  }
}

class Caja<T> extends Celda<T> {
  elementos: Celda<T>[];

  constructor(valor: T) {
    super(valor);
    this.elementos = [];
  }

  reducir(f: (e1: T, e2: T) => T): T {
    let r: T = this.elementos[0].reducir(f);
    for (let i = 1; i < this.elementos.length; i++) {
      let r1: T = this.elementos[i].reducir(f);
      r = f(r, r1);
    }
    let result: T = f(r, this.valor);
    return result;
  }
}


//Para el caso concreto de T = number

let celda1: Celda<number> = new Celda<number>(1);
let celda2: Celda<number> = new Celda<number>(2);
let celda3: Celda<number> = new Celda<number>(3);

let caja1: Caja<number> = new Caja<number>(5);
let caja2: Caja<number> = new Caja<number>(5);

caja2.elementos[0] = celda2;
caja2.elementos[1] = celda3;

caja1.elementos[0] = celda1;
caja1.elementos[1] = caja2;

console.log(caja1.reducir((a,b) => (a+b)));










