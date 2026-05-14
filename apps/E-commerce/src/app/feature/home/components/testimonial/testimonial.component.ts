import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environments';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import {
  Testimonial,
  TestimonialResponse,
} from './interfaces/testimonial.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-testimonial',
  imports: [DatePipe, HeadingTitleComponent, TranslatePipe],
  templateUrl: './testimonial.component.html',
})
export class TestimonialComponent implements OnInit {
  testimonials = signal<Testimonial[]>([]);
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  readonly stars = [1, 2, 3, 4, 5];
  isLoading = signal(false);
  ngOnInit(): void {
    this.getTestimonials();
  }
  private getTestimonials(): void {
    this.isLoading.set(true);
    this.httpClient
      .get<TestimonialResponse>(environment.baseUrl + '/testimonials')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (data: TestimonialResponse) => {
          this.testimonials.set(data.testimonials ?? []);
        }
      });
  }
}
