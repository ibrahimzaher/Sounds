import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactInfoCardComponent } from './components/contact-info-card/contact-info-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactInfoItem } from './interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    TranslatePipe,
    ContactInfoCardComponent,
    ContactFormComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly contactInfoItems: ReadonlyArray<ContactInfoItem> = [
    {
      icon: 'mail',
      titleKey: 'CONTACT_PAGE.CARDS.EMAIL.TITLE',
      valueKey: 'CONTACT_PAGE.CARDS.EMAIL.VALUE',
      hrefPrefix: 'mailto:',
      forceLtr: true,
    },
    {
      icon: 'phone',
      titleKey: 'CONTACT_PAGE.CARDS.PHONE.TITLE',
      valueKey: 'CONTACT_PAGE.CARDS.PHONE.VALUE',
      hrefPrefix: 'tel:',
      forceLtr: true,
    },
    {
      icon: 'clock-3',
      titleKey: 'CONTACT_PAGE.CARDS.HOURS.TITLE',
      valueKey: 'CONTACT_PAGE.CARDS.HOURS.VALUE',
    },
  ];
}
