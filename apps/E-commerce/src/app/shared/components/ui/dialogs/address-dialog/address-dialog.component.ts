import { Component, computed, inject } from '@angular/core';
import { AddressStateService } from './services/address-state.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddressListDialogComponent } from './components/address-list/address-list-dialog.component';
import { AddressFormsDialogComponent } from './components/address-forms/address-forms-dialog.component';
import { NgComponentOutlet } from '@angular/common';
@Component({
  selector: 'app-address-dialog',
  imports: [NgComponentOutlet],
  providers: [AddressStateService],
  templateUrl: './address-dialog.component.html',
})
export class AddressDialogComponent {
  public state = inject(AddressStateService);
  private config = inject(DynamicDialogConfig);
  private readonly componentsMap = {
    view: AddressListDialogComponent,
    add: AddressFormsDialogComponent,
    edit: AddressFormsDialogComponent,
  };
  activeComponent = computed(() => this.componentsMap[this.state.mode()]);
  constructor() {
    if (this.config.data) {
      this.state.mode.set(this.config.data.mode);
      this.state.address.set(this.config.data.address);
    }
  }
}
