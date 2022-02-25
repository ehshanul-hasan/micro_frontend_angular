import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public config: any = '';
    public env: any = '';
    public logUrl: any = '';
    public apiUrl: any = '';
    public appName: any = '';
    public production: boolean = false;

    constructor() { }

    public getConfig(key: string): string {
        return this.config[key];
    }

    public getEnv(key: string): string {
        return this.env[key];
    }

}