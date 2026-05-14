import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'lib-lable',
  imports: [],
  template: '<ng-content></ng-content>',
  templateUrl: './lable.component.html',
  styleUrl: './lable.component.css',
  host: {
    '[class]': 'computedClass()',
  },
})
export class LableComponent {
  readonly class = input<string>('');

  readonly computedClass = computed(() => {
    return (
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--color-text-body)] ' +
      this.class()
    );
  });
}
