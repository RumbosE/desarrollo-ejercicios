interface IMemento2 {
    getState(): string;
}

class OriginatorText {
    private text: string;

    set(text: string) {
        this.text = text;
    }

    get(): string {
        return this.text;
    }

    save(): IMemento2 {
        return new MementoText(this.text);
    }

    restore(memento: IMemento2) {
        this.text = memento.getState();
    }
}

class MementoText implements IMemento2 {
    private readonly state: string;

    constructor(state: string) {
        this.state = state;
    }

    getState(): string {
        return this.state;
    }
}

class EditorCaretaker {
    originator: OriginatorText;
    stateHistory: IMemento2[];

    constructor() {
        this.originator = new OriginatorText();
        this.stateHistory = new Array<IMemento2>();
    }

    write(text: string) {
        this.originator.set(text);
        this.stateHistory.push(this.originator.save());
    }

    undo() {
        this.stateHistory.pop();
        this.originator.restore(this.stateHistory[this.stateHistory.length - 1]);
    }

    getLastText() {
        return this.originator.get();
    }

}

const editorCaretaker = new EditorCaretaker();
editorCaretaker.write('Hello');
editorCaretaker.write('Hello World');
editorCaretaker.write('Hello World 2');

console.log(editorCaretaker.stateHistory);

editorCaretaker.undo();
console.log(editorCaretaker.stateHistory);
console.log(editorCaretaker.originator.get());