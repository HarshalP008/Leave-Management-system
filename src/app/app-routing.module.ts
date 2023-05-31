import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HodComponent } from './hod/hod.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {path: 'hod',component:HodComponent}, /* canActivate:[HodAuthGuard] */
  {path:'staff', component:StaffComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent },
  {path: 'pageNotFound', component: PageNotFoundComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/pageNotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
