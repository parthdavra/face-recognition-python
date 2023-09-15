import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  public webcamList: MediaDeviceInfo[] = [];
  cameraNumber: any[] = [];
  addForm: FormGroup;
  submittedData: boolean = false;
  get faddData() {
    return this.addForm.controls;
  }
  constructor(public fb: FormBuilder, public adminLayoutService: AdminLayoutService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.getAvailableCameras();
    this.defaultForm();
  }
  defaultForm() {
    this.addForm = this.fb.group({
      class_number: ['', [Validators.required]],
      class_id: ['', [Validators.required]],

    })
  }
  cancel() {
    this.router.navigate(['admin/room']); 
  }
  getAvailableCameras() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        let camlist = devices.filter((device) => device.kind === 'videoinput');
        this.cameraNumber = Array.from({length: camlist.length}, (_, index) => index + 1);
      })
      .catch((error) => {
        console.error('Error getting camera list:', error);
      });
  }
  save() {
    if (this.addForm.invalid) {
      this.submittedData = true;
      return
    }
    let saveObj = {};
    saveObj = {
      class_number: this.addForm.value.class_number,
      class_id: this.addForm.value.class_id - 1,
    }
    this.adminLayoutService.saveClass(saveObj).subscribe((Response: any) => {
      this.router.navigate(['admin/room']);
    });
  }
}
