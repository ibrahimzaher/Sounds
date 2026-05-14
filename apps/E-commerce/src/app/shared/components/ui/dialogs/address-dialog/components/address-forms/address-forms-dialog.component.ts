import { ShippingAddressService } from './../../../../../../../feature/shipping-address/services/shipping-address.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressStateService } from './../../services/address-state.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '@elevate/auth-domain';
import { ToastrService } from 'ngx-toastr';
import { AddressFormStepComponent } from './components/address-form-step/address-form-step.component';
import { AddressMapStepComponent } from './components/address-map-step/address-map-step.component';
import { StepperComponent } from '../../../../stepper/stepper.component';
@Component({
  selector: 'app-address-forms-dialog.component',
  imports: [
    TranslateModule,
    AddressFormStepComponent,
    AddressMapStepComponent,
    StepperComponent,
  ],
  templateUrl: './address-forms-dialog.component.html',
})
export class AddressFormsDialogComponent implements OnInit {
  private readonly ref = inject(DynamicDialogRef);
  private readonly addressStateService = inject(AddressStateService);
  private readonly fb = inject(FormBuilder);
  private readonly addressService = inject(ShippingAddressService);
  private readonly authState = inject(AuthState);
  private readonly translate = inject(TranslateService);
  private readonly toastr = inject(ToastrService);
  isRtl = computed(() => this.translate.getCurrentLang() === 'ar');
  isEdit = computed(() => this.addressStateService.address() !== null);
  steps = signal(1);
  addressForm!: FormGroup;
  address = this.addressStateService.address();
  center: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 };
  zoom = 15;
  markerPosition: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 };
  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
    animation: google.maps.Animation.DROP,
  };
  ngOnInit() {
    this.initForm();
    if (this.isEdit() && this.address) {
      this.addressForm.patchValue(this.address);
      this.center = {
        lat: Number(this.address.lat),
        lng: Number(this.address.long),
      };
      this.markerPosition = this.center;
    }
  }
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const coords = event.latLng.toJSON();
      this.markerPosition = coords;
      this.addressForm.patchValue({ lat: coords.lat, long: coords.lng });
    }
  }
  initForm() {
    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      phone: ['', [Validators.required]],
      lat: [this.address?.lat ?? '30.0444', Validators.required],
      long: [this.address?.long ?? '31.2357', Validators.required],
      username: [this.authState.currentUser()?.firstName, Validators.required],
    });
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.center = coords;
        this.markerPosition = coords;
        this.addressForm.patchValue({ lat: coords.lat, long: coords.lng });
      });
    }
  }
  onNext() {
    if (this.addressForm.valid) {
      this.steps.set(2);
    }
  }

  private normalizePhone(phoneValue: unknown): string {
    if (typeof phoneValue === 'string') {
      return phoneValue;
    }

    const e164 = (phoneValue as { e164Number?: unknown }).e164Number;
    return typeof e164 === 'string' ? e164 : '';
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const addressData = {
        ...this.addressForm.value,
        lat: this.addressForm.get('lat')?.value.toString(),
        long: this.addressForm.get('long')?.value.toString(),
        phone: this.normalizePhone(this.addressForm.get('phone')?.value),
      };

      const action =
        this.isEdit() && this.address
          ? this.addressService.updateAddress(this.address._id, addressData)
          : this.addressService.addAddress(addressData);

      action.subscribe({
        next: () => {
          this.toastr.success(
            this.isEdit()
              ? this.translate.instant('ADDRESS_DIALOG.UPDATE_SUCCESS')
              : this.translate.instant('ADDRESS_DIALOG.ADD_SUCCESS')
          );
          this.ref.close(true);
        },
      });
    }
  }
}
