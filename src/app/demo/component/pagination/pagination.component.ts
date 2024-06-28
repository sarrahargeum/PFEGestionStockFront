// pagination.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [1, 2];

  constructor() {}

  ngOnInit(): void {}

  onTableDataChange(event: any): void {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
}
