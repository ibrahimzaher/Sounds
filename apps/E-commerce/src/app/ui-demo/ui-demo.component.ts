import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  LogOut,
  ChevronRight,
  Mail,
} from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
  LableComponent,
  ErrorComponent,
} from '@elevate/reusable-ui';
@Component({
  selector: 'app-ui-demo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    LableComponent,
    ErrorComponent,
    LucideAngularModule,
  ],
  templateUrl: './ui-demo.component.html',
})
export class UiDemoComponent {
  readonly LogOut = LogOut;
  readonly ChevronRight = ChevronRight;
  readonly Mail = Mail;

  onButtonClick(event: MouseEvent) {
    console.log('Button clicked!', event);
  }
}
