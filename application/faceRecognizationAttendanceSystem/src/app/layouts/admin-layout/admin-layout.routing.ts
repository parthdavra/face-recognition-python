import { Routes } from '@angular/router';
import { AddUserComponent } from 'app/pages/add-user/add-user.component';
import { AttandanceComponent } from 'app/pages/attandance/attandance.component';
import { StaffComponent } from 'app/pages/staff/staff.component';
import { RoomAssignComponent } from 'app/pages/room-assign/room-assign.component';
import { UsersComponent } from 'app/pages/users/users.component';
import { AddRoomComponent } from 'app/pages/add-room/add-room.component';
import { StaffAttandanceComponent } from 'app/pages/staff-attandance/staff-attandance.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'add/:id', component: AddUserComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'attandance', component: AttandanceComponent },
    { path: 'room', component: RoomAssignComponent },
    { path: 'room/add', component: AddRoomComponent },
    { path: 'staff-attandance', component: StaffAttandanceComponent },
];
