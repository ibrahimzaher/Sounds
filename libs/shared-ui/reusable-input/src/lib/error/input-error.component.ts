import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-input-error',
  templateUrl: './input-error.component.html',
  imports: [LucideAngularModule, TranslateModule],
})
export class InputErrorComponent {
  control = input.required<AbstractControl | null | undefined>();
  customType = input<string>('');
  errorId = input<string>('');

  get haveError(): boolean {
    const ctrl = this.control();
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  get errorInfo(): { key: string; params?: any } {
    const errors = this.control()?.errors;
    if (!errors) return { key: '' };

    if (errors['required']) return { key: 'VALIDATION.REQUIRED' };
    if (errors['email']) return { key: 'VALIDATION.EMAIL' };

    if (errors['minlength'])
      return {
        key: 'VALIDATION.MIN_LENGTH',
        params: { length: errors['minlength'].requiredLength },
      };

    if (errors['maxlength'])
      return {
        key: 'VALIDATION.MAX_LENGTH',
        params: { length: errors['maxlength'].requiredLength },
      };

    if (errors['mismatch']) return { key: 'VALIDATION.MISMATCH' };

    if (errors['validatePhoneNumber'] === false)
      return { key: 'VALIDATION.INVALID_PHONE' };

    if (errors['pattern']) {
      return this.customType() === 'password'
        ? { key: 'VALIDATION.PATTERN_PASSWORD' }
        : { key: 'VALIDATION.INVALID' };
    }

    if (errors['strongPassword']) return { key: 'VALIDATION.STRONG_PASSWORD' };

    return { key: 'VALIDATION.INVALID' };
  }
}
