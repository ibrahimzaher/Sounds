import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavbarComponent } from './components/navbar/top-navbar/top-navbar.component';
import { MainNavbarComponent } from './components/navbar/main-navbar/main-navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, TopNavbarComponent, MainNavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
