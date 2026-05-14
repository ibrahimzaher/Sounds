import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-auth-footer',
    imports: [RouterLink, TranslatePipe],
    templateUrl: './auth-footer.component.html',
})
export class AuthFooterComponent {
    @Input() text!: string;
    @Input() linkText!: string;
    @Input() linkRoute!: string;
}
