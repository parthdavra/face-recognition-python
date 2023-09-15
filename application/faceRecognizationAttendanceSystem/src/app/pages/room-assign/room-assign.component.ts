import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';
@Component({
  selector: 'app-room-assign',
  templateUrl: './room-assign.component.html',
  styleUrls: ['./room-assign.component.css']
})
export class RoomAssignComponent implements OnInit {
  l: number;
  p: number = 1;
  itemsPage: any;
  roomList: any[] = [];
  allRoomList: any[] = [];
  itemsPerPage: number;
  noData: boolean = false;
  searchTerm = '';
  constructor(public router: Router, public adminLayoutService: AdminLayoutService) { }

  ngOnInit(): void {
    this.l = this.itemsPerPage = 10;
    this.getRoomList();
  }
  getRoomList() {
    this.adminLayoutService.getRoomList().subscribe((Response: any) => {
      this.allRoomList = Response.data;
      this.roomList = this.allRoomList;
      if (this.allRoomList.length > 0) {
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    }, (error) => {
      this.noData = true
    })
  }
  addNew() {
    this.router.navigate([`admin/room/add`])
  }

  itemsPerPageChange(val: any) {
    this.l = this.itemsPerPage = parseInt(val);
    this.p = 1;
  }
  search() {

    this.roomList = this.allRoomList.filter((val) => JSON.stringify(val).toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.p = 1;
    if (this.roomList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }
}
