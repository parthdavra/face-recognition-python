import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'app/shared/common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginLayoutService {

  constructor(public http: HttpClient, public commonService: CommonService) { }

  login(data: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'login', data)
  }

}
