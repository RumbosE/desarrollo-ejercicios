interface Graphic {
    draw(): void;
    move(x: number, y: number): void;
}

class Dot implements Graphic {

    constructor(protected x: number, protected y: number) {
        this.x = x;
        this.y = y;
    }

    public draw(): void {
        console.log(`Dibujando el punto en (.) (${this.x}, ${this.y})`);
    }

    public move(x: number, y: number): void {
        this.x += x;
        this.y += y;
    }
}

class Circle extends Dot {

    constructor(x: number, y: number, private radius: number) {
        super(x, y);
        this.radius = radius;
    }

    public draw(): void {
        console.log(`Dibujando el circulo en (${this.x}, ${this.y}) con radio ${this.radius}`);
    }
}

class CompoundGraphic implements Graphic {

    private children: Graphic[] = [];

    public add(child: Graphic): void {
        this.children.push(child);
    }

    public remove(child: Graphic): void {
        this.children = this.children.filter(c => c !== child);
    }

    public draw(): void {
        this.children.forEach(child => child.draw());
    }

    public move(x: number, y: number): void {
        this.children.forEach(child => child.move(x, y));
    }
}

// uso del patrón composite

const dot = new Dot(1, 2);
const circle = new Circle(3, 4, 5);
const compoundGraphic = new CompoundGraphic();

compoundGraphic.add(dot);
console.log(compoundGraphic)

compoundGraphic.add(circle);
console.log(' ')
console.log(compoundGraphic)

circle.move(2, 1);
console.log(' ')
console.log(compoundGraphic)

compoundGraphic.draw();

console.log(' ')
console.log('Moviendo todos los elementos en (1, 1)')
compoundGraphic.move(1, 1);
compoundGraphic.draw();

console.log(' ')
console.log('Eliminando el punto')
compoundGraphic.add(new Circle(10, 10, 10));
compoundGraphic.remove(dot);
console.log(' ')
compoundGraphic.draw();

console.log(' ')
console.log('Removiendo el circulo')
compoundGraphic.remove(circle);
compoundGraphic.draw();

