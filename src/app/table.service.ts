import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksData } from './IBooksData';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books"

  constructor(private http: HttpClient) { }

  getData(): Observable<BooksData[]> {
    return this.http.get<BooksData[]>(this.baseUrl)
  }
}
