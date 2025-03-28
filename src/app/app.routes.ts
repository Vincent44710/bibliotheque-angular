import { Routes } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { BookListComponent } from './components/book-list-component/book-list-component';
import { BookItemComponent } from './components/book-item-component/book-item-component';
import { SaveBookComponent } from './components/save-book/save-book-component';

export const routes: Routes = [
  { path: '', redirectTo: 'acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book/:id', component: BookItemComponent },
  { path: 'add-book', component: SaveBookComponent },
  { path: '**', redirectTo: 'acceuil', pathMatch: 'full' },
];
