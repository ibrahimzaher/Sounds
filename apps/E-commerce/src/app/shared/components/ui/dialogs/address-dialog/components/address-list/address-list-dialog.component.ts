import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddressStateService } from '../../services/address-state.service';
import { ShippingAddress } from './../../../../../../../feature/shipping-address/interfaces/shipping-address.interface';
import { ShippingAddressService } from './../../../../../../../feature/shipping-address/services/shipping-address.service';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-list-dialog.component',
  imports: [TranslateModule, ButtonComponent],
  templateUrl: './address-list-dialog.component.html',
})
export class AddressListDialogComponent implements OnInit {
  private readonly shippingAddressService = inject(ShippingAddressService);
  public state = inject(AddressStateService);
  private readonly translate = inject(TranslateService);
  addresses = signal<ShippingAddress[]>([]);
  confirmationService = inject(ConfirmationService);
  private readonly toastr = inject(ToastrService);
  ngOnInit(): void {
    this.getAllAddresses();
  }
  getAllAddresses() {
    this.shippingAddressService
      .getLoggedUserAddress()
      .subscribe((addresses) => {
        this.addresses.set(addresses.addresses ?? addresses.address ?? []);
      });
  }
  onAdd() {
    this.state.mode.set('add');
    this.state.address.set(null);
  }
  onEdit(address: ShippingAddress, event: Event) {
    event.stopPropagation();
    this.state.address.set(address);
    this.state.mode.set('edit');
  }

  onDelete(address: ShippingAddress, event: Event) {
    event.stopPropagation();
    this.state.address.set(address);
    this.confirmationService.confirm({
      header: this.translate.instant('ADDRESS_DIALOG.CONFIRM'),
      message: this.translate.instant('ADDRESS_DIALOG.DELETE_CONFIRM'),
      icon: 'Trash2',
      rejectLabel: this.translate.instant('ADDRESS_DIALOG.CANCEL'),
      acceptLabel: this.translate.instant('ADDRESS_DIALOG.CONFIRM'),
      accept: () => {
        this.shippingAddressService.removeAddress(address._id).subscribe(() => {
          this.shippingAddressService
            .getLoggedUserAddress()
            .subscribe((addresses) => {
              this.addresses.set(
                addresses.addresses ?? addresses.address ?? []
              );
              this.toastr.success(
                this.translate.instant('ADDRESS_DIALOG.DELETE_SUCCESS')
              );
              this.state.address.set(null);
            });
        });
      },
    });
  }
}
