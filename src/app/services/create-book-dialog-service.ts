import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveBookComponent } from '../components/save-book/save-book-component';

@Injectable({
  providedIn: 'root',
})
export class SaveBookDialogService {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(SaveBookComponent);
  }

  close() {
    this.dialog.closeAll();
  }
}
