
class Vertex<T>{
    visited: boolean = false;
    data: T;
    neighbors: Vertex<T>[] = [];
    constructor(value: T){
        this.data = value;
    }

    setVisited(visited: boolean){
        this.visited = visited;
    }

    isVisited(){
        return this.visited;
    }

    getNeighbors(){
        return this.neighbors;
    }
    setNeighbors(neighbors: Vertex<T>[]){
        this.neighbors = neighbors;
    }
}

interface Iterator<T>{
    hasNext(): boolean;
    getNext(): Vertex<T> | null ;
    reset(): void;
}

class DepthFirstIterator<T> implements Iterator<T>{
    private stack: Vertex<T>[] = [];
    private startVertex: Vertex<T>;

    constructor(start: Vertex<T>){
        this.startVertex= start;
        this.stack.push(start);
    }

    next(...args: [] | [undefined]): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
    return?(value?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
    throw?(e?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }

    hasNext(): boolean {
        return this.stack.length > 0;
    }

    getNext(): Vertex<T> | null {
        if(!this.hasNext()){
            return null;
        }
        let current = this.stack.pop();
        if(!current?.isVisited()){
            current?.setVisited(true);
            current?.getNeighbors().forEach(neighbor => {
                this.stack.push(neighbor);
            });
        }
        return this.getNext();
    }

    reset(): void {
        this.stack = [];
        this.stack.push(this.startVertex);
    }
}

// Usage
const v0 = new Vertex(0);
const v1 = new Vertex(1);
const v2 = new Vertex(2);
const v3 = new Vertex(3);
const v4 = new Vertex(4);
const v5 = new Vertex(5);
const v6 = new Vertex(6);

v0.setNeighbors([v1, v5, v6]);
v1.setNeighbors([v3, v4, v5]);
v4.setNeighbors([v2, v6]);
v5.setNeighbors([v0]);

console.log(v0.data);
console.log(v1.getNeighbors().map(v => v.data));

const iterator = new DepthFirstIterator(v0) as DepthFirstIterator<number>;
while(iterator.hasNext()){
    const vertex = iterator.getNext();
    console.log(vertex?.data);
}
