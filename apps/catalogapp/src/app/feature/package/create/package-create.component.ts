import { Component, Injector } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FormComponent } from "@ClientApp/shared/common";
import { BooleanInput } from "ng-zorro-antd/core/types";
import { PackageHttpService } from "../../../services/package.service";

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.css']
})
export class PackageCreateComponent extends FormComponent {

  public loader: BooleanInput = false;
  public title: string = '';

  constructor(injector: Injector, private packageHttpService: PackageHttpService, private activatedRoute: ActivatedRoute) {
    super(injector);
  }

  public override ngOnInit(): void {

    this.initControl();
  }

  public initControl(): void {
    this.onCheckMode = id => this.get(id);
    this.createForm({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      cost: [0.0, [Validators.required]],
    });
    super.ngOnInit(this.activatedRoute.snapshot);
    this.title = this.mode == "edit" ? "Update Package" : "Add Package";
  }

  public submit(): void {
    const body = this.constructObject(this.form.controls);
    this.submitForm(
      {
        request: this.packageHttpService.add(body),
        succeed: res => {
          this.cancel();
          this.success("Created succesfully.");
        }
      },
      {
        request: this.packageHttpService.update(this.id, body),
        succeed: res => {
          this.cancel();
          this.success("Updated Successfully.");
        }
      }
    );
  }

  public get(id: number) {
    if (id != null) {
      this.subscribe(this.packageHttpService.getById(id),
        (res: any) => {
          this.setValues(this.form.controls, res.data);
          //this.loading = false;
        }
      );
    }
    else {
      //this.loading = false;
    }
  }

  public cancel() {
    this.goTo('catalog/package');
  }

}