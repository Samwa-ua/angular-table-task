import { Component } from '@angular/core';
import { TableService } from './table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface BooksData {
  id: Number;
  title: String;
  description: String;
  pageCount: Number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-table-task';
  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount'];
  dataSource!: MatTableDataSource<BooksData>
  books: any

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      console.log(data);
      this.books = data
      this.dataSource = new MatTableDataSource(this.books)
    })
  }
}
