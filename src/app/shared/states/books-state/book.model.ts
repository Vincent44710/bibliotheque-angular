import { BookDto } from '../../dto/book.dtos';

export interface BookStateModel {
  books: BookDto[];
}

export const defaultBookState: BookStateModel = {
  books: [],
};
