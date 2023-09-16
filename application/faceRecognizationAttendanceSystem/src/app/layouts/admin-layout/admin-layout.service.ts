import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'app/shared/common.service';
import { StorageService } from 'app/shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {

  constructor(private storageService: StorageService, public http: HttpClient, public commonService: CommonService) { }

  getUserList() {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'students', { headers: headers })
  }

  getStaffList() {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'staff', { headers: headers })
  }

  getAttandanceList() {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'attendances', { headers: headers })
  }
  getStaffAttandanceList() {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'staff-attandances', { headers: headers })
  }

  saveData(data: any) {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'user-form', data,{ headers: headers })
  }
  saveImage(data: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'image', data)
  }
  saveClass(data: any) {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'class', data, { headers: headers })
  }
  getRoomList(){
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'rooms', { headers: headers })
  }
  changePassword(data: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'change-password', data)
  }
}
