import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-staff-attandance',
  templateUrl: './staff-attandance.component.html',
  styleUrls: ['./staff-attandance.component.css']
})
export class StaffAttandanceComponent implements OnInit {

  l: number;
  p: number = 1;
  itemsPage: any;
  attandanceList: any[] = [];
  allAttandanceList: any[] = [];
  itemsPerPage: number;
  noData: boolean = false;
  searchTerm = '';

  constructor(public adminLayoutService: AdminLayoutService) { }

  ngOnInit() {
    this.l = this.itemsPerPage = 10;
    this.getattandanceList();
  }

  getattandanceList() {
    this.adminLayoutService.getStaffAttandanceList().subscribe((Response: any) => {
      this.allAttandanceList = Response.data;
      this.attandanceList = this.allAttandanceList;
      if (this.allAttandanceList.length > 0) {
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

    this.attandanceList = this.allAttandanceList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.attandanceList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }


}
