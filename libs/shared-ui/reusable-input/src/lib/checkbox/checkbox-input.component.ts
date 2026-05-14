import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseInputComponent } from '../base/base-input.component';
import { LucideAngularModule } from 'lucide-angular';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-checkbox-input',
  imports: [CommonModule, LucideAngularModule, InputErrorComponent],
  templateUrl: './checkbox-input.component.html',
})
export class CheckboxInputComponent extends BaseInputComponent {
  toggle() {
    if (this.isDisabled) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
