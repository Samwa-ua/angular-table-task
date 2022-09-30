import { Component } from '@angular/core';
import { TableService } from './table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-table-task';
  displayedColumns: string[] = ['id', 'bookId', 'title', 'description', 'pageCount'];

  // constructor(private service: TableService) {
  //   this.service.getData().subscribe((data) => {
  //     console.log(data);

  //   })
  // }
}
