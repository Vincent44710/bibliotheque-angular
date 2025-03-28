import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDto } from '../shared/dto/book.dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<BookDto[]> {
    //Renvoie un tableau de livres
    return this.http.get<BookDto[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<BookDto> {
    //Renvoie un seul livre
    return this.http.get<BookDto>(`${this.apiUrl}/${id}`);
  }

  addBook(book: BookDto): Observable<BookDto> {
    //Ajoute un livre
    return this.http.post<BookDto>(this.apiUrl, book);
  }

  editBook(book: BookDto): Observable<BookDto> {
    //Modifie un livre
    return this.http.put<BookDto>(`${this.apiUrl}/${book.id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    //Supprime un livre
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
