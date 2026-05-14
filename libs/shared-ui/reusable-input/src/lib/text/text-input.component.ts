import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { BaseInputComponent } from '../base/base-input.component';
import { InputErrorComponent } from '../error/input-error.component';

@Component({
  selector: 'lib-text-input',
  imports: [LucideAngularModule, InputErrorComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent extends BaseInputComponent {
  type = input<'text' | 'password' | 'email'>('text');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((val) => !val);
  }
}
