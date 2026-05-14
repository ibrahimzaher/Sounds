import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BaseInputComponent } from '../base/base-input.component';
import { InputErrorComponent } from '../error/input-error.component';
@Component({
  selector: 'lib-phone-input',
  imports: [
    LucideAngularModule,
    CommonModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    InputErrorComponent,
  ],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.css',
})
export class PhoneInputComponent extends BaseInputComponent {
  get formField(): FormControl {
    return (this.control as FormControl) || new FormControl();
  }
}
