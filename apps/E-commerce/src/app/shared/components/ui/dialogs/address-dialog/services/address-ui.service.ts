import { inject, Injectable } from '@angular/core';
import { ShippingAddress } from '../../../../../../feature/shipping-address/interfaces/shipping-address.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { AddressDialogComponent } from '../address-dialog.component';

@Injectable({ providedIn: 'root' })
export class AddressUiService {
  private dialogService = inject(DialogService);

  openAddressManager(
    mode: 'view' | 'add' | 'edit' = 'view',
    address?: ShippingAddress
  ) {
    return this.dialogService.open(AddressDialogComponent, {
      data: { mode, address },
      header: '',
      ariaLabelledBy: 'address-dialog-title',
      width: 'min(90vw, 850px)',
      showHeader: false,
      closable: true,
      closeAriaLabel: 'Close address manager dialog',
      appendTo: 'body',
      closeOnEscape: true,
      dismissableMask: true,
      focusOnShow: true,
      focusTrap: true,
      draggable: false,
      contentStyle: {
        padding: '0',
        borderRadius: '1.5rem',
        backgroundColor: 'transparent',
      },
      baseZIndex: 10000,
    });
  }
}
