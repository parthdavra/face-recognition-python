import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from 'app/shared/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private sidebarVisible: boolean;

  constructor(location: Location, private storageService: StorageService, private element: ElementRef, private router: Router) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.router.events.subscribe((event) => {
      this.sidebarClose();

    });
  }

  sidebarOpen() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('layout-menu-expanded');
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('layout-menu-expanded');
  };
  sidebarToggle() {
    var $toggle = document.getElementsByClassName('layout-menu-toggle')[0];
    this.sidebarOpen();
  };

  logout() {
    this.storageService.removeValue('token');
    this.storageService.removeValue('userId');
    this.storageService.removeValue('isLogin');
    this.router.navigate(['login']);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee.charAt(0) === '?') {
      titlee = titlee.slice(1);
    }
    if (titlee.includes('add')) {
      return {
        pastPage: [],
        currentPageName: ''
      };
    }
    else if (titlee.includes('users')) {
      return {
        pastPage: [],
        currentPageName: 'Users'
      };
    }
    else if (titlee.includes('attandance')) {
      return {
        pastPage: [],
        currentPageName: 'Attandances'
      };
    }
    else if (titlee.includes('staff-attandance')) {
      return {
        pastPage: [],
        currentPageName: 'Staff Attandances'
      };
    }
    else if (titlee.includes('staff')) {
      return {
        pastPage: [],
        currentPageName: 'Staffs'
      };
    }
    else if (titlee.includes('room')) {
      return {
        pastPage: [],
        currentPageName: 'Room Assign'
      };
    }
    else {
      return {
        pastPage: [],
        currentPageName: ''
      };
    }
  }
}
