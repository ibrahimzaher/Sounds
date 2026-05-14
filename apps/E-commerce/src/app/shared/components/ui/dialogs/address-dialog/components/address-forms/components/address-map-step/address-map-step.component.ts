import { Component, input, output } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';

@Component({
  selector: 'app-address-map-step',
  imports: [GoogleMapsModule, TranslateModule, ButtonComponent],
  templateUrl: './address-map-step.component.html',
})
export class AddressMapStepComponent {
  center = input.required<google.maps.LatLngLiteral>();
  zoom = input.required<number>();
  markerPosition = input.required<google.maps.LatLngLiteral>();
  markerOptions = input.required<google.maps.MarkerOptions>();
  isEdit = input.required<boolean>();
  isRtl = input.required<boolean>();

  back = output<void>();
  mapClicked = output<google.maps.MapMouseEvent>();
  findLocation = output<void>();
  submitted = output<void>();

  onBack() {
    this.back.emit();
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    this.mapClicked.emit(event);
  }

  onFindLocation() {
    this.findLocation.emit();
  }

  onSubmit() {
    this.submitted.emit();
  }
}
