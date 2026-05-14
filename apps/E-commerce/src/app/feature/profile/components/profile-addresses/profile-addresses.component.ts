import { ChangeDetectionStrategy, Component, computed, inject, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { AddressStateService } from '../../../../shared/components/ui/dialogs/address-dialog/services/address-state.service';
import { AddressListDialogComponent } from '../../../../shared/components/ui/dialogs/address-dialog/components/address-list/address-list-dialog.component';
import { AddressFormsDialogComponent } from '../../../../shared/components/ui/dialogs/address-dialog/components/address-forms/address-forms-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

/**
 * A no-op DynamicDialogRef for use outside a dialog context.
 * When close() is called, it signals the AddressStateService to go back to list view.
 */
class InlineDialogRef extends DynamicDialogRef {
  constructor(private readonly addressState: AddressStateService) {
    super();
  }
  override close(result?: unknown): void {
    // Instead of closing a dialog, go back to the address list view
    this.addressState.mode.set('view');
    this.addressState.address.set(null);
  }
}

@Component({
  selector: 'app-profile-addresses',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, ConfirmDialogModule],
  providers: [
    AddressStateService,
    ConfirmationService,
    {
      provide: DynamicDialogRef,
      useFactory: () => {
        const state = inject(AddressStateService);
        return new InlineDialogRef(state);
      },
    },
  ],
  template: `
    <div class="bg-white dark:bg-zinc-900 rounded-lg">
      <ng-container [ngComponentOutlet]="activeComponent()"></ng-container>
    </div>
    <p-confirmDialog [style]="{width: '50vw'}"></p-confirmDialog>
  `,
})
export class ProfileAddressesComponent {
  private readonly state = inject(AddressStateService);

  private readonly componentsMap: Record<string, Type<any>> = {
    view: AddressListDialogComponent,
    add: AddressFormsDialogComponent,
    edit: AddressFormsDialogComponent,
  };

  activeComponent = computed(() => this.componentsMap[this.state.mode()]);
}
