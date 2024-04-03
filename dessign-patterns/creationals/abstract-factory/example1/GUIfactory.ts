interface GUIFactory {
    createButton(): IButton;
    createCheckbox(): ICheckbox;
}

interface IButton {
    render(): void;
    onClick(): void;
}

interface ICheckbox {
    render(): void;
    onSelect(): void;
}

class WinFactory implements GUIFactory {
    createButton(): IButton {
        return new WinButton();
    }

    createCheckbox(): ICheckbox {
        return new WinCheckbox();
    }
}

class MacFactory implements GUIFactory {
    createButton(): IButton {
        return new MacButton();
    }

    createCheckbox(): ICheckbox {
        return new MacCheckbox();
    }
}

class WinButton implements IButton {
    render(): void {
        console.log('WinButton render');
    }

    onClick(): void {
        console.log('WinButton onClick');
    }
}

class MacButton implements IButton {
    render(): void {
        console.log('MacButton render');
    }

    onClick(): void {
        console.log('MacButton onClick');
    }
}

class WinCheckbox implements ICheckbox {
    render(): void {
        console.log('WinCheckbox render');
    }

    onSelect(): void {
        console.log('WinCheckbox onSelect');
    }
}

class MacCheckbox implements ICheckbox {
    render(): void {
        console.log('MacCheckbox render');
    }

    onSelect(): void {
        console.log('MacCheckbox onSelect');
    }
}

class Application {
    private factory: GUIFactory;

    private button: IButton;

    private checkbox: ICheckbox;

    constructor(factory: GUIFactory) {
        this.factory = factory;
    }

    aplication(f : GUIFactory){
        this.factory = f;
    }

    paint(): void {
        this.button.render();
        this.button.onClick();
        this.checkbox.render();
        this.checkbox.onSelect();
    }

    createUI(): void {
        this.button = this.factory.createButton();
        this.checkbox = this.factory.createCheckbox();
    }
}

// Usando la fabrica

console.log('Windows UI');
const pc1 = new Application(new WinFactory());
pc1.createUI();
pc1.paint();

console.log(' ');
console.log('--------------------');
console.log('Mac UI');
const mac = new Application(new MacFactory());
mac.createUI();
mac.paint();
