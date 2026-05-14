import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseInputComponent } from '../base/base-input.component';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from '../error/input-error.component';
import { SelectModule } from 'primeng/select';
export interface SelectOption {
  label: string;
  value: any;
}
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-select-input',
  imports: [
    LucideAngularModule,
    CommonModule,
    InputErrorComponent,
    TranslatePipe,
    SelectModule,
    FormsModule,
  ],
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent extends BaseInputComponent {
  options = input<SelectOption[]>([]);
  onValueChange(val: any) {
    this.value = val;
    this.onChange(val);
  }
}
