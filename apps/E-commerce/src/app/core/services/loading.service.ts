import { inject, Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly spinner = inject(NgxSpinnerService);
  private readonly count = signal(0);
  showLoading() {
    this.count.update((val) => val + 1);
    this.spinner.show();
  }
  hideLoading() {
    this.count.update((val) => val - 1);
    if (this.count() == 0) {
      this.spinner.hide();
    }
  }
}