import { BooksData } from './IBooksData';
import { Component, ViewChild } from '@angular/core';

import { TableService } from './table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  displayedColumns: string[] = ['id', 'title', 'description', 'pageCount', 'publishDate'];
  dataSource!: MatTableDataSource<BooksData>
  books: BooksData[] = []

  data: any = 'Test dfdfgdfg'

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      this.books = data
      this.dataSource = new MatTableDataSource(this.books)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
