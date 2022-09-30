import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private baseUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books"

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.baseUrl)
  }
}
