import { IService } from "./models/IService";
import { User } from "../domain/User";
import { Either } from "../common/Either";
import { ISender } from "./models/ISender";

interface EmailSender {
    email: string;
    msg: string;
}

export class CurrentUser implements IService<User,User,Error> {
    
    constructor(private sender: ISender<EmailSender>){}

    execute(user: User): Either<User,Error> {
        if( user.getBirthdate() === new Date().toISOString() ) {
            const sent = this.sender.sendMessage({email: user.getEmail(), msg: `Hola, ${user.getUsername}. Sí se envió tu felicitacion. Feliz cumpleaños y Dios te bendiga`});
            if(sent) return Either.makeLeft<User, Error>(user)
            return Either.makeRight<User, Error>(new Error('Falló el envío por email'))
        }
        return Either.makeRight<User, Error>(new Error('Falló el envío por email'))
    }

}