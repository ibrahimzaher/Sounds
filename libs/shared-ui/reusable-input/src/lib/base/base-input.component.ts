import { Component, computed, inject, input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'lib-base-input',
  imports: [],
  template: '',
})
export abstract class BaseInputComponent implements ControlValueAccessor {
  ngControl = inject(NgControl, { optional: true, self: true });
  private readonly generatedId = `field-${Math.random().toString(36).slice(2, 10)}`;
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  icon = input<string>('');
  readonly inputId = computed(() => {
    const explicitId = this.id().trim();
    if (explicitId) return explicitId;

    const normalizedLabel = this.label()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return normalizedLabel
      ? `${normalizedLabel}-${this.generatedId}`
      : this.generatedId;
  });
  readonly errorId = computed(() => `${this.inputId()}-error`);
  isDisabled = false;
  value: any = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (val: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  get control() {
    return this.ngControl?.control;
  }
  get Invalid(): boolean {
    return !!(this.control?.touched && this.control?.invalid);
  }

  get describedBy(): string | null {
    return this.Invalid ? this.errorId() : null;
  }
}
