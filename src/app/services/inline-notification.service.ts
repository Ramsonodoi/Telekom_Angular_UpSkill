import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InlineNotification } from '../inlineNotification';

@Injectable({
  providedIn: 'root',
})
export class InlineNotificationService {
  private notificationSubject = new BehaviorSubject<InlineNotification>({
    show: false,
    type: '',
    text: '',
  });

  notification$ = this.notificationSubject.asObservable();

  showNotification(type: string, text: string): void {
    this.notificationSubject.next({
      show: true,
      type,
      text,
    });
  }
}
