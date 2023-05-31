import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/auth.service';

@Injectable()
export class StaffAuthGuard implements CanActivate {
  constructor(private router: Router, private authServ: AuthService) {}
    
  
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {      
      if (this.authServ.isHod){
        this.router.navigate(['hod'])
        return true;
      } else {
        this.router.navigate(['login']);
        alert('You are not authorised to view this page')
        return false;
      }
    }



    // canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {      
    //   const userRole = this.authServ.userRole;
      
    //   if (userRole == 'Staff'){
    //     this.router.navigate(['staff']);
    //     return true;
    //   } 
    //   else {
    //     this.router.navigate(['login']);
    //     alert('You are not authorised to view this page')
    //     return false;
    //   }
    // }

  }