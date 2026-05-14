import { languageService } from './../../../../core/services/language-service';
import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Banknote,
  CreditCard,
  ChevronLeft,
  Check,
} from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@elevate/reusable-ui';
import { PaymentMethod } from '../../interfaces/checkout.interface';

@Component({
  selector: 'app-payment-method-section',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TranslateModule,
    ButtonComponent,
  ],
  providers: [
    {
      provide: LucideAngularModule,
      useValue: LucideAngularModule.pick({
        Banknote,
        CreditCard,
        ChevronLeft,
        Check,
      }),
    },
  ],
  templateUrl: './payment-method.component.html',
})
export class PaymentMethodSectionComponent {
  isLoading = input<boolean>(false);
  private readonly LanguageService = inject(languageService);
  readonly isRtl = computed(() => this.LanguageService.isRTL());
  methodSelected = output<PaymentMethod>();
  back = output<void>();
  checkout = output<void>();

  selectedMethod = signal<PaymentMethod>('card');

  selectMethod(method: PaymentMethod) {
    this.selectedMethod.set(method);
    this.methodSelected.emit(method);
  }

  onBack() {
    this.back.emit();
  }

  onCheckout() {
    this.checkout.emit();
  }
}
