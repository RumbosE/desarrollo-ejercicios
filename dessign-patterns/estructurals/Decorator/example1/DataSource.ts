interface IDataSource {
    writeData(data: string): void;
    readData(): string;
}

class FileDataSource implements IDataSource {
    private filename: string;

    public writeData(data: string): void {
        this.filename = data;
    }

    public readData(): string {
        return this.filename;
    }
}

class DataSourceDecoratorBase implements IDataSource {
    protected wrappee: IDataSource;

    constructor(source: IDataSource) {
        this.wrappee = source;
    }

    public writeData(data: string): void {
        this.wrappee.writeData(data);
    }

    public readData(): string {
        return this.wrappee.readData();
    }
}

class EncryptionDecorator extends DataSourceDecoratorBase {
    public writeData(data: string): void {
        super.writeData(this.encrypt(data));
    }

    public readData(): string {
        return this.decrypt(super.readData());
    }

    private encrypt(data: string): string {
        return 'Encrypted #@: ' + data;
    }

    private decrypt(data: string): string {
        return data + ' decrypted';
    }
}

class CompretionDecorator extends DataSourceDecoratorBase {

    public writeData(data: string): void {
        super.writeData(this.compress(data));
    }

    public readData(): string {
        return this.decompress(super.readData());
    }

    private compress(data: string): string {
        return 'Compressed #@: ' + data;
    }

    private decompress(data: string): string {
        return data + ' decompressed';
    }
}

// uso del patrón decorador

const source = new FileDataSource();
source.writeData('data muy importante');
console.log(source.readData());

console.log(' ')
console.log('-----------------')
console.log(' ')

console.log('Encriptada')
const encrypted = new EncryptionDecorator(source);
encrypted.writeData('data muy importante2');
console.log(encrypted.readData());

console.log(' ')
console.log('-----------------')
console.log(' ')

console.log('Comprimida')
const compressed = new CompretionDecorator(source);
compressed.writeData('data muy importante3');
console.log(compressed.readData());

console.log(' ')
console.log('Data comprimida y encriptada')
const compressedEncrypted = new CompretionDecorator(encrypted);
compressedEncrypted.writeData('data muy importante4');
console.log(compressedEncrypted.readData());

console.log(' ')
console.log('Data encriptada y comprimida')
const encryptedCompressed = new EncryptionDecorator(compressed);
encryptedCompressed.writeData('data muy importante5');
console.log(encryptedCompressed.readData());


