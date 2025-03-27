import { State, Action, StateContext } from '@ngxs/store';
import { BookStateModel, defaultBookState } from './book.model';
import { Injectable } from '@angular/core';
import { Book } from './book.action';
import { BookService } from '../../../services/book-service';
import { tap } from 'rxjs';
import { BookDto } from '../../dto/book.dtos';

@State<BookStateModel>({
  name: 'Book',
  defaults: defaultBookState,
})
@Injectable()
export class BookState {
  constructor(private bookService: BookService) {}

  @Action(Book.AllBooks)
  getBooks({ patchState }: StateContext<BookStateModel>) {
    return this.bookService.getBooks().pipe(
      tap((books) => {
        patchState({ books: books });
      })
    );
  }

  @Action(Book.AddBook)
  addBook(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: Book.AddBook
  ) {
    return this.bookService.addBook(payload).pipe(
      tap((newBook: BookDto) => {
        const state = getState();

        patchState({
          books: [...state.books, newBook],
        });
      })
    );
  }

  @Action(Book.Delete)
  delete(
    { getState, patchState }: StateContext<BookStateModel>,
    { id }: Book.Delete
  ) {
    return this.bookService.deleteBook(id).pipe(
      tap(() => {
        const state = getState();
        const filteredBooks = state.books.filter((book) => book.id !== id);
        patchState({
          books: filteredBooks,
        });
      })
    );
  }

  @Action(Book.Update)
  updateBook(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: Book.Update
  ) {
    return this.bookService.editBook(payload).pipe(
      tap((updatedBook: BookDto) => {
        const state = getState();
        const updatedBooks = state.books.map((book) =>
          book.id === updatedBook.id ? updatedBook : book
        );
        patchState({
          books: updatedBooks,
        });
      })
    );
  }
}
