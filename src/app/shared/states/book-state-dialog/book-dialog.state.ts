import { Action, State, StateContext } from '@ngxs/store';
import {
  BookDialogStateModel,
  defaultBookDialogState,
} from './book-dialog.model';
import { Injectable } from '@angular/core';
import { BookDialog } from './book-dialog.action';
import { tap } from 'rxjs';
import { BookDialogService } from '../../../services/book-dialog-service';
import { BookService } from '../../../services/book-service';

@State<BookDialogStateModel>({
  name: 'BookDialog',
  defaults: defaultBookDialogState,
})
@Injectable()
export class BookDialogState {
  constructor(
    private bookDialog: BookDialogService,
    private bookService: BookService
  ) {}

  @Action(BookDialog.Display)
  openDialogBook(
    { patchState }: StateContext<BookDialogStateModel>,
    { id }: BookDialog.Display
  ) {
    return this.bookService.getBookById(id).pipe(
      tap((book) => {
        patchState({ book: book });
      }),
      tap(() => {
        this.bookDialog.open();
      })
    );
  }

  @Action(BookDialog.Close)
  closeDialogBook({ patchState }: StateContext<BookDialogStateModel>) {
    patchState(defaultBookDialogState);
    this.bookDialog.close();
  }
}
