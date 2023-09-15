import { Routes } from '@angular/router';
import { AddUserComponent } from 'app/pages/add-user/add-user.component';
import { AttandanceComponent } from 'app/pages/attandance/attandance.component';
import { StaffComponent } from 'app/pages/staff/staff.component';

import { UsersComponent } from 'app/pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'add/:id', component: AddUserComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'attandance', component: AttandanceComponent },
];
