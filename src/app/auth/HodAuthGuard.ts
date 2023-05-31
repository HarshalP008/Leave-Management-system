import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/auth.service';

@Injectable()
export class HodAuthGuard implements CanActivate {
  constructor(private router: Router, private authServ: AuthService) {}
    
  
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {      
      if (this.authServ.isHod){
        this.router.navigate(['hod']);
        return true;
      } else {
        this.router.navigate(['login']);
        alert('You are not authorised to view this page')
        return false;
      }
    }
  }


  // canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree{
    //   if(!!(this.authServ.isLoggedIn)){
    //     if(this.authServ.userRole == 'HOD'){
    //       this.router.navigate(['hod']);
    //       return true;
    //     }else {
    //        this.router.navigate(['login']);
    //        setTimeout(()=> {alert('You are not authorised to view this page')},2000);
    //        return false;
    //     }
    //   }else{
    //     return false;
    //   }
    // }

    
    