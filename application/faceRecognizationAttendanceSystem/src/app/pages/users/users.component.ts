import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  l: number;
  p: number = 1;
  itemsPage: any;
  userList: any[] = [];
  allUserList: any[] = [];
  itemsPerPage: number;
  noData: boolean = false;
  searchTerm = '';

  constructor(public router: Router, public adminLayoutService: AdminLayoutService) { }

  ngOnInit() {
    this.l = this.itemsPerPage = 10;
    this.getUserList();
  }

  addNew() {
    this.router.navigate([`admin/add/users`])
  }

  getUserList() {
    this.adminLayoutService.getUserList().subscribe((Response: any) => {
      this.allUserList = Response.data;
      this.userList = this.allUserList;
      if (this.allUserList.length > 0) {
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    }, (error) => {
      this.noData = true
    })
  }

  itemsPerPageChange(val: any) {
    this.l = this.itemsPerPage = parseInt(val);
    this.p = 1;
  }

  search() {

    this.userList = this.allUserList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.userList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

}
