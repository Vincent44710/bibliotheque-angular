import { State, Action, StateContext } from '@ngxs/store';
import { BookStateModel, defaultBookState } from './book.model';
import { Injectable } from '@angular/core';
import { Book } from './book.action';
import { BookService } from '../../../services/book-service';
import { tap } from 'rxjs';
import { BookDto } from '../../dto/book.dtos';
import { ToastrService } from 'ngx-toastr';

@State<BookStateModel>({
  name: 'Book',
  defaults: defaultBookState,
})
@Injectable()
export class BookState {
  constructor(
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  @Action(Book.GetAll)
  getBooks({ setState }: StateContext<BookStateModel>) {
    return this.bookService.getBooks().pipe(
      tap((books) => {
        setState({ books });
      })
    );
  }

  @Action(Book.Add)
  addBook(
    { getState, setState }: StateContext<BookStateModel>,
    { payload }: Book.Add
  ) {
    return this.bookService.addBook(payload).pipe(
      tap({
        next: (newBook: BookDto) => {
          const state = getState();
          setState({
            books: [...state.books, newBook],
          });
          this.toastr.success('Livre ajouté avec succès', 'Succès', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: () => {
          this.toastr.error("Oups, une erreur s'est produite", 'Échec', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
      })
    );
  }

  @Action(Book.Delete)
  delete(
    { getState, setState }: StateContext<BookStateModel>,
    { id }: Book.Delete
  ) {
    return this.bookService.deleteBook(id).pipe(
      tap({
        next: () => {
          const state = getState();
          const filteredBooks = state.books.filter((book) => book.id !== id);
          setState({
            books: filteredBooks,
          });
          this.toastr.success('Livre supprimé avec succès', 'Succès', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: () => {
          this.toastr.error("Oups, une erreur s'est produite", 'Échec', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
      })
    );
  }

  @Action(Book.Update)
  updateBook(
    { getState, setState }: StateContext<BookStateModel>,
    { payload }: Book.Update
  ) {
    return this.bookService.editBook(payload).pipe(
      tap({
        next: (updatedBook: BookDto) => {
          const state = getState();
          const updatedBooks = state.books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          );
          setState({
            books: updatedBooks,
          });
          this.toastr.success('Livre mis à jour avec succès', 'Succès', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
        error: () => {
          this.toastr.error("Oups, une erreur s'est produite", 'Échec', {
            closeButton: true,
            positionClass: 'toast-top-right',
          });
        },
      })
    );
  }
}
