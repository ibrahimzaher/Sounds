import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-auth-separator',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './auth-separator.component.html',
})
export class AuthSeparatorComponent {
  @Input() orientation: 'top' | 'bottom' = 'top';
}