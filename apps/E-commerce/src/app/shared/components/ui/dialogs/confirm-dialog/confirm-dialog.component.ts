import { Component, AfterViewChecked, ElementRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ConfirmDialogModule, TranslateModule, LucideAngularModule],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements AfterViewChecked {
  private readonly element = inject(ElementRef);
  ngAfterViewChecked() {
    const dialogs = this.element.nativeElement.querySelectorAll('.p-dialog');
    dialogs.forEach((dialog: Element) => {
      if (
        !dialog.hasAttribute('aria-label') &&
        !dialog.hasAttribute('aria-labelledby')
      ) {
        dialog.setAttribute('aria-label', 'Confirmation dialog');
      }
    });
  }
}
