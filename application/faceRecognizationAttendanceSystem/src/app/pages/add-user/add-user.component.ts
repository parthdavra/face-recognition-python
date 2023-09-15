import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  name: string;
  email: string;
  selectedImage: File;
  user_type: string;
  password: string;

  addForm: FormGroup;
  userType: any;
  userTypeList: any[] = [];
  submittedData: boolean = false;
  image: any;
  get faddData() {
    return this.addForm.controls;
  }

  constructor(public fb: FormBuilder, public adminLayoutService: AdminLayoutService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {
    this.defaultForm();
    let type: any;
    this.route.params.subscribe((x: any) => {
      type = x.id
    })

    if (type == 'staff') {
      this.userTypeList = ['staff'];
      this.userType = type;
      this.addForm.controls.user_type.setValue(type);
      this.addForm.controls.password.setValidators([Validators.required]);
    }
    else {
      this.userTypeList = ['student', 'visitor'];
      this.addForm.controls.password.clearValidators();
    }
  }

  defaultForm() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      password: [''],
      user_type: [null, [Validators.required]],
      image: ['',[Validators.required]],
    })
  }

  cancel() {
    if (this.userType == 'staff') {
      this.router.navigate(['admin/staff']);
    }
    else {
      this.router.navigate(['admin/users']);
    }
  }

  userTypeChange() {
    if (this.addForm.value.user_type == 'student') {
      this.addForm.controls.password.setValidators([Validators.required]);
    }
    else {
      this.addForm.controls.password.clearValidators();
      this.addForm.controls.password.updateValueAndValidity();
    }
  }
  onSelectFile(e){
    if(e.target.files){
      this.selectedImage = e.target.files[0];
     // this.addForm.get('image').setValue(this.selectedImage);
      console.log('selectedImage::',this.selectedImage);
      // let reader = new FileReader();

      // reader.readAsDataURL(e.target.files[0]);
      // reader.onload = (event:any)=>{
      //   this.selectedImage = event.target.result;
      // }
    }
  }

  
  
  save() {
    if (this.addForm.invalid) {
      this.submittedData = true;
      return
    }
    console.log('this.name::',this.addForm.get('name').value);
   const formData = new FormData();
    formData.append('name',this.addForm.get('name').value);
    formData.append('email',this.email);
    formData.append('email',this.user_type);
    formData.append('file',this.selectedImage, this.selectedImage.name);
     let saveObj = {};
    if (this.addForm.value.user_type == 'student' || this.addForm.value.user_type == 'staff') {
      formData.append('password',this.password);
      // saveObj = {
      //   name: this.addForm.value.name,
      //   email: this.addForm.value.email,
      //   user_type: this.addForm.value.user_type,
      //   password: this.addForm.value.password,
      //   file: this.image
      // }
    }
    
    // else {
    //   saveObj = {
    //     name: this.addForm.value.name,
    //     email: this.addForm.value.email,
    //     user_type: this.addForm.value.user_type,
    //     file: this.image
    //   }
    // }
   
    console.log('formData::',formData);
  
    this.adminLayoutService.saveData(formData).subscribe((Response: any) => {
      console.log('Response:::',Response)
      if (this.userType == 'staff') {
        this.router.navigate(['admin/staff']);
      }
      else {
        this.router.navigate(['admin/users']);
      }
    })
  }
}
