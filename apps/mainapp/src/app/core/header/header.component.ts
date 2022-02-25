import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clientui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nav_menus : any[] = [];
  public routes: any[] = [];

  @Output() onMenuItemChange = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    Object.values(Menu_Title_With_Route).forEach(value => {
      this.nav_menus.push(value.toUpperCase())
      this.routes.push(value)
    });
  }

  onMenuItemClick(i : number) {

    this.onMenuItemChange.emit(this.nav_menus[i]);
    this.router.navigateByUrl(this.routes[i]);
  }

}

enum Menu_Title_With_Route {
  CORE = 'catalog',
  ADMIN = 'reservation',
}
