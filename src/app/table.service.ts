import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksData, TransformedData } from './shared/interfaces/IBooksData';
import { of, groupBy, mergeMap, reduce, map, from, toArray } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books"

  constructor(private http: HttpClient) { }

  getAllData(): Observable<BooksData[]> {
    return this.http.get<BooksData[]>(this.baseUrl)
  }
  getGroupOfYears(): Observable<TransformedData[]> {
    return this.http.get<TransformedData[]>(this.baseUrl).pipe(
      map((books: TransformedData[]) => {
        return (books.map((book) => ({
          publishDate: new Date(book.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit' })
        })))
      })
    )
  }
}


