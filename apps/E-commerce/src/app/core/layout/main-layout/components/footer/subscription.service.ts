import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionReq, SubscriptionRes } from './subscription.model';
import { environment } from '../../../../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.baseUrl;

    subscribeToNewsletter(payload: SubscriptionReq): Observable<SubscriptionRes> {
        return this.http.post<SubscriptionRes>(`${this.baseUrl}/subscriptions/subscribe`, payload);
    }
}
