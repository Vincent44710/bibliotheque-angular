import { Injectable } from '@angular/core';
import { BookItemComponent } from '../components/book-item-component/book-item-component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class BookDialogService {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(BookItemComponent);
  }

  close() {
    this.dialog.closeAll();
  }
}
