import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-auth-background',
  imports: [NgOptimizedImage],
  templateUrl: './auth-background.component.html',
  host: { class: 'block h-full w-full' }
})
export class AuthBackgroundComponent { }