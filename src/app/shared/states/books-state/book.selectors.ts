import { BookDto } from '../../dto/book.dtos';
import { BookStateModel } from './book.model';
import { Selector } from '@ngxs/store';
import { BookState as BookState } from './book.state';

export class BookSelectors {
  @Selector([BookState])
  static getBooks(state: BookStateModel): BookDto[] {
    console.log(state);
    return state.books;
  }
}
