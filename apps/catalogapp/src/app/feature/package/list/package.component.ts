import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@ClientApp/shared/common';
import { BooleanInput } from 'ng-zorro-antd/core/types/public-api';
import { PackageHttpService } from '../../../services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent extends BaseComponent {

  public loading : BooleanInput = false;
  public packages : any[] = [];

  constructor( injector: Injector, private packageHttpService : PackageHttpService) {
    super(injector);
  }

  ngOnInit(): void {
   this.list();
  } 
  
  list() {
    this.loading = true;
    this.subscribe(this.packageHttpService.get({}),
        (res: any) => {
          this.packages = res.data;
          this.loading = false;
        },
        err => {
          this.loading = false;
        }
      );
  }

  create(id : any) {
    if(id > 0)
    this.goTo('catalog/package/edit/' + id);
    else
    this.goTo('catalog/package/create');
  }

  details(id: number) {
    this.goTo('catalog/package/details/' + id);
  }

  delete(id: number) {
    this.subscribe(this.packageHttpService.delete(id),
        (res: any) => {
          this.success("Deleted succesfully.");
          this.list();
        }
      );
  }

}



