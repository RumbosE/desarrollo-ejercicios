

abstract class Vehicle {
    private brand: string;
    private model: string;
    private color: string;
    private speed: number;

    constructor(source? : Vehicle){
        if(source){
            this.brand = source.brand;
            this.model = source.model;
            this.color = source.color;
            this.speed = source.speed;
        }
    }

    abstract clone(): Vehicle;

    setBrand(brand: string){
        this.brand = brand;
    }
    setModel(model: string){
        this.model = model;
    }
    setColor(color: string){
        this.color = color;
    }
    setSpeed(speed: number){
        this.speed = speed;
    }
}

class Car extends Vehicle {
    private doors: number;
    private topSpeed: number;

    constructor(source? : Car){
        super(source)
        if(source){
            this.doors = source.doors;
            this.topSpeed = source.topSpeed;
        }
    }
    clone(): Car {
        return new Car(this)
    }

    setDoors(doors: number){
        this.doors = doors;
    }
    setTopSpeed(topSpeed: number){
        this.topSpeed = topSpeed;
    }
}

class Bus extends Vehicle {
    private seats: number;

    constructor(source? : Bus){
        super(source)
        if(source){
            this.seats = source.seats;
        }
    }
    clone(): Bus {
        return new Bus(this)
    }
    setSeats(seats: number){
        this.seats = seats;
    }
}

// uso del clor

const listVehicles: Map<string, Vehicle>[] =  [];
const listVehiclesCopy: Map<string, Vehicle>[] = [];

const carro1 = new Car();
carro1.setBrand('toyota');
carro1.setModel('corolla');
carro1.setColor('red');
carro1.setSpeed(200);
carro1.setDoors(4);


const bus1 = new Bus();
bus1.setBrand('Mercedes');
bus1.setModel('Benz');
bus1.setColor('blue');
bus1.setSpeed(100);
bus1.setSeats(40);

listVehicles.push(new Map().set('Original', carro1));
listVehicles.push(new Map().set('Original', bus1));

for (const vehicle of listVehicles){
    const copy = vehicle.get('Original')?.clone();
    listVehiclesCopy.push(new Map().set('Copy', copy));
}


console.log(listVehicles);
console.log(listVehiclesCopy);