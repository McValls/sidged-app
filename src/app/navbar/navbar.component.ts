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
  changePasswordHref: string;

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
          if(this.notNavbarPaths(event, ["/", "/login", "/recovery-password"])) {
            this.hide = true;
          } else {
            this.hide = false;
          }
          let loggedUser = this.sharingDataService.getLoggedUser();
          if(loggedUser != null) {
            this.type = loggedUser.userType;
            this.menuHref = this.type == UserType.STUDENT? "/menu-student" : "/menu-teacher";
            this.loginHref = "/login";
            this.changePasswordHref = "/change-password";
          }
        }
      })
  }

  private notNavbarPaths(event: NavigationStart, urls: string[]): boolean {
    let invalidPath: boolean = false;
    urls.forEach(url => {
      if(event.url === url) {
        invalidPath = true;
      }
    });
    return invalidPath;
    
  }

  ngOnInit() {}

}
