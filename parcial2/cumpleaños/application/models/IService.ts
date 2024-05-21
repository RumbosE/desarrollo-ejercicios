import { Either } from "../../common/Either";

export interface IService<D,R,E> {
    execute(data: D): Either<R,E>
}