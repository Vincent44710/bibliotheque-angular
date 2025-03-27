import { Action, State, StateContext } from '@ngxs/store';
import {
  CreateBookStateModel,
  defaultCreateBookState,
} from './create-book-dialog.model';
import { Injectable} from '@angular/core';
import { CreateBookDialog } from './create-book-dialog.action';
import { CreateBookDialogService } from '../../../services/create-book-dialog-service';
import { Book } from '../books-state/book.action';

@State<CreateBookStateModel>({
  name: 'createBookDialog',
  defaults: defaultCreateBookState,
})
@Injectable()
export class CreateBookState {
  constructor(private dialog: CreateBookDialogService) {}

  @Action(CreateBookDialog.Display)
  displayCreateBookDialog(
    { patchState }: StateContext<CreateBookStateModel>,
    { book, isEditMode }: CreateBookDialog.Display
  ) {
    patchState({
      bookForm: {
        model: book ? { ...book } : defaultCreateBookState.bookForm.model,
      },
      id: book && book.id !== null ? book.id : 0,
      isEditMode,
    });
    this.dialog.open();
  }

  @Action(CreateBookDialog.Submit)
  submitBook(
    { getState, dispatch }: StateContext<CreateBookStateModel>,
    { newBook }: CreateBookDialog.Submit
  ) {
    const state = getState();
    const editMode = state.isEditMode;

    if (editMode) {
      newBook.id = state.id; // Mise à jour de l'id de newBook
      console.log(' Mode édition : Modification du livre', newBook);
      dispatch(new Book.Update(newBook));
    } else {
      console.log('Mode création : Ajout du livre');
      dispatch(new Book.AddBook(newBook));
    }

    dispatch(new CreateBookDialog.Close());
  }

  @Action(CreateBookDialog.Close)
  closeCreateBookDialog({ patchState }: StateContext<CreateBookStateModel>) {
    patchState(defaultCreateBookState);
    this.dialog.close();
  }

  @Action(CreateBookDialog.Reset)
  reset({ patchState }: StateContext<CreateBookStateModel>) {
    patchState(defaultCreateBookState);
  }
}
