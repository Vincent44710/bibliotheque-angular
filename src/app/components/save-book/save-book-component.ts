import { Component, Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngxs/store';
import { BookDto } from '../../shared/dto/book.dtos';
import { SaveBookDialog } from '../../shared/states/save-book-state-dialog/save-book-dialog.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SaveBookSelectors } from '../../shared/states/save-book-state-dialog/save-book-dialog.selector';
import { MyErrorStateMatcher } from '../../shared/utils/my-error-state-matcher';

@Component({
  selector: 'app-add-book-component',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgxsFormPluginModule
  ],
  templateUrl: './save-book-component.html',
  styleUrl: './save-book-component.scss',
})
export class SaveBookComponent {
  matcher = new MyErrorStateMatcher();
  isEditMode: Signal<boolean> = select(SaveBookSelectors.isEditBook);

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    author: new FormControl('', Validators.required),
    year: new FormControl(0, [Validators.required, Validators.pattern(/^\d{4}$/)]),
    picture: new FormControl('', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg|jpeg))')]),
    summary: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  constructor(private store: Store) {
  }

  isButtonDisabled(): boolean {
    return !this.bookForm.valid
  }

  submit() {
    const saveBook: BookDto = this.bookForm.value;
    const isEditing = this.isEditMode();
    this.store.dispatch(new SaveBookDialog.Submit(saveBook))
    this.store.dispatch(new SaveBookDialog.Close());
  }
  
  cancel() {
    this.store.dispatch(new SaveBookDialog.Close());
  }
}
