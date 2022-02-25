import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  public current_nav_menu: string = 'CATALOG';

  constructor() {
  }
  
  ngOnInit(): void {
  }

  setCurrentNavMenu(CurrentNavMenu: any) {
    this.current_nav_menu = CurrentNavMenu;
  }

}


