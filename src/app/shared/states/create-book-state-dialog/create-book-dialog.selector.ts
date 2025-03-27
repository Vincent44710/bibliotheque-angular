import { Selector } from '@ngxs/store';
import { CreateBookStateModel } from './create-book-dialog.model';
import { CreateBookState } from './create-book-dialog.state';

export class CreateBookSelectors {

  @Selector([CreateBookState])
  static createBook(state: CreateBookStateModel) {
    console.log('Selector createBook state:', state);
    return { ...state.bookForm.model, id: state.id };
  }

  @Selector([CreateBookState])
  static isEditBook(state: CreateBookStateModel): boolean {
    return state.isEditMode;
  }
  
}
