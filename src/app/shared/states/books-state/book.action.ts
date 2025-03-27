import { BookDto } from '../../dto/book.dtos';

export namespace Book {
  export class AllBooks {
    static readonly type = '[Book] Get All Books';
  }

  export class Get {
    static readonly type = '[Book] Get Book';
    constructor(public id: number) {}
  }

  export class AddBook {
    static readonly type = '[Book] Add Book';
    constructor(public payload: BookDto) {}
  }

  export class Update {
    static readonly type = '[Book] Update Book';
    constructor(public payload: BookDto) {}
  }

  export class Delete {
    static readonly type = '[Book] Delete Book';
    constructor(public id: number) {}
  }
}
