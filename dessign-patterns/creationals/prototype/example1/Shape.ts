abstract class Shape {
    x: number;
    y: number;
    color: string;
    
    constructor(source?: Shape){
        if(source){
            this.x = source.x;
            this.y = source.y;
            this.color = source.color;
        }
    }

    abstract clone(): Shape;
}

class Rectangle extends Shape{
    width: number
    height: number

    constructor(source?: Rectangle) {
        super(source);
        if(source){
            this.width = source.width;
            this.height = source.height;
            this.x = 0;
            this.y = 0;
        }
    }

    clone(): Rectangle {
        return new Rectangle(this);
    }
}

class Circle extends Shape {
    radius: number;

    constructor(source?: Circle) {
        super(source);
        if(source){
            this.radius = source.radius;
            this.x = 0;
            this.y = 0;
        }
    }

    clone(): Circle {
        return new Circle(this);
    }
}

// usando el patron prototype

const shapes: Shape[] = [];
const shapesCopy: Shape[] = [];


// shapesCopy.push(circle.clone());

const rectangle = new Rectangle();
rectangle.width=10;
rectangle.height=5;
rectangle.x=10;
rectangle.y=5;
rectangle.color='red';

const rectangle2 = rectangle.clone();

const circle = new Circle();
circle.radius=4;
circle.x=20;
circle.y=10;
circle.color='blue';

const circle2 = circle.clone();

shapes.push(rectangle);
shapes.push(circle);

shapesCopy.push(rectangle2);
shapesCopy.push(circle2);

console.log(shapes);
console.log('---------------------------------')
console.log(shapesCopy);