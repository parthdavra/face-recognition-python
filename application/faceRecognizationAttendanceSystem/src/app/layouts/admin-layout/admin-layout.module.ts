import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { DirectivesModule } from 'app/shared/directives/directives.module';
import { UsersComponent } from 'app/pages/users/users.component';
import { StaffComponent } from 'app/pages/staff/staff.component';
import { AttandanceComponent } from 'app/pages/attandance/attandance.component';
import { AddUserComponent } from 'app/pages/add-user/add-user.component';
import { RoomAssignComponent } from 'app/pages/room-assign/room-assign.component';
import { AddRoomComponent } from 'app/pages/add-room/add-room.component';
import { StaffAttandanceComponent } from 'app/pages/staff-attandance/staff-attandance.component'; 
import { ChangePasswordComponent } from 'app/pages/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    NgSelectModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    DirectivesModule
  ],
  declarations: [
    UsersComponent,
    StaffComponent,
    AttandanceComponent,
    AddUserComponent,
    RoomAssignComponent,
    AddRoomComponent,
    StaffAttandanceComponent,
    ChangePasswordComponent
  ],
  providers: [MatDatepickerModule, DatePipe],
})

export class AdminLayoutModule { }
