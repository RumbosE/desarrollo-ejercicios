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



let r : Result<number> = Result.makeResult(10);
console.log(r.getValue());

//Ejemplos
//Estudiantes los deben hacer !!

class Either<TLeft, TRight> {
  private readonly value: TLeft | TRight;
  private readonly left: boolean;

  private constructor(value: TLeft | TRight, left: boolean) {
    this.value = value;
    this.left = left;
  }

  isLeft(): boolean {
    return this.left;
  }

  getLeft(): TLeft {
    if (!this.isLeft()) throw new Error();
    return <TLeft>this.value;
  }

  isRight(): boolean {
    return !this.left;
  }

  getRight(): TRight {
    if (!this.isRight()) throw new Error();
    return <TRight>this.value;
  }

  static makeLeft<TLeft, TRight>(value: TLeft) {
    return new Either<TLeft, TRight>(value, true);
  }

  static makeRight<TLeft, TRight>(value: TRight) {
    return new Either<TLeft, TRight>(value, false);
  }
}
