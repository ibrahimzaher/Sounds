import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidationsUtils {
  static passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  static matchFieldsValidator(
    field: string,
    confirmField: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(field);
      const confirmControl = group.get(confirmField);

      if (!control || !confirmControl) return null;

      if (confirmControl.errors && !confirmControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({
          ...confirmControl.errors,
          mismatch: true,
        });
        return { mismatch: true };
      }

      const errors = confirmControl.errors;
      if (errors) {
        delete errors['mismatch'];
        confirmControl.setErrors(Object.keys(errors).length ? errors : null);
      }

      return null;
    };
  }
}
