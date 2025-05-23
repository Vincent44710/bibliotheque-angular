import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { BookDto } from '../../shared/dto/book.dtos';
import { select, Store } from '@ngxs/store';
import { Book } from '../../shared/states/books-state/book.action';
import { BookSelectors } from '../../shared/states/books-state/book.selectors';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookDialog } from '../../shared/states/book-state-dialog/book-dialog.action';
import { SaveBookDialog } from '../../shared/states/save-book-state-dialog/save-book-dialog.action';

@Component({
  selector: 'app-book-list-component',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.scss',
})
export class BookListComponent implements OnInit {
  books: Signal<BookDto[]> = select(BookSelectors.getBooks);
  displayedColumns: string[] = ['title', 'author', 'year', 'actions'];
  dataSource = computed(() => new MatTableDataSource(this.books()));
  readonly dialog = inject(MatDialog);

  constructor(private store: Store) {}

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  ngOnInit() {
    this.store.dispatch(new Book.GetAll());
  }

  deleteBook(id: number) {
    this.store.dispatch(new Book.Delete(id))
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  displayBookDialog(bookId: number) {
    this.store.dispatch(new BookDialog.Display(bookId));
  }

  displayAddBookDialog() {
    this.store.dispatch(new SaveBookDialog.Display());
  }

  displayUpdateBookDialog(book: BookDto) {
    this.store.dispatch(new SaveBookDialog.Display(book, true));
  }

  private _updatePaginator = effect(() => {
    const dataSourceInstance = this.dataSource();
    if (this.paginator) {
      dataSourceInstance.paginator = this.paginator;
    }
  });

  private _updateSort = effect(() => {
    const dataSourceInstance = this.dataSource();
    if (this.sort) {
      dataSourceInstance.sort = this.sort;
    }
  });
}
