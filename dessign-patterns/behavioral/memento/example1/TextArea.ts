class Memento {
    private readonly state: string;

    constructor (state: string) {
        this.state = state; 
    }

    getSaveText(): string{
        return this.state;
    }


}

class TextArea {
    private text: string;
    
    set(text: string){
        this.text = text;
    }
    
    takeSnapshot(): Memento{    
        return new Memento(this.text)
    }

    restore(memento: Memento){
        this.text = memento.getSaveText()
    }

    getText(): string{
        return this.text;
    }
}

class Editor {
    private textArea: TextArea;
    private stateHistory: Memento[]; 

    constructor(){
        this.stateHistory = new Array<Memento>(); 
        this.textArea = new TextArea();
    }

    write(text: string){
        this.textArea.set(text)
        this.stateHistory.push(this.textArea.takeSnapshot());
    }

    undo() {
        this.textArea.restore(this.stateHistory.pop() as Memento);
    }

    getMemento(){
        console.log(this.stateHistory)
    }
    
    getText() {
        console.log(this.textArea.getText())
    }
}

// Uso del patron memento en typeScript

const editor = new Editor();
editor.write("Hola mundo");

editor.write("Hola mundo soy");
editor.write("Hola mundo soy un");
editor.write("Hola mundo soy un programador");

editor.getMemento()

console.log(' ');
editor.undo();
editor.undo();
editor.undo();
editor.getText()
editor.getMemento()
editor.write("Hola mundo soy Eduardo");


editor.getMemento()

editor.getText()