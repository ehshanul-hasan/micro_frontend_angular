import { Subscription, Observable } from 'rxjs';
import { Router, NavigationExtras, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Component, Injector } from '@angular/core';
import { NotificationService } from '@ClientApp/shared/app-logger';
import { FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-base',
    template: `
      <p>
        base works!
      </p>
    `,
    styles: [
    ]
})
export class BaseComponent {

    private subscriptions: Subscription[];
    private router: Router;
    private notifier: any;
    public messageService: NzMessageService;
    
    protected activatedRouteSnapshot: any;

    constructor(injector: Injector) {
        this.subscriptions = [];
        this.router = injector.get(Router);
        this.notifier = injector.get(NotificationService);
        this.messageService = injector.get(NzMessageService);
    }

    public subscribe<T>(
        observable: Observable<T>,
        next: (value: T) => void,
        error?: (error: void) => void,
        complete?: () => void): void {
        const subscription = observable.subscribe({
            next: (v) => this.invoke(next, v),
            error: (e) => {
                this.invoke(error, e);
                this.invoke(complete);
                this.handleError(e);
            },
            complete: () => {
                this.invoke(complete);
            }
        })
        this.subscriptions.push(subscription);
    }

    public unsubscribe() {
        this.subscriptions.forEach(s => {
            s.unsubscribe();
        });
    }

    public goTo(url: string | UrlTree, extras?: NavigationExtras) {
        this.router.navigateByUrl(url, extras)
    }

    public invoke(fn?: Function, ...args: any[]) {
        if (fn) fn(...args);
    }

    public handleError(error: any) {
        console.log(error);
    }

    public getQueryParams(name: string) {
        return this.activatedRouteSnapshot.queryParams[name] || this.activatedRouteSnapshot.params[name];
    }

    public constructObject(controls: any) {
        const obj: any = {}
        for (const key in controls) {
            if (controls.hasOwnProperty(key)) {
                const control = controls[key];
                const value = control.value;
                if (value !== null && value !== undefined) {
                    obj[key] = control.value;
                }
            }
        }
        return obj;
    }

    setValues(controls : any, res : any, ignoreControls : any[] = []) {
        for (const key in res) {
            if (!ignoreControls.includes(key) && res.hasOwnProperty(key)) {
                const control = controls[key];
                if (control) {
                    const value = res[key];
                    if (Array.isArray(value)) {
                        control.setValue(value.map(x => x.id));
                    }
                    else if (typeof (value) === 'object') {
                        control.setValue(value?.id);
                    }
                    else {
                        control.setValue(value);
                    }
                }
            }
        }
    }

    public error(message: string) {
        this.messageService.error(message);
    }

    public success(message: string) {
        this.messageService.success(message);
    }

    public failed(message: string) {
        this.messageService.error(message);
    }

    public warning(message: string) {
        this.messageService.warning(message);
    }

    public info(message: string) {
        this.messageService.info(message);
    }

    public snapshot(snapshot: ActivatedRouteSnapshot) {
        this.activatedRouteSnapshot = snapshot;
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

}