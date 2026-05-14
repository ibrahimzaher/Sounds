import { Component, input } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { BaseInputComponent } from '../base/base-input.component';
import { LucideAngularModule } from 'lucide-angular';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-otp-input',
  imports: [NgOtpInputModule, LucideAngularModule, InputErrorComponent],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.css',
})
export class OtpInputComponent extends BaseInputComponent {
  length = input<number>(6);

  onOtpChange(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  get config() {
    return {
      length: this.length(),
      allowNumbersOnly: true,
      inputClass: 'otp-input-style',
      containerClass: 'otp-container',
    };
  }
}
