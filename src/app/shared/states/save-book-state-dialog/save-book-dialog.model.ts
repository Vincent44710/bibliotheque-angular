export interface SaveBookStateModel {
  bookForm: {
    model: {
      title: string;
      author: string;
      year: number;
      picture: string;
      summary: string;
    };
  };
  id: number;
  isEditMode: boolean;
}

export const defaultSaveBookState: SaveBookStateModel = {
  bookForm: {
    model: {
      title: '',
      author: '',
      year: 0,
      picture: '',
      summary: '',
    },
  },
  id: 0,
  isEditMode: false,
};
