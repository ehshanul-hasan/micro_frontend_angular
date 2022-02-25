import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseComponent } from './base.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Component, Injector } from '@angular/core';


@Component({
    selector: 'app-form-base',
    template: `
      <p>
        form base works!
      </p>
    `,
    styles: [
    ]
})
export class FormComponent extends BaseComponent {

    public mode: string = "add";
    public submitButtonText: string = "";
    public form!: FormGroup;
    public id!: number;
    public submitting: boolean = false;

    public onCheckMode!: (id: number) => void;
    public onUpdate!: (id: number) => Observable<Object>;
    public onCreate!: () => Observable<Object>;
    public onFail!: (err: any) => void;
    public onSuccess!: (data: any) => void;

    public fb: FormBuilder;
    private static ADD = "add";
    private static EDIT = "edit";

    constructor(injector: Injector) {
        super(injector);
        this.fb = injector.get(FormBuilder);
    }

    public ngOnInit(snapshot: ActivatedRouteSnapshot) {
        this.snapshot(snapshot);
        this.checkMode(this.onCheckMode);
    }

    public update(options: IRequestOptions): void {
        if (this.isEditMode()) {
            this.validateForm(() => {
                if (options && options.request) {
                    this.submitting = true;
                    const mid = this.messageService.loading('saving data ...', { nzDuration: 0 }).messageId;
                    this.subscribe(options.request,
                        (s: any) => {
                            this.messageService.remove(mid);
                            this.submitting = false;
                            this.invoke(this.onSuccess, s);
                            this.invoke(options.succeed, s);
                        },
                        e => {
                            this.messageService.remove(mid);
                            this.submitting = false;
                            this.invoke(this.onFail, e);
                            this.invoke(options.failed, e);
                            this.bindServerValidationErrorsWithFormControls(e);
                        }
                    );
                }
            });
        }
    }

    public create(options: IRequestOptions): void {
        if (this.isAddMode()) {
            this.validateForm(() => {
                if (options && options.request) {
                    this.submitting = true;
                    const mid = this.messageService.loading('saving data ...', { nzDuration: 0 }).messageId;
                    this.subscribe(options.request,
                        s => {
                            this.messageService.remove(mid);
                            this.submitting = false;
                            this.invoke(this.onSuccess, s);
                            this.invoke(options.succeed, s);
                        },
                        e => {
                            this.messageService.remove(mid);
                            this.submitting = false;
                            this.invoke(this.onFail, e);
                            this.invoke(options.failed, e);
                            this.bindServerValidationErrorsWithFormControls(e);
                        }
                    );
                }
            });
        }
    }

    public markModeAsAdd(): void {
        this.mode = FormComponent.ADD;
        this.submitButtonText = 'create';
    }

    public isAddMode(): boolean {
        return this.mode == FormComponent.ADD;
    }

    public isEditMode(): boolean {
        return this.mode == FormComponent.EDIT
    }

    public markModeAsEdit(): void {
        this.mode = FormComponent.EDIT;
        this.submitButtonText = "update";
    }

    public checkMode(fn: (id: number) => void, paramKey: string = 'id'): void {
        this.id = this.getQueryParams(paramKey);
        if (this.id) {
            this.markModeAsEdit();
            this.invoke(fn, this.id);
        } else {
            this.invoke(fn, null);
            this.markModeAsAdd();
        }
    }

    public createForm(controlsConfig: { [key: string]: any; }): void {
        this.form = this.fb.group(controlsConfig);
    }

    public validateForm(fn?: () => void) {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        if (this.form.valid) {
            this.invoke(fn);
        }
        return this.form.valid;
    }

    public submitForm(createOptions: IRequestOptions, updateOptions: IRequestOptions) {
        if (this.isAddMode()) {
            this.create(createOptions);
        }
        else if (this.isEditMode()) {
            this.update(updateOptions);
        }
    }

    public setValue(controlName: string, value: any): void {
        if (this.form.controls[controlName]) {
            this.form.controls[controlName].setValue(value);
        }
    }

    public bindServerValidationErrorsWithFormControls(e: any) {
        if (e.error && e.error.message == "form_error") {
            let obj = this.form.controls;
            let fn = (k: any, v: any) => {
                const data = e.error.data.filter((x: { field: string; }) => x.field.toLowerCase() == k.toLowerCase());
                if (data && data.length > 0) {
                    const err = { message: data[data.length - 1].message }
                    v.setErrors(err);
                }

                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        this.invoke(fn, key, value);
                    }
                }

            }
        }
    }

}

export interface IRequestOptions {
    request: Observable<Object>;
    succeed?: (data: any) => void;
    failed?: (err: any) => void;
}
