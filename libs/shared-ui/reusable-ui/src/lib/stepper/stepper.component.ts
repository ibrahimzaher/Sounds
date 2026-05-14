import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface StepperStep {
  label: string;
  icon?: string;
}

@Component({
  selector: 'lib-stepper',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stepper.component.html',
})
export class StepperComponent {
  /** Array of step definitions */
  readonly steps = input.required<StepperStep[]>();

  /** Current active step (1-based) */
  readonly currentStep = input.required<number>();

  /** Computed percentage progress between steps */
  readonly progressPercent = computed(() => {
    const total = this.steps().length;
    if (total <= 1) return 100;
    return ((this.currentStep() - 1) / (total - 1)) * 100;
  });
}
