import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-tittle',
  imports: [],
  templateUrl: './header-tittle.html',
  styleUrl: './header-tittle.css'
})
export class HeaderTittle {
  title = input.required<string>();
}
