import { Component, Signal, ViewEncapsulation } from '@angular/core';
import { BookDto } from '../../shared/dto/book.dtos';
import { select, Store } from '@ngxs/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BookDialogSelectors } from '../../shared/states/book-state-dialog/book-dialog.selectors';
import { MatDialogModule } from '@angular/material/dialog';
import { BookDialog } from '../../shared/states/book-state-dialog/book-dialog.action';

@Component({
  selector: 'app-book-item-component',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './book-item-component.html',
  styleUrl: './book-item-component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BookItemComponent {
  book: Signal<BookDto> = select(BookDialogSelectors.book);

  constructor(private store: Store) {}

  close() {
    this.store.dispatch(new BookDialog.Close());
  }
}
