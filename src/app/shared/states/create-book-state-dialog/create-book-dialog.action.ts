import { BookDto } from "../../dto/book.dtos";

export namespace CreateBookDialog {
    export class Display {
      static readonly type = '[CreateBook] Display Dialog';
  
      constructor(public book: BookDto | undefined = undefined, public isEditMode: boolean = false) {}
    }

    export class Submit {
      static readonly type = '[CreateBook] Submit Dialog';
  
      constructor(public newBook: BookDto) {}
    }
  
    export class Close {
      static readonly type = '[CreateBook] Close Dialog';
    }
  
    export class Reset {
      static readonly type = '[CreateBook] Reset Dialog';
    }
  }