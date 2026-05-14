import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'apps/E-commerce/src/environments/environments';
import { Observable, shareReplay } from 'rxjs';
import { homeApiRes } from '../interfaces/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  private homeData$?: Observable<homeApiRes>;

  getHomeData(): Observable<homeApiRes> {
    if (!this.homeData$) {
      this.homeData$ = this.http.get<homeApiRes>(`${this.baseUrl}/home`).pipe(
        shareReplay(1),
      );
    }
    return this.homeData$;
  }
}
