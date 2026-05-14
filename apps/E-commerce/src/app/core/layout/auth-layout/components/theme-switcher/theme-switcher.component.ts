import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { Theme } from '../../../../enums/theme.enum';

@Component({
    selector: 'app-theme-switcher',
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
    themeService = inject(ThemeService);
    readonly Moon = Moon;
    readonly Sun = Sun;
    readonly Theme = Theme;
}
