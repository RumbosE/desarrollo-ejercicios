interface IBuilder {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(): void;
    setGPS(): void;
}

class CarBuilder implements IBuilder {
    private car: Car;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.car = new Car();
    }

    setSeats(seats: number) {
        this.car.setSeats(seats);
        return this
    }

    setEngine(engine: string) {
        this.car.setEngine(engine);
        return this;
    }

    setTripComputer() {
        this.car.setTripComputer();
        return this;
    }

    setGPS() {
        this.car.setGPS();
        return this;
    }

    getResult(): Car {
        return this.car;
    }
}

class CarManualBuilder implements IBuilder {
    private manual: Manual;

    constructor() {
        this.reset();
    }

    reset() {
        this.manual = new Manual();
    }

    setSeats(seats: number) {
        this.manual.add("Seats", seats);
        return this;
    }

    setEngine(engine: string) {
        this.manual.add("Engine", engine);
        return this;
    }

    setTripComputer() {
        this.manual.add("TripComputer", true);
        return this;
    }

    setGPS() {
        this.manual.add("GPS", true);
        return this;
    }

    getResult(): Manual {
        return this.manual;
    }
}

class Manual {

    private manual: Map<string, any>;

    constructor() {
        this.manual = new Map();
    }

    add(key: string, value: any): void {
        this.manual.set(key, value);
    }

    show(): void {
        console.log(this.manual);
    }
}

class Car {
    private seats: number;
    private engine: string;
    private tripComputer: boolean;
    private gps: boolean;

    setSeats(seats: number): void {
        this.seats = seats;
    }

    setEngine(engine: string): void {
        this.engine = engine;
    }

    setTripComputer(): void {
        this.tripComputer = true;
    }

    setGPS(): void {
        this.gps = true;
    }
}

class Director {
    private builder: IBuilder;

    constructor(builder: IBuilder) {
        builder.reset();
        this.builder = builder;
    }

    constructSportsCar(): void {
        this.builder.reset();
        this.builder.setSeats(2);
        this.builder.setEngine("Sport Engine");
        this.builder.setTripComputer();
        this.builder.setGPS();
    }

    constructSUV(): void {
        this.builder.reset();
        this.builder.setSeats(4);
        this.builder.setEngine("SUV Engine");
        this.builder.setGPS();
    }
}

// uso del patron builder

const carBuilder = new CarBuilder();
carBuilder
.setSeats(6)
.setEngine("V5")
.setTripComputer()
.getResult();

const carManualBuilder = new CarManualBuilder();
carManualBuilder
.setSeats(6)
.setEngine("V5")
.setTripComputer()
.getResult();

console.log(carBuilder.getResult())
console.log('   ')
console.log('-------------------')
console.log('   ')
console.log(carManualBuilder.getResult())

carBuilder.reset();
carBuilder.setSeats(4).getResult();

console.log(carBuilder)

// director.constructSportsCar();
// const manual = carManualBuilder.getResult();
// console.log(manual.show());
