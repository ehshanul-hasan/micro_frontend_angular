import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from '@ClientApp/shared/app-logger';
import { ErrorService } from '@ClientApp/shared/app-logger';
import { NotificationService } from '@ClientApp/shared/app-logger';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LogService);
    const notifier = this.injector.get(NotificationService);

    let message: string | undefined;
    if (error instanceof HttpErrorResponse) {

      message = errorService.getServerErrorMessage(error);

      notifier.showError(message);
    }
    else {

      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }

    StackTrace.fromError(error).then((stackframes : any) => {
      const stackString = stackframes
        .splice(0, 10)
        .map(function(sf : any) {
          return sf.toString();
        })
        .toString();
      
      const errorTraceStr = `Error message: ${message}. Stack trace: ${stackString}`;

      logger.logError(errorTraceStr);
    });
  }
}