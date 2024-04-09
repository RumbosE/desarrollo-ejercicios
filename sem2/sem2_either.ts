class Either<T, E> {
    private value?: T;
    private error?: E | Error;

    private constructor(value?: T, error?: E) {
        if ((value && error) || (!value && !error)) {
            this.error = Error("No se mando ni un valor ni un error algo malo hay aqui");
        }
        this.value = value;
        this.error = error;
    }

    getValue(): T {
        return <T>this.value;
    }

    hasError(): boolean {
        return this.error ? true : false;
    }

    getError(): Error{
        return<Error> this.error
    }

    static fabricEither<T>(value?: T) {
        if (!value) {
            return new Either(undefined, Error("No se mando ningun dato"));
        } else {
            return new Either(value, undefined);
        }
    }
}

// usando el either

let texto = 1;
let either = Either.fabricEither(texto);

if (either.hasError()) {
    console.log("Error: ", either.getError().message);
} else {
    console.log("Valor: ", either.getValue());
}
