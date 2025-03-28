import { Selector } from '@ngxs/store';
import { SaveBookStateModel } from './save-book-dialog.model';
import { SaveBookState } from './save-book-dialog.state';

export class SaveBookSelectors {

  @Selector([SaveBookState])
  static bookForm(state: SaveBookStateModel) {
    console.log('Selector createBook state:', state);
    return { ...state.bookForm.model, id: state.id };
  }

  @Selector([SaveBookState])
  static isEditBook(state: SaveBookStateModel): boolean {
    return state.isEditMode;
  }
  
}
