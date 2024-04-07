class Light {
    switchedOn : boolean = false;

    constructor() { }

    switchLights() {
        this.switchedOn = !this.switchedOn;
    }
}

interface Command {
    getLightStatus(): boolean;
    execute(): void;
}

class SwitchLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute() {
        this.light.switchLights();
    }

    getLightStatus() {
        return this.light.switchedOn;
    }
}

class Room {
    private command: Command;

    constructor() { }

    setCommand(command: Command) {
        this.command = command;
    }

    executeCommand() {
        this.command.execute();
    }

    getLightStatus() {
        return this.command.getLightStatus();
    }
}

// class FloorLamp{
//     private command: Command;

//     constructor() { }

//     setCommand(command: Command) {
//         this.command = command;
//     }

//     executeCommand() {
//         this.command.execute();
//     }
// }

// usando el comand pattern

const room = new Room();
room.setCommand(new SwitchLightCommand(new Light()));

room.executeCommand(); // switch on
console.log('Lights are on', room.getLightStatus());

room.executeCommand(); // switch on
console.log(' ');
console.log('Lights are on', room.getLightStatus(), ' the lights are off');