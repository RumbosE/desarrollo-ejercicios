class Optional<T>{
    private value: T | undefined;
    private assigned: boolean;

    constructor(value: T | undefined) {
        this.value = value;
        if(value === undefined){
            this.assigned = false;
        } else {
            this.assigned = true;
        }
    }

    hasValue(): boolean {
        return this.assigned;
    }

    getValue(): T {
        if(this.assigned){
            return<T> this.value;
        } else {
            console.log('Value not assigned');
            throw new Error('Value not assigned');
        }
    }
}

// usar Optional para el valor de un elemento

let valor = [, 2, 3, 4, 5];
let optional = new Optional<number>(valor[0]);
try {
    console.log(optional.getValue());
}
catch (e) {
    console.log(e);
}