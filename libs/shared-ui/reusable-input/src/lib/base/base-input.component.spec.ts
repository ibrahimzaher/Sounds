import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseInputComponent } from './base-input.component';

describe('BaseInputComponent', () => {
  let component: BaseInputComponent;
  let fixture: ComponentFixture<BaseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInputComponent],
    }).compileComponents();
  });
});
