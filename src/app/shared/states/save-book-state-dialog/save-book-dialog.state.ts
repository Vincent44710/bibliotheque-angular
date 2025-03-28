import { Action, State, StateContext } from '@ngxs/store';
import {
  SaveBookStateModel,
  defaultSaveBookState,
} from './save-book-dialog.model';
import { Injectable} from '@angular/core';
import { SaveBookDialog } from './save-book-dialog.action';
import { SaveBookDialogService } from '../../../services/create-book-dialog-service';
import { Book } from '../books-state/book.action';

@State<SaveBookStateModel>({
  name: 'saveBookDialog',
  defaults: defaultSaveBookState,
})
@Injectable()
export class SaveBookState {
  constructor(private dialogService: SaveBookDialogService) {}

  @Action(SaveBookDialog.Display)
  displaySaveBookDialog(
    { setState }: StateContext<SaveBookStateModel>,
    { book, isEditMode }: SaveBookDialog.Display
  ) {
    setState({
      bookForm: {
        model: book ? { ...book } : defaultSaveBookState.bookForm.model,
      },
      id: book && book.id !== null ? book.id : 0,
      isEditMode,
    });
    this.dialogService.open();
  }

  @Action(SaveBookDialog.Submit)
  submitBook(
    { getState, dispatch }: StateContext<SaveBookStateModel>,
    { newBook }: SaveBookDialog.Submit
  ) {
    const state = getState();
    const editMode = state.isEditMode;

    if (editMode) {
      newBook.id = state.id; // Mise à jour de l'id de newBook
      dispatch(new Book.Update(newBook));
    } else {
      dispatch(new Book.Add(newBook));
    }

    dispatch(new SaveBookDialog.Close());
  }

  @Action(SaveBookDialog.Close)
  closeCreateBookDialog({ setState }: StateContext<SaveBookStateModel>) {
    setState(defaultSaveBookState);
    this.dialogService.close();
  }
}
