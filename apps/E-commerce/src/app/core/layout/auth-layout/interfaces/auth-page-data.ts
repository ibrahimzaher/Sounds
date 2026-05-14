import { Signal } from '@angular/core';

export interface AuthPageData {
    title?: string;
    description?: string;
    footerText?: string;
    footerLinkText?: string;
    footerLinkRoute?: string;
    titleStyle?: 'default' | 'simple';
}

export interface AuthPage {
    authData: Signal<AuthPageData>;
}