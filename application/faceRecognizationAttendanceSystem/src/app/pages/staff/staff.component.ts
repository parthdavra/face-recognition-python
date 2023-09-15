import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  l: number;
  p: number = 1;
  itemsPage: any;
  staffList: any[] = [];
  allStaffList: any[] = [];
  itemsPerPage: number;
  noData: boolean = false;
  searchTerm = '';

  constructor(public adminLayoutService: AdminLayoutService, public router: Router) { }

  ngOnInit() {
    this.l = this.itemsPerPage = 10;
    this.getStaffList();
  }

  addNew() {
    this.router.navigate([`admin/add/staff`])
  }

  getStaffList() {
    this.adminLayoutService.getStaffList().subscribe((Response: any) => {
      this.allStaffList = Response.data;
      this.staffList = this.allStaffList;
      if (this.allStaffList.length > 0) {
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

    this.staffList = this.allStaffList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.staffList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

}
