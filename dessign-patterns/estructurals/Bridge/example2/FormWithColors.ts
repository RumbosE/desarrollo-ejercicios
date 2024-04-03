abstract class Form {

    color: IColor;

    constructor(color: IColor) {
        this.color = color;
    }
}

interface IColor {
    fill(): string;
}

class RedColor implements IColor {
    fill(): string {
        return 'red';
    }
}

class BlueColor implements IColor {
    fill(): string {
        return 'blue';
    }
}

class CircleForm extends Form {
    draw(): string {
        return `Circle filled with color ${this.color.fill()}`
    }
}

class SquareForm extends Form {
    draw(): string {
        return `Square filled with color ${this.color.fill()}`
    }
}

// Usando el patrón Bridge

const redCircle = new CircleForm(new RedColor());
console.log(redCircle.draw());

const blueCircle = new CircleForm(new BlueColor());
console.log(blueCircle.draw());

const blueSquare = new SquareForm(new BlueColor());
console.log(blueSquare.draw());

const redSquare = new SquareForm(new RedColor());
console.log(redSquare.draw());