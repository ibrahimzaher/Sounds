import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ClickOutsideDirective } from '../../../../../utils/click-outside.directive';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterModule, TranslatePipe, ClickOutsideDirective],
  templateUrl: './main-navbar.component.html',
})
export class MainNavbarComponent {
  isMenuOpen = signal(false);
  readonly mobileMenuId = 'primary-mobile-menu';

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
  readonly navStyles = {
    desktopLink:
      'flex items-center h-full px-5 text-white dark:text-zinc-800 no-underline transition-colors duration-200 hover:text-soft-pink-200 dark:hover:text-maroon-800 group border-b-2 border-transparent',
    desktopActive:
      'text-soft-pink-200! border-soft-pink-200! dark:text-maroon-800! dark:border-maroon-800!',

    mobileLink:
      'flex items-center w-full px-4 py-3 mt-1 text-white no-underline hover:bg-maroon-800 dark:hover:bg-soft-pink-700 rounded-md transition-all',
    mobileActive: 'dark:bg-soft-pink-700 bg-maroon-800  text-soft-pink-200!',
  };
  items = [
    { label: 'NAVBAR.HOME', icon: 'pi pi-home', routerLink: '/home' },
    {
      label: 'NAVBAR.PRODUCTS',
      icon: 'pi pi-box',
      routerLink: '/products',
      exact: false,
    },
    {
      label: 'NAVBAR.CATEGORIES',
      icon: 'pi pi-list',
      routerLink: '/categories',
    },
    {
      label: 'NAVBAR.OCCASIONS',
      icon: 'pi pi-calendar',
      routerLink: '/occasions',
    },
    { label: 'NAVBAR.CONTACT', icon: 'pi pi-envelope', routerLink: '/contact' },
    {
      label: 'NAVBAR.ABOUT_US',
      icon: 'pi pi-info-circle',
      routerLink: '/about-us',
    },
  ];
}
