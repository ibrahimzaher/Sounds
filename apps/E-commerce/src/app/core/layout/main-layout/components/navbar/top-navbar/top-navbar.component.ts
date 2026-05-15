import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthRepo, AuthState } from '@elevate/auth-domain';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { take, tap } from 'rxjs';
import { languageService } from '../../../../../services/language-service';
import { LanguageSwitcherComponent } from '../../../../auth-layout/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../../../auth-layout/components/theme-switcher/theme-switcher.component';
import { CartService } from '../../../../../../../app/feature/cart/services/cart.service';
import { ShippingAddress } from '../../../../../../../app/feature/shipping-address/interfaces/shipping-address.interface';
import { ShippingAddressService } from '../../../../../../../app/feature/shipping-address/services/shipping-address.service';
import { AddressUiService } from '../../../../../../shared/components/ui/dialogs/address-dialog/services/address-ui.service';
import { WishlistService } from '../../../../../../shared/services/wishlist.service';
import { NavbarSearchComponent } from '../navbar-search/navbar-search.component';

@Component({
  selector: 'app-top-navbar',
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    DividerModule,
    LanguageSwitcherComponent,
    TranslatePipe,
    MenuModule,
    ThemeSwitcherComponent,
    NavbarSearchComponent,
  ],
  templateUrl: './top-navbar.component.html',
})
export class TopNavbarComponent {
  private readonly authState = inject(AuthState);
  private readonly authRepo = inject(AuthRepo);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(languageService);
  private readonly cartService = inject(CartService);
  private readonly shippingAddressService = inject(ShippingAddressService);
  private readonly addressUiService = inject(AddressUiService);
  private readonly toastrService = inject(ToastrService);

  readonly cartCount = computed(() => this.cartService.cartCount());
  readonly wishlistService = inject(WishlistService);
  readonly user = this.authState.currentUser;
  readonly primaryAddress = signal<ShippingAddress | null>(null);
  readonly router = inject(Router);
  readonly deliveryAddressText = computed(() => {
    this.language.currentLang();

    const address = this.primaryAddress();
    const city = address?.city?.trim();

    if (!city) {
      return this.translate.instant('NAVBAR.ADD_ADDRESS');
    }

    return city;
  });

  constructor() {
    effect(() => {
      const user = this.user();

      if (!user) {
        this.primaryAddress.set(null);
        return;
      }

      this.loadPrimaryAddress();
      this.wishlistService.loadWishlist().pipe(take(1)).subscribe();
    });
  }

  readonly items = computed<MenuItem[]>(() => {
    this.language.currentLang();

    const user = this.user();
    if (!user) return [];

    return [
      {
        label: `<span class="truncate block max-w-[200px]" title="${user.firstName}">${user.firstName}</span>`,
        escape: false,
        styleClass: 'max-w-[220px]',
        items: [
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.PROFILE'),
            icon: 'pi pi-user',
            routerLink: '/profile',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.ADDRESSES'),
            icon: 'pi pi-map-marker',
            command: () => {
              this.openAddressManager();
            },
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.ORDERS'),
            icon: 'pi pi-shopping-cart',
            routerLink: '/allOrders',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.DASHBOARD'),
            icon: 'pi pi-chart-bar',
            routerLink: '/dashboard',
          },
          {
            label: this.translate.instant('NAVBAR.ACCOUNT_MENU.LOGOUT'),
            icon: 'pi pi-sign-out',
            command: () => {
              this.authRepo
                .logout()
                .pipe(
                  tap(() => {
                    this.cartService.setDefaultCart();
                    this.wishlistService.clearWishlist();
                    this.router.navigate(['/']);
                  }),
                  take(1)
                )
                .subscribe();
            },
          },
        ],
      },
    ];
  });

  private loadPrimaryAddress() {
    this.shippingAddressService
      .getLoggedUserAddress()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          const [firstAddress] = response.addresses ?? response.address ?? [];
          this.primaryAddress.set(firstAddress ?? null);
        },
      });
  }

  openAddressManager() {
    this.addressUiService
      .openAddressManager('view', this.primaryAddress() ?? undefined)
      ?.onClose.pipe(take(1))
      .subscribe(() => {
        if (this.user()) {
          this.loadPrimaryAddress();
        }
      });
  }

  navigateToCart(event: Event) {
    if (!this.user()) {
      event.preventDefault();
      this.toastrService.error(
        this.translate.instant('NAVBAR.CART.LOGIN_TO_ACCESS')
      );
    }
  }

  navigateToWishlist(event: Event) {
    if (!this.user()) {
      event.preventDefault();
      this.toastrService.error(
        this.translate.instant('NAVBAR.WISHLIST.LOGIN_TO_ACCESS')
      );
    }
  }
}
