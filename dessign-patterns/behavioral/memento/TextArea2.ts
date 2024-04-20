interface IMemento2 {
    getState(): string;
}

class OriginatorText {
    private text: string;

    set(text: string): OriginatorText {
        this.text = text;
        return this;
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
    private originator: OriginatorText;
    stateHistory: IMemento2[];

    constructor() {
        this.originator = new OriginatorText();
        this.stateHistory = new Array<IMemento2>();
    }

    write(text: string): void {
        let o = this.originator.set(text);
        this.stateHistory.push(o.save());
    }

    undo() {
        this.stateHistory.pop();
        let lastState = this.stateHistory[this.stateHistory.length - 1];
        this.originator.restore(lastState);
    }

    getText() {
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
console.log(editorCaretaker.getText());