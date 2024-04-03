abstract class Componente {
    
    abstract calcular(): number;
}

class elemento extends Componente {
        
        private valor: number;
    
        constructor(valor: number) {
            super();
            this.valor = valor;
        }
    
        calcular(): number {
            return 1;
        }
}

class Compuesto extends Componente {
        
        private componentes: Componente[] = [];

        addComponente(componente: Componente) {
            this.componentes.push(componente);
        }

        calcular() : number {
            let count = 0;

            for (const c of this.componentes) {
                count += c.calcular();
            }

            return count;
        }
    }

    let compuesto = new Compuesto();
    compuesto.addComponente(new elemento(1));
    compuesto.addComponente(new elemento(2));
    compuesto.addComponente(new elemento(3));
    console.log(compuesto.calcular()); // 3
