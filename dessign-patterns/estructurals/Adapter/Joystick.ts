interface OldJoystick {
    conectToPort(): void;
    readInput(): number;
}

class OldJoystickImp implements OldJoystick {
    conectToPort(): void {
        console.log('Conectando al puerto...');
    }

    readInput(): number {
        console.log('Leyendo entrada...');
        return Math.floor(Math.random() * 100);
    }
}

interface NewJoystick {
    conectToUsb(): void;
    readData(): number;
}

class NewJoystickImp implements NewJoystick {
    conectToUsb(): void {
        console.log('Conectando al puerto USB...');
    }

    readData(): number {
        console.log('Leyendo datos...');
        return Math.floor(Math.random() * 100);
    }
}

class JoystickAdapter implements NewJoystick {

    constructor(private joystick: OldJoystickImp) {
        this.joystick = joystick;
    }

    conectToUsb(): void {
        this.joystick.conectToPort();
    }

    readData(): number {
        return this.joystick.readInput();
    }
}

// Uso
const oldJoystick = new OldJoystickImp();
const oldJoystickAdapter = new JoystickAdapter(oldJoystick);
oldJoystickAdapter.conectToUsb();

const newJoystick = new NewJoystickImp();
