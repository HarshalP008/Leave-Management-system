import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './staff/staff.component';
import { HodComponent } from './hod/hod.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeavesDataService} from './Shared/leaves-data.service';
import { ApiServiceService } from './Shared/api-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HodAuthGuard } from './auth/HodAuthGuard';
import { StaffAuthGuard } from './auth/StaffAuthGuard';
import { AuthService } from './Shared/auth.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    StaffComponent,
    HodComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [LeavesDataService, ApiServiceService,HodAuthGuard,StaffAuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
