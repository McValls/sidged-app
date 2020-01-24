import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { SharingDataService } from '../services/local-storage/sharing-data.service';
import { UserType } from '../model/user-type';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarOpen = false;
  hide = false;
  type: UserType;

  menuHref: string;
  loginHref: string;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  navigateBack(event) {
    event.preventDefault();
    this.location.back();
  }

  constructor(
    private router: Router, 
    private location: Location,
    private sharingDataService: SharingDataService) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (event.url.indexOf("/login") === -1) {
            this.hide = false;
          } else {
            this.hide = true;
          }
          let loggedUser = this.sharingDataService.getLoggedUser();
          if(loggedUser != null) {
            this.type = loggedUser.userType;
            this.menuHref = this.type == UserType.STUDENT? "/menu-student" : "/menu-teacher";
            this.loginHref = "/login";
          }
        }
      })
  }

  ngOnInit() {}

}
