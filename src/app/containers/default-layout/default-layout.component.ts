import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from '../../config/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private auth: AuthService) {

  }

  doLogout() {
    this.auth.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
