import { Injectable } from '@angular/core';
import { LogFields } from './log-fields';
import { Logger } from './logger';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private logger: Logger;
  private userId: string;
  constructor(private configService: ConfigService) {

    this.logger = new Logger(this.configService.appName, this.configService.logUrl, this.configService.production);
    this.userId = 'QAMR-Accounts\Nasim.Uddin';

  }

  public initialize() {
    this.logger = new Logger(this.configService.appName, this.configService.logUrl, this.configService.production);
  }

  public logHttpInfo(info: any, elapsedTime: number, requestPath: string) {

    const url = location.href;
    const logFields: LogFields = {
      environment: this.configService.env,
      userId: this.userId,
      requestPath,
      elapsedTime,
      url,
    };

    this.logger.log('Information', `${info}`, logFields);
  }

  public logError(errorMsg: string) {
    const url = location.href;

    const logFields: LogFields = {
      environment: this.configService.env,
      userId: this.userId,
      requestPath: '',
      elapsedTime: 0,
      url: url,
    };

    this.logger.log('Error', errorMsg, logFields);
  }

  public logInfo(info: any) {
    const url = location.href;

    const logFields: LogFields = {
      environment: this.configService.env,
      userId: this.userId,
      requestPath: '',
      elapsedTime: 0,
      url,
    };

    this.logger.log('Information', info, logFields);
  }
}