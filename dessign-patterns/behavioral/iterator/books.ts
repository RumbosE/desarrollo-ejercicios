type Book ={
    title: string;
    author: string;
}

interface CollectionBooks {
    getNext(): Book;
    hasMore(): boolean;
}

interface ConcreteCollection {
    createIterator(i:CollectionBooks): CollectionBooks;
}

class BooksColection implements ConcreteCollection{

    books: Book[] = [];

    addBook(book: Book){
        this.books.push(book);
    }
    
    removeBook(book: Book){
        this.books = this.books.filter(b => b.title !== book.title);
    }

    createIterator(i: CollectionBooks): CollectionBooks {
        return i;
    }
}

class AlphabeticIterator implements CollectionBooks{
    
    private iterationState: number = 0;
    private sortedBooks: Book[] = [];

    constructor(private collection: BooksColection){ }

    private orderBooks(b: BooksColection): void{
        this.sortedBooks = b.books.sort((a, b) => a.title.localeCompare(b.title));
    }

    getNext(): Book {
        return this.sortedBooks[this.iterationState++];
    }

    hasMore(): boolean {
        if(this.sortedBooks.length === 0){
            this.orderBooks(this.collection);
        }
        return this.iterationState < this.sortedBooks.length;
    }
}

class AutorIterator implements CollectionBooks{
    
    private iterationState: number = 0;
    private sortedBooks: Book[] = [];

    constructor(private collection: BooksColection){ }

    private orderBooks(b: BooksColection): void{
        this.sortedBooks = b.books.sort((a, b) => a.author.localeCompare(b.author));
    }

    setCollection(collection: BooksColection){
        this.collection = collection;
    }

    getNext(): Book {
        return this.sortedBooks[this.iterationState++];
    }

    hasMore(): boolean {
        this.orderBooks(this.collection);
        return this.iterationState < this.sortedBooks.length;
    }
}

// Usage
const booksCollection = new BooksColection();
booksCollection.addBook({title: 'A', author: 'Author A'});
booksCollection.addBook({title: 'E', author: 'Author E'});  
booksCollection.addBook({title: 'C', author: 'Author C'});
booksCollection.addBook({title: 'B', author: 'Author B'});
booksCollection.addBook({title: 'D', author: 'Author D'});

const iterator = booksCollection.createIterator(new AlphabeticIterator(booksCollection));

booksCollection.addBook({title: 'Astros', author: 'Author F'});

console.log('Books in without order ');
booksCollection.books.forEach(b => console.log(b));

console.log(' ');


console.log('Books in alphabetic order');
while(iterator.hasMore()){
    console.log(iterator.getNext());
}

console.log(' ');

const iteratorAutor = booksCollection.createIterator(new AutorIterator(booksCollection));

console.log('Books in autor order');
while(iteratorAutor.hasMore()){
    console.log(iteratorAutor.getNext() );
}