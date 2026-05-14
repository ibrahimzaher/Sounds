import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { heroBannerConfig } from '../../../../interfaces/home';

@Component({
  selector: 'app-bottom-banner',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './bottom-banner.component.html'
})
export class BottomBannerComponent {
  @Input({ required: true }) banner!: heroBannerConfig;
}
