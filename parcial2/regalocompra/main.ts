interface IActionService<T> {

    validate(data: T): Resulte<T>;
}

class BuyGiftDto {
    personId: string;
    productId: string;
    quantity: number;
    beneficedId?: string;
}

class Resulte<T> {
    private value: T;
    private _error: Error;
    private _isError: boolean;

    private constructor(isError: boolean,
        value?: T, _error?: Error) {
        this.value = value!;
        this._error = _error!;
        this._isError = isError;
    }

    public isError(): boolean {
        return this._isError;
    }

    getValue(): T {
        if (this.isError()) throw new Error();
        return this.value;
    }

    getError(): Error {
        if (!this.isError()) throw new Error();
        return this._error;
    }

    static makeResult<T>(value: T) {
        return new Resulte<T>(false, value);
    }

    static makeError<T>(error: Error) {
        return new Resulte<T>(true, undefined, error);
    }
}

abstract class BaseHandler<T> implements IActionService<T> {

    private next: IActionService<T>;

    constructor( ){}

    public setNextHandler(next: IActionService<T>): IActionService<T> {
        this.next = next;
        return this;
    }

    protected handleNext(data: T): Resulte<T> {
        if (this.next) {
            return this.next.validate(data);
        }
        return Resulte.makeResult(data);    // No more handlers
    }

    abstract validate(data: T): Resulte<T>;
}

class ValidateUserService extends BaseHandler<BuyGiftDto>{

    constructor(private repository: IUserRepository){
        super();
    }

    validate(data: BuyGiftDto): Resulte<BuyGiftDto> { 
        console.log('Validate UserService');
        
        if(!this.repository.findUserById(data.personId)){
            return Resulte.makeError(new Error(data.personId + ' no se encuentra registrado'));
        } else {
            console.log('The user exist in our db');
            console.log(' ');
            return this.handleNext(data);
        }
        
    }
}

interface IUserRepository{
    findUserById(id: string):boolean 
    getWalletTotal(id:string):number
}


interface IProduct{
    id: string;
    name: string;
    price: number;
}

interface IProductRepository{
    findProductById(id: string):IProduct
    getPrice(id:string):number
}

class ValidateProductService extends BaseHandler<BuyGiftDto>{

    constructor(private repository: IProductRepository){
        super();
    }

    validate(data: BuyGiftDto): Resulte<BuyGiftDto> { 
        console.log('Ejecutando ValidateProductService');
        
        if(!this.repository.findProductById(data.productId)){
            return Resulte.makeError(new Error(data.productId + ' no se encuentra registrado'));
        }
        console.log('The Product exist in our db');
        console.log(' ');
        return this.handleNext(data);
    }
}

class ValidateBeneficedService extends BaseHandler<BuyGiftDto>{

    constructor(private repository: IUserRepository){
        super();
    }

    validate(data: BuyGiftDto): Resulte<BuyGiftDto> { 
        console.log('Ejecutando BeneficedService');
        
        if(!this.repository.findUserById(data.beneficedId!)){
            return Resulte.makeError(new Error(data.beneficedId + ' no se encuentra registrado'));
        }
        console.log('The lucky person exist in our db');
        console.log(' ');
        return this.handleNext(data);
    }
}

class ValidateWalletService extends BaseHandler<BuyGiftDto>{

    constructor(private ProductRepository: IProductRepository, private UserRepository: IUserRepository){
        super();
    }

    validate(data: BuyGiftDto): Resulte<BuyGiftDto> { 
        console.log('Ejecutando ValidateWalletService');
        
        let price= this.ProductRepository.getPrice(data.productId)
        let walletAmount= this.UserRepository.getWalletTotal(data.personId)
        if(walletAmount<price*data.quantity){
            return Resulte.makeError(new Error(data.personId + ' no tiene suficiente saldo'));
        }

        console.log('All is ready for your purchase');
        console.log(' ');
        return this.handleNext(data);
    }
}

interface ILogger{

}

abstract class BaseLogger<T> implements IActionService<T>{
    constructor(private logger: ILogger, public wrappee: IActionService<T> ){};
    
    validate(data: T): Resulte<T> { 
        return this.wrappee.validate(data);
    }
}

class LoggerService extends BaseLogger<BuyGiftDto>{
    validate(data: BuyGiftDto): Resulte<BuyGiftDto> {
        let response = this.wrappee.validate(data);
        if(response.isError()){
            console.log(`Log: ${response.getError().message}`);
        }
        return response;
        
    }

}

class UserRepository implements IUserRepository{
    findUserById(id: string): boolean {
        return false;
    }

    getWalletTotal(id: string): number {
        return 100;
    }
}

class ProductRepository implements IProductRepository{
    findProductById(id: string): IProduct {
        return {id: '1', name: 'Laptop', price: 50};
    }

    getPrice(id: string): number {
        return 50;
    }
}

class BuyProductService {
    static fabricPurchase(data: BuyGiftDto){
        let service = new ValidateUserService(new UserRepository()).setNextHandler(
            new ValidateProductService(new ProductRepository()).setNextHandler(
                new ValidateProductService(new ProductRepository()).setNextHandler(
                    new ValidateWalletService(new ProductRepository(), new UserRepository())
                )
            )
        )
                            
        service.validate(data);
    }
}

class RegaloProductService{
    static fabricRegalo(data: BuyGiftDto){
        let service = new ValidateUserService(new UserRepository()).setNextHandler(
                            new ValidateProductService(new ProductRepository()).setNextHandler(
                                new ValidateWalletService(new ProductRepository(), new UserRepository()).setNextHandler(
                                    new ValidateBeneficedService(new UserRepository())
                                )
                            )
                        )
        
        let response= service.validate(data)
        if(!response.isError()){
            console.log('The gift was sent ', JSON.stringify(response.getValue()));
        }
        else{
            console.log('The gift was not sent ', response.getError().message);
        }
    }
}


// let purchase= BuyProductService.fabricPurchase({personId:'212',productId:'2122', quantity:4})

let regalo= RegaloProductService.fabricRegalo({personId:'212',productId:'2122', quantity:4, beneficedId:'312'})
