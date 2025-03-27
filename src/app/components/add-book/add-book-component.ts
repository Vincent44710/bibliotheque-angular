import { Component, Signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngxs/store';
import { BookDto } from '../../shared/dto/book.dtos';
import { CreateBookDialog } from '../../shared/states/create-book-state-dialog/create-book-dialog.action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CreateBookSelectors } from '../../shared/states/create-book-state-dialog/create-book-dialog.selector';
import { ToastrService } from 'ngx-toastr';
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
  templateUrl: './add-book-component.html',
  styleUrl: './add-book-component.scss',
})
export class AddBookComponent {
  matcher = new MyErrorStateMatcher();
  isSubmitted: boolean = false;
  isEditMode: Signal<boolean> = select(CreateBookSelectors.isEditBook);

  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    author: new FormControl('', [Validators.required, Validators.minLength(1)]),
    year: new FormControl(0, [Validators.required, Validators.pattern(/^\d{4}$/)]),
    picture: new FormControl('', [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg|jpeg))')]),
    summary: new FormControl('', [Validators.required, Validators.maxLength(500)]),
  });

  constructor(private store: Store, private toastr: ToastrService) {
  }

  isButtonDisabled(): boolean {
    return !this.bookForm.valid || this.isSubmitted;
  }

  submit() {
    const addBook: BookDto = this.bookForm.value;
    const isEditing = this.isEditMode();
    
    this.store.dispatch(new CreateBookDialog.Submit(addBook)).subscribe({
      next: () => {
        const message = isEditing 
          ? 'Livre modifié avec succès'
          : 'Livre ajouté avec succès';
  
        this.toastr.success(message, 'Succès', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      },
      error: () => {
        this.toastr.error("Une erreur est survenue lors de l'ajout", 'Erreur', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      }
    });
  
    this.store.dispatch(new CreateBookDialog.Close());
    this.isSubmitted = true;
  }
  
  cancel() {
    this.store.dispatch(new CreateBookDialog.Close());
  }
}
