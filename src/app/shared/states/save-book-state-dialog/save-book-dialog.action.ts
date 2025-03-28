import { BookDto } from "../../dto/book.dtos";

export namespace SaveBookDialog {
    export class Display {
      static readonly type = '[SaveBook] Display Dialog';
  
      constructor(public book: BookDto | undefined = undefined, public isEditMode: boolean = false) {}
    }

    export class Submit {
      static readonly type = '[SaveBook] Submit Dialog';
  
      constructor(public newBook: BookDto) {}
    }
  
    export class Close {
      static readonly type = '[SaveBook] Close Dialog';
    }
  }