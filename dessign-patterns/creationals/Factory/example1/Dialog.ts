interface IButton{
    render(): void;

    onClick(): void;
}

class HTMLButton implements IButton{
    render(): void {
        console.log('HTMLButton render');
    }

    onClick(): void {
        console.log('HTMLButton onClick');
    }
}

class WindowsButton implements IButton{
    render(): void {
        console.log('WindowsButton render');
    }

    onClick(): void {
        console.log('WindowsButton onClick');
    }
}

abstract class Dialog {
    abstract createButton(): IButton;

    render(): void {
        const button = this.createButton();
        button.render();
        button.onClick();
    }n
}

class WebDialog extends Dialog {
    createButton(): IButton {
        return new HTMLButton();
    }
}

class WindowsDialog extends Dialog {
    createButton(): IButton {
        return new WindowsButton();
    }
}

// Usando la fabrica

const webDialog = new WebDialog();
webDialog.render();

const windowsDialog = new WindowsDialog();
windowsDialog.render();

