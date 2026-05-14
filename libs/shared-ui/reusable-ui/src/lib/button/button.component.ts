import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-button',
  imports: [LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  readonly Loader2 = Loader2;
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string>('');
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly block = input(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly icon = input<any>(null);
  readonly iconPos = input<'left' | 'right'>('left');
  readonly buttonClick = output<MouseEvent>();

  readonly classes = computed(() => {
    const baseClasses =
      'inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-maroon-500)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';
    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--color-btn-bg)] text-[var(--color-btn-text)] hover:bg-[var(--color-btn-hover)] shadow-md',

      secondary:
        'bg-[var(--color-btn-secondary-bg)] text-[var(--color-btn-secondary-text)] hover:bg-[var(--color-btn-secondary-hover)]',

      outline:
        'border border-[var(--color-btn-outline-border)] bg-transparent text-[var(--color-btn-outline-text)] hover:bg-[var(--color-btn-outline-hover)]',

      ghost:
        'bg-transparent text-[var(--color-btn-ghost-text)] hover:bg-[var(--color-btn-ghost-hover)]',

      link: 'text-[var(--color-btn-bg)] underline-offset-4 hover:underline p-0 h-auto bg-transparent',
      destructive:
        'bg-[var(--color-btn-destructive-bg)] text-[var(--color-btn-destructive-text)] hover:bg-[var(--color-btn-destructive-hover)] shadow-sm focus-visible:ring-red-500',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-11 px-8 text-base',
    };

    return [
      baseClasses,
      variants[this.variant()],
      sizes[this.size()],
      this.block() ? 'w-full' : '',
      this.disabled() || this.loading() ? 'opacity-50 cursor-not-allowed' : '',
    ].join(' ');
  });

  onClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.buttonClick.emit(event);
  }
}
