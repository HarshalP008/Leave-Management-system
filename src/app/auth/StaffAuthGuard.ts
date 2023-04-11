import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/auth.service';

@Injectable()
export class StaffAuthGuard implements CanActivate {
  constructor(private router: Router, private authServ: AuthService) {}
    
  
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {      
      // const role = localStorage.getItem('role');
      if (this.authServ.isStaff){
        return true;
      } else {
        this.router.navigate(['login']);
        alert('You are not authorised to view this page')
        return false;
      }
      // if(role=='HOD'){
      //   return true;
      // }
    }
  }