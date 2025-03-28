import { Selector } from '@ngxs/store';
import { BookDto } from '../../dto/book.dtos';
import { BookDialogState } from './book-dialog.state';
import { BookDialogStateModel } from './book-dialog.model';

export class BookDialogSelectors {
  @Selector([BookDialogState])
  static book(state: BookDialogStateModel): BookDto {
    return state.book;
  }
}
