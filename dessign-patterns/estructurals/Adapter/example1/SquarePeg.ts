class RoundHole {
    private radius: number;
    
    constructor(radius: number) {
        this.radius = radius;
    }
    
    getRadius(): number {
        return this.radius;
    }
    
    fits(peg: RoundPeg): boolean {
        return this.radius >= peg.getRadius();
    }
}

class RoundPeg {

    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    getRadius(): number {
        return this.radius
    }

}

class SquarePeg {

    private width: number;

    constructor(width: number) {
        this.width = width;
    }

    getWidth(): number {
        return this.width;
    }

}

class SquarePegAdapter extends RoundPeg {

    private peg: SquarePeg;

    constructor(peg: SquarePeg) {
        super(peg.getWidth() * Math.sqrt(2) / 2);
        this.peg = peg;
    }

}

// uso del adapter

const roundHole = new RoundHole(8);
const roundPeg = new RoundPeg(5);
console.log(roundHole.fits(roundPeg)); // true

const squarePeg = new SquarePeg(10);
const squarePegAdapter = new SquarePegAdapter(squarePeg);
console.log(roundHole.fits(squarePegAdapter)); 

//el juego es que el cuadrado quepa en el hoyo redondo, el adapter se encarga de hacer la conversion de cuadrado a redondo a ver si pasa