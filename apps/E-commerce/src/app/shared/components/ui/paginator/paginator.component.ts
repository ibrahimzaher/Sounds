import {
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Paginator, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  imports: [Paginator],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  private readonly viewportScroller = inject(ViewportScroller);

  first = input(0);
  rows = input(12);
  totalRecords = input(0);

  pageChange = output<PaginatorState>();

  handlePageChange(event: PaginatorState): void {
    this.pageChange.emit(event);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
