import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';
import { StorageService } from 'app/shared/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  addForm: FormGroup;
  submittedData: boolean = false;
  image: any;
  get faddData() {
    return this.addForm.controls;
  }

  constructor(public fb: FormBuilder, public adminLayoutService: AdminLayoutService, public route: ActivatedRoute, public router: Router,private storageService: StorageService,) {

  }

  ngOnInit(): void {
    this.defaultForm();
  }

  defaultForm() {
    this.addForm = this.fb.group({
     old_password: ['',[Validators.required]],
     new_password: ['',[Validators.required]],
     confirm_password: ['',[Validators.required]]
    })
  }

  

  
  

  
  
  save() {
    if (this.addForm.invalid) {
      this.submittedData = true;
      return
    }
    if(this.addForm.value.new_password ==this.addForm.value.confirm_password)
    {
      let saveObj = {};
      saveObj = {
       password: this.addForm.value.old_password,
       new_password:this.addForm.value.new_password,
       user_id: +this.storageService.getValue('userId')
     }
      this.adminLayoutService.changePassword(saveObj).subscribe((Response: any) => {
        
        this.router.navigate(['admin/users']);
      });
    }
  }
}
