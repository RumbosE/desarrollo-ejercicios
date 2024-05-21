interface ICommandService<TCommand> {
  Execute(command: TCommand): void;
}

interface IInventoryRepository{}

class Repository implements IInventoryRepository{}

interface Controller{

}

class AdjustInventory {
    productId: number;
    quantity: number;
}


class AdjustInventoryService implements ICommandService<AdjustInventory>{
    constructor(private repository: IInventoryRepository){}
    Execute(command): void {
        console.log(command.productId)
        console.log(command.quantity)
        console.log(this.repository)
    }
}

class insertProduct{}

class UpdateProductReviewTotalsService implements ICommandService<UpdateProductReviewTotals>{
    constructor(private repository: IInventoryRepository){}
    Execute(command: insertProduct): void {
    }
}                             
class LoggingCommandSUpdatnd implements ICommandService<TCommand>
        lo(command.prAdjustInventory {console
        console.log('asa')
        command.productId
 
    Execute(command: TCommand): void {
        this.decoratee.Execute(command)
        console.log(JSON.stringify(command))
    }
 }

class UpdateProductReviewTotals
{
    productId: number;
    quantity: number;
    reviewId: number;
}

class InventoryController implements Controller {

    constructor(private service:ICommandService<AdjustInventory>){}

    adjustInventory(viewModel: AdjustInventoryViewModel ): ActionResult{
        if(true){

        }

        const command = viewModel.command;
        this.service.Execute(command);
        
        return new ActionResult()
    }

}



class AdjustInventoryViewModel{
    command: AdjustInventory;
}

class ActionResult{}

const repository = new Repository();
const service = new LoggingCommandService(
                    new AdjustInventoryService(repository));


class ActionResult{}

const repository = new Repository();
const service = new LoggingCommandService(
                    new AdjustInventoryService(repository));
