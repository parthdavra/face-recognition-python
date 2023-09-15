import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageKey, StorageService } from "app/shared/storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginLayoutService } from 'app/layouts/login-layout/login-layout.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup | any;
  hide1 = false;
  get fLoginData() {
    return this.loginForm.controls;
  }
  submittedLoginData = false;

  constructor(private router: Router, private fb: FormBuilder, public storageService: StorageService, public loginLayoutService: LoginLayoutService) { }

  ngOnInit(): void {
    this.defaultloginForm();
  }

  defaultloginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/),]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.submittedLoginData = true;
    if (this.loginForm.invalid) {
      return;
    }

    let loginObj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    this.loginLayoutService.login(loginObj).subscribe((response: any) => {
      this.storageService.setValue('token', response.token);
      this.storageService.setValue('userId', response.userId);
      this.storageService.setValue('isLogin', true);
      this.router.navigate(["/admin/users"]);
    })

  }

}
