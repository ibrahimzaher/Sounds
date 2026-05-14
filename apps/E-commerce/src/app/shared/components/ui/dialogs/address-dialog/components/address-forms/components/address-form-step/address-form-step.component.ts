import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  PhoneInputComponent,
  TextareaInputComponent,
  TextInputComponent,
} from '@elevate/reusable-input';
import { ButtonComponent } from '@elevate/reusable-ui';

@Component({
  selector: 'app-address-form-step',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    PhoneInputComponent,
    TextareaInputComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './address-form-step.component.html',
})
export class AddressFormStepComponent {
  form = input.required<FormGroup>();
  next = output<void>();

  onNext() {
    this.next.emit();
  }
}
