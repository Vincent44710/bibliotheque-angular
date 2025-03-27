import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../components/add-book/add-book-component';

@Injectable({
  providedIn: 'root',
})
export class CreateBookDialogService {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(AddBookComponent);
  }

  close() {
    this.dialog.closeAll();
  }
}
