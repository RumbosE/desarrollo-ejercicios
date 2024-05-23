interface IActionService<T> {
    execute(data: T): Result<T>;
}

class BuyProductDto {
    personId: string;
    productId: string;
    quantity: number;
    gift: boolean;
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

abstract class MultiActionService<T> implements IActionService<T> {

    constructor(private actions: IActionService<T>[]){ }

    execute(data: T): Result<T>{
        for(let action of this.actions){
            let response = action.execute(data);
            if(response.isError()){
                return response;
            }
        }
        return Result.makeResult(data);
    };
}

class ValidateUserService implements IActionService<BuyProductDto>{

    constructor(private repository: IUserRepository){ }

    execute(data: BuyProductDto): Result<BuyProductDto> { 
        console.log('Validate UserService');
;
        if(!this.repository.findUserById(data.personId)){
            return Result.makeError(new Error(data.personId + ` no se encuentra registrado in ${this.constructor.name}`));
        }
        return Result.makeResult(data);
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

class ValidateProductService implements IActionService<BuyProductDto>
{

    constructor(private repository: IProductRepository){}

    execute(data: BuyProductDto): Result<BuyProductDto> { 
        console.log('Ejecutando ValidateProductService');
        
        if(!this.repository.findProductById(data.productId)){
            return Result.makeError(new Error(data.productId + ` no se encuentra registrado in ${this.constructor.name}`));
        }
        return Result.makeResult(data);
    }
}

class ValidateBeneficedService implements IActionService<BuyProductDto>
{
    constructor(private repository: IUserRepository){ };

    execute(data: BuyProductDto): Result<BuyProductDto> { 
        console.log('Ejecutando BeneficedService');

        if(!this.repository.findUserById(data.beneficedId!)){
            return Result.makeError(new Error(data.beneficedId + ` no se encuentra registrado in ${this.constructor.name}`));
        }
        return Result.makeResult(data);
    }
}

class ValidateWalletService implements IActionService<BuyProductDto>
{
    constructor(private ProductRepository: IProductRepository, private UserRepository: IUserRepository){ }

    execute(data: BuyProductDto): Result<BuyProductDto> { 
        console.log('Ejecutando ValidateWalletService');
        
        let price= this.ProductRepository.getPrice(data.productId)
        let walletAmount= this.UserRepository.getWalletTotal(data.personId)
        if(walletAmount<price*data.quantity){
            return Result.makeError(new Error(data.personId + ` no tiene suficiente saldo in ${this.constructor.name}`));
        }
        return Result.makeResult(data);
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

class LoggerService extends BaseLogger<BuyProductDto>
{
    execute(data: BuyProductDto): Result<BuyProductDto> {
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


class BuyProductService extends MultiActionService<BuyProductDto>
{
    constructor(){
        super([
            new ValidateUserService(new UserRepository()),
            new ValidateProductService(new ProductRepository()),
            new ValidateWalletService(new ProductRepository(), new UserRepository())
        ]);
    }
}


class RegaloProductService extends MultiActionService<BuyProductDto>
{
    constructor(){
        super([
            new ValidateUserService(new UserRepository()),
            new ValidateProductService(new ProductRepository()),
            new ValidateWalletService(new ProductRepository(), new UserRepository()),
            new ValidateBeneficedService(new UserRepository())
        ]);
    }
}


let regalo= new LoggerService(new ConsoleLogger(),new RegaloProductService()).execute({personId:'212',productId:'2122', quantity:2,gift:true, beneficedId:'212'})

// let purchase= new LoggerService(new ConsoleLogger(),new BuyProductService())
// purchase.validate({personId:'212',productId:'2122', quantity:6})

