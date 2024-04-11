interface IBox{
    calculatePrice(): number;
}

class VideoGame implements IBox{
    
    constructor(private nombre:string ,private price: number){}

    calculatePrice(): number {
        return this.price;
    }

    setPrice(price: number): void{
        this.price = price;
    }
}

class Monitor implements IBox{
    
    constructor(private modelo:string ,private price: number){}

    calculatePrice(): number {
        return this.price;
    }
}

class BoxComposite implements IBox{

    private children: Array<IBox> = []

    add(c : IBox): void{
        this.children.push(c)
    }

    remove(c: IBox): void{
        this.children = this.children.filter((item) => item!=c)
    }

    calculatePrice(): number {
        let total = 0;
        this.children.forEach((item) => {
            total += item.calculatePrice();
        });
        return total;
    }

    getChildren(): IBox[] {
        return this.children;
    }
}

// usando la broma

let videoGame1 = new VideoGame('FIFA 2021', 100);
let videoGame2 = new VideoGame('GTA V', 200);
let monitor1 = new Monitor('Samsung', 500);
let monitor2 = new Monitor('LG', 600);

let box1 = new BoxComposite();
box1.add(videoGame1);
box1.add(videoGame2);
box1.add(monitor1);

let box2 = new BoxComposite();
box2.add(monitor2);
box2.add(box1);

console.log(box1.calculatePrice());

videoGame1.setPrice(50)
console.log('');
console.log(box2.getChildren());
console.log('price box2: ', box2.calculatePrice());


