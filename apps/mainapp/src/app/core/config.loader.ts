import { HttpClient } from "@angular/common/http";
import { catchError, map, throwError } from "rxjs";
import { ConfigService } from "@ClientApp/shared/app-logger";
import { environment } from "../../environments/environment";

export function configLoader(http: HttpClient, configService: ConfigService): (() => Promise<boolean>) {

    return (): Promise<boolean> => {

        return new Promise<boolean>(resolve => {

            http.get('/assets/env.json').pipe(map(res => res), catchError((error: any): any => {

                console.log('Configuration file "env.json" could not be read');

                resolve(true);

                return throwError(() => new Error(error));

            })).subscribe((envResponse: any) => {

                configService.logUrl = envResponse.logUrl;
                configService.apiUrl = envResponse.apiUrl;
                configService.env = envResponse.Env;
                configService.appName=envResponse.appName;
                configService.production=environment.production;

                let request: any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = http.get('/assets/config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = http.get('/assets/config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .pipe(map(res => res),
                            catchError((error: any) => {
                                console.error('Error reading ' + envResponse.env + ' configuration file');
                                resolve(error);
                                return throwError(() => new Error(error));
                            }))
                        .subscribe((responseData: any) => {
                            
                            configService.config = responseData;
                            resolve(true);
                        });
                }
                else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });
        });
    };
}
