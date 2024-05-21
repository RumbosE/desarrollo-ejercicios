import { ILogger } from "../application/models/ILogger";

export class ConsoleLogger implements ILogger {

    write(data: string) {
        console.log(data);
    }
}