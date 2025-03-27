import { BookDto } from '../../dto/book.dtos';

export interface BookDialogStateModel {
  book: BookDto;
}

export const defaultBookDialogState: BookDialogStateModel = {
  book: {
    id: null,
    title: '',
    author: '',
    year: 0,
    picture: '',
    summary: '',
  },
};
