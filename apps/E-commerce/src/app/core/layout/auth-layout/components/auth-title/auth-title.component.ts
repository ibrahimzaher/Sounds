import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-auth-title',
    imports: [TranslatePipe],
    templateUrl: './auth-title.component.html',
})
export class AuthTitleComponent {
    @Input() title!: string;
    @Input() style: 'default' | 'simple' = 'default';
    @Input() description = '';
}
