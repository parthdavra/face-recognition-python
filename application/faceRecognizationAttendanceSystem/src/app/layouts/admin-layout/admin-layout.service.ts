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

  getattandanceList() {
    let localData = this.storageService.getValue('token');
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localData}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'attendances', { headers: headers })
  }

  saveData(data: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'user-form', data)
  }

}
