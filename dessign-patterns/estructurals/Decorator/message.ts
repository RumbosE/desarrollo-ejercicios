interface INotifier {
    send(msg: string): void;
}
class Notifier implements INotifier{

    constructor(private username: string){ }

    send(message: string) {
        console.log(`sending message: ${message} to ${this.username}`);
    }
}

abstract class BaseDecoratorNotifier implements INotifier {
    
    private wrappee : INotifier

    constructor(c : INotifier){
        this.wrappee=c;
    }

    send(msg: string): void {
        this.wrappee.send(msg);
    }

}

class WhatsAppDecorator extends BaseDecoratorNotifier{
    send(msg: string): void {
        super.send(msg)
        console.log('returning this msg by whatsap: ', msg)
    }
}

class EmailDecorator extends BaseDecoratorNotifier{
    send(msg: string): void {
        super.send(msg)
        console.log('returning this msg by email: ', msg)
    }
}

// usando el decorador

const notifier = new Notifier('username');
const whatsAppDecorator = new WhatsAppDecorator(notifier);
const emailDecorator = new EmailDecorator(notifier);

let msg = 'Hola beba';
let base = new WhatsAppDecorator(new EmailDecorator(new Notifier('rose')));
base.send(msg);