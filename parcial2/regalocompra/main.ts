interface IActionService<T> {

    execute(data: T): Result<T>;
}

class BuyGiftDto {
    personId: string;
    productId: string;
    quantity: number;
    beneficedId?: string;
}

class Result<T> {
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
        return new Result<T>(false, value);
    }

    static makeError<T>(error: Error) {
        return new Result<T>(true, undefined, error);
    }
}

abstract class BaseHandler<T> implements IActionService<T> {
    private next: IActionService<T>;

    constructor(){}

    public setNextHandler(next: IActionService<T>): IActionService<T> {
        this.next = next;
        return this;
    }

    protected handleNext(data: T): Result<T> {
        if (this.next){
            return this.next.execute(data);
        }
        return Result.makeResult(data);    // No more handlers
    }

    abstract execute(data: T): Result<T>;
}

class ValidateUserService extends BaseHandler<BuyGiftDto>{

    constructor(private repository: IUserRepository){
        super();
    }

    execute(data: BuyGiftDto): Result<BuyGiftDto> { 
        console.log('Validate UserService');
        
        if(!this.repository.findUserById(data.personId)){
            return Result.makeError(new Error(data.personId + ` no se encuentra registrado in ${this.constructor.name}`));
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

class ValidateProductService extends BaseHandler<BuyGiftDto>
{

    constructor(private repository: IProductRepository){
        super();
    }

    execute(data: BuyGiftDto): Result<BuyGiftDto> { 
        console.log('Ejecutando ValidateProductService');
        
        if(!this.repository.findProductById(data.productId)){
            return Result.makeError(new Error(data.productId + ` no se encuentra registrado in ${this.constructor.name}`));
        }
        console.log('The Product exist in our db');
        console.log(' ');
        return this.handleNext(data);
    }
}

class ValidateBeneficedService extends BaseHandler<BuyGiftDto>
{

    constructor(private repository: IUserRepository){
        super();
    }

    execute(data: BuyGiftDto): Result<BuyGiftDto> { 
        console.log('Ejecutando BeneficedService');
        
        if(!this.repository.findUserById(data.beneficedId!)){
            return Result.makeError(new Error(data.beneficedId + ` no se encuentra registrado in ${this.constructor.name}`));
        }
        console.log('The lucky person exist in our db');
        console.log(' ');
        return this.handleNext(data);
    }
}

class ValidateWalletService extends BaseHandler<BuyGiftDto>
{

    constructor(private ProductRepository: IProductRepository, private UserRepository: IUserRepository){
        super();
    }

    execute(data: BuyGiftDto): Result<BuyGiftDto> { 
        console.log('Ejecutando ValidateWalletService');
        
        let price= this.ProductRepository.getPrice(data.productId)
        let walletAmount= this.UserRepository.getWalletTotal(data.personId)
        if(walletAmount<price*data.quantity){
            return Result.makeError(new Error(data.personId + ` no tiene suficiente saldo in ${this.constructor.name}`));
        }

        console.log('All is ready for your purchase');
        console.log(' ');
        return this.handleNext(data);
    }
}

interface ILogger
{
}

class ConsoleLogger implements ILogger
{

}
abstract class BaseLogger<T> implements IActionService<T>
{
    constructor(private logger: ILogger, public wrappee: IActionService<T> ){};
    
    execute(data: T): Result<T> { 
        return this.wrappee.execute(data);
    }
}

class LoggerService extends BaseLogger<BuyGiftDto>
{
    execute(data: BuyGiftDto): Result<BuyGiftDto> {
        let response = this.wrappee.execute(data);
        if(response.isError()){
            console.log(`Log: ${response.getError().message} `);
        }
        else{
            console.log(`Log: The purchase has been complete to ${data.personId}`, JSON.stringify(response.getValue()));
        }
        return response;
        
    }

}

class UserRepository implements IUserRepository
{
    findUserById(id: string): boolean {
        return true;
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


class BuyProductService implements IActionService<BuyGiftDto>
{
    execute(data: BuyGiftDto): Result<BuyGiftDto>{
        let service = new ValidateUserService(new UserRepository()).setNextHandler(
                        new ValidateProductService(new ProductRepository()).setNextHandler(
                            new ValidateWalletService(new ProductRepository(), new UserRepository())
                        )
                    )

        let response= service.execute(data)
        if(!response.isError()){
            console.log('The purchase has been complete', JSON.stringify(response.getValue()));
        }
        else{
            console.log('The purchase has been rejected ', response.getError().message);
        }
        return response;
    }
}


class RegaloProductService implements IActionService<BuyGiftDto>
{

    execute(data: BuyGiftDto){
        let service = new ValidateUserService(new UserRepository()).setNextHandler(
                            new ValidateProductService(new ProductRepository()).setNextHandler(
                                new ValidateWalletService(new ProductRepository(), new UserRepository()).setNextHandler(
                                    new ValidateBeneficedService(new UserRepository())
                                )
                            )
                        )
        
        let response= service.execute(data)
        if(!response.isError()){
            console.log('The gift was sent', JSON.stringify(response.getValue()));
        }
        else{
            console.log('The gift was not sent ', response.getError().message);
        }
        return response;
    }
}


let regalo= new LoggerService(new ConsoleLogger(),new RegaloProductService()).execute({personId:'212',productId:'2122', quantity:1, beneficedId:'212'})

// let purchase= new LoggerService(new ConsoleLogger(),new BuyProductService())
// purchase.validate({personId:'212',productId:'2122', quantity:6})
