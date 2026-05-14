import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ShippingAddressService } from './services/shipping-address.service';
import { ShippingAddress } from './interfaces/shipping-address.interface';
import { ButtonComponent } from '@elevate/reusable-ui';
import {
  LucideAngularModule,
  Phone,
  PlusCircle,
  MapPin,
  Check,
  MoveLeft,
  MoveRight,
} from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { languageService } from '../../core/services/language-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddressUiService } from '../../shared/components/ui/dialogs/address-dialog/services/address-ui.service';

@Component({
  selector: 'app-shipping-address',
  imports: [
    ButtonComponent,
    LucideAngularModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: LucideAngularModule,
      useValue: LucideAngularModule.pick({
        Phone,
        PlusCircle,
        MapPin,
        Check,
        MoveLeft,
        MoveRight,
      }),
    },
  ],
  host: {
    class: 'block w-full',
  },
  templateUrl: './shipping-address.component.html',
})
export class ShippingAddressComponent implements OnInit {
  private readonly shippingAddressService = inject(ShippingAddressService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(languageService);
  private readonly dialogUiService = inject(AddressUiService);
  readonly proceedToPayment = output<ShippingAddress>();
  shippingAddresses = signal<ShippingAddress[]>([]);
  selectedAddress = signal<ShippingAddress | null>(null);
  nextIcon = computed(() =>
    this.languageService.isRTL() ? 'move-left' : 'move-right'
  );
  ngOnInit(): void {
    this.getUserAddresses();
  }
  getUserAddresses() {
    this.shippingAddressService
      .getLoggedUserAddress()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const addresses = data.addresses ?? data.address ?? [];
          this.shippingAddresses.set(addresses);
          if (addresses.length > 0 && !this.selectedAddress()) {
            this.selectedAddress.set(addresses[0]);
          }
        },
      });
  }
  selectAddress(address: ShippingAddress) {
    this.selectedAddress.set(address);
  }
  next() {
    const selectedAddress = this.selectedAddress();

    if (selectedAddress) {
      this.proceedToPayment.emit(selectedAddress);
    }
  }
  addAddress() {
    const address = this.selectedAddress();
    if (address != null) {
      this.dialogUiService
        .openAddressManager('view', address)
        ?.onClose.subscribe(() => {
          this.getUserAddresses();
        });
    } else {
      this.dialogUiService.openAddressManager('view')?.onClose.subscribe(() => {
        this.getUserAddresses();
      });
    }
  }
}
