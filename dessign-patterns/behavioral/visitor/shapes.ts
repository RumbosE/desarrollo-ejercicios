interface IVisitor{
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
    visitDot(dot: Dot): void;
}

class Circle{
    constructor(public radius: number){ }
    public accept(visitor: IVisitor){
        visitor.visitCircle(this);
    }
}

class Dot{
    constructor(public x: number, public y: number){}
    
    public accept(visitor: IVisitor){
        visitor.visitDot(this);
    }
}

class Rectangle{
    constructor(public width: number, public height: number){}
    
    public accept(visitor: IVisitor){
        visitor.visitRectangle(this);
    }
}

class XmlVisitor implements IVisitor{
    public visitCircle(circle: Circle){
        console.log(`The xml vivitor will print the:<circle radius="${circle.radius}"/>`);
    }
    public visitRectangle(rectangle: Rectangle){
        console.log(`The xml vivitor will print the: <rectangle width="${rectangle.width}" height="${rectangle.height}"/>`);
    }
    public visitDot(dot: Dot){
        console.log(`The xml vivitor will print the: <dot x="${dot.x}" y="${dot.y}"/>`);
    }
}

class JsonVisitor implements IVisitor{
    visitCircle(circle: Circle): void {
        console.log('The json visitor will print the: { "type": "circle", "radius": '+circle.radius+'}');
    }
    visitRectangle(rectangle: Rectangle): void {
        console.log('The json visitor will print the: { "type": "rectangle", "width": '+rectangle.width+', "height": '+rectangle.height+'}');
    }
    visitDot(dot: Dot): void {
        console.log('The json visitor will print the: { "type": "dot", "x": '+dot.x+', "y": '+dot.y+'}');
    }
    
}

const circle = new Circle(10);
const rectangle = new Rectangle(20, 30);
const dot = new Dot(5, 5);

const xmlVisitor = new XmlVisitor();
const jsonVisitor = new JsonVisitor();

rectangle.accept(jsonVisitor);