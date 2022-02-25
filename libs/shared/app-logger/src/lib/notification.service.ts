import { Injectable, NgZone } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

  constructor(
    private message: NzMessageService,
    private zone: NgZone) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.message.success(message, { nzDuration: 2500 });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      this.message.error(message, { nzDuration: 2500 });
    });
  }
}