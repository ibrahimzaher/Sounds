import { Component, signal, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthSeparatorComponent } from './components/auth-separator/auth-separator.component';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { AuthTitleComponent } from './components/auth-title/auth-title.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthPage, AuthPageData } from './interfaces/auth-page-data';

@Component({
  selector: 'app-auth-layout',
  imports: [CommonModule, RouterOutlet, AuthSeparatorComponent, AuthBackgroundComponent, LanguageSwitcherComponent, ThemeSwitcherComponent, AuthTitleComponent, AuthFooterComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {
  activeComponent = signal<AuthPage | null>(null);
  currentPageData = computed<AuthPageData>(() => this.activeComponent()?.authData() ?? {});

  private pendingComponent = signal<AuthPage | null>(null);

  constructor() {
    effect(() => {
      const component = this.pendingComponent();
      if (component) {
        this.activeComponent.set(component);
        this.pendingComponent.set(null);
      }
    });
  }

  onActivate(component: unknown) {
    if (this.isAuthPage(component)) {
      this.pendingComponent.set(component);
    }
  }

  private isAuthPage(component: unknown): component is AuthPage {
    return (component as AuthPage).authData !== undefined;
  }
}