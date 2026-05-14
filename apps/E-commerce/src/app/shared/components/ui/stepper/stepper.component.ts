import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
})
export class StepperComponent {
  totalSteps = input.required<number>();
  currentStep = input.required<number>();

  completedClass = input('bg-maroon-700 text-white shadow-maroon-200');
  pendingClass = input(
    'bg-zinc-200 text-zinc-500 dark:bg-zinc-600 dark:text-zinc-300'
  );

  readonly stepNumbers = computed(() =>
    Array.from(
      { length: Math.max(this.totalSteps(), 1) },
      (_, index) => index + 1
    )
  );

  readonly isTwoSteps = computed(() => this.totalSteps() === 2);

  readonly progressWidth = computed(() => {
    const total = Math.max(this.totalSteps(), 1);
    const current = Math.min(Math.max(this.currentStep(), 0), total);

    if (total === 1) {
      return 100;
    }

    if (total === 2) {
      return (current / total) * 100;
    }

    return ((current - 1) / (total - 1)) * 100;
  });
}
