import { Either } from "../common/Either";
import { BaseServiceDecorator } from "./BaseDecoratorService";
import { ILogger } from "./models/ILogger";
import { IService } from "./models/IService";

export class LoggerService<D,R,E> extends BaseServiceDecorator<D,R,E> {
    constructor( private logger: ILogger, public wrapee: IService<D,R,E>) { 
        super(wrapee);
    }

    execute(data: D): Either<R,E> {
        let isError = false
        const result = super.execute(data);
        if (result.isRight()) {
            this.logger.write("Error: " + result.getRight());
            isError = true;
        }
        return result;
    }
}