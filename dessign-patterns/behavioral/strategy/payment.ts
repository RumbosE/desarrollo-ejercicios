interface IPaymentStrategy{

    validate(): boolean;
    pay(amount: number): void;
}

class CreditCardPayment implements IPaymentStrategy{
    
    private cardNumber: string;
    private cvv: string;
    private date: string;

    constructor(cardNumber: string, cvv: string, date: string){
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.date = date;
    }

    validate(): boolean {
        console.log('Validating credit card details...');
        return true;
    }

    pay(amount: number): void {
        console.log(`Paying ${amount} using credit card...`);
    }
}

class PayPalPayment implements IPaymentStrategy{

    private email: string;
    private password: string;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }

    validate(): boolean {
        console.log('Validating PayPal details...');
        return true;
    }

    pay(amount: number): void {
        console.log(`Paying ${amount} using PayPal...`);
    }
}

class PaymentContext{
    private stratgy: IPaymentStrategy;

    constructor(strategy: IPaymentStrategy){
        this.stratgy = strategy;
    }
    
    executePayment(amount: number): void{
        if(this.stratgy.validate()){
            this.stratgy.pay(amount);
        }else{
            console.log('Payment failed');
        }
    }
}

const creditCardPayment = new CreditCardPayment('123456789  1234 1234', '123', '12/23');
const payPalPayment = new PayPalPayment('hola@gmail.com', '123456');

const paymentContext = new PaymentContext(creditCardPayment).executePayment(100);
