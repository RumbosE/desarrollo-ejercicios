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

    undo():string{
        this.textArea.restore(this.stateHistory.pop() as Memento);
        return this.textArea.takeSnapshot().getSaveText();
    }
    
}

// Uso del patron memento en typeScript

const editor = new Editor();
editor.write("Hola mundo");

editor.write("Hola mundo soy");
editor.write("Hola mundo soy un");
editor.write("Hola mundo soy un programador");

console.log(editor.undo());
console.log(' ');
editor.undo();
editor.undo();
editor.undo();
editor.write("Hola mundo soy Eduardo");

console.log(editor.undo());