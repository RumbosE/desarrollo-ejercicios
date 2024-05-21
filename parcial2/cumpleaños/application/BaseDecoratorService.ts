import { Either } from "../common/Either";
import { IService } from "./models/IService";

export abstract class BaseServiceDecorator<D,R,E> implements IService<D,R,E> {
    constructor(protected wrapee: IService<D,R,E> ) { }

    execute(data: D): Either<R,E>{
        return this.wrapee.execute(data);
    }
    
} 