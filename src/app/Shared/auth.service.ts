import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isHod:boolean = false;
  isStaff:boolean = false;
  isLoggedIn:boolean= false;
  constructor() {
    this.isHodLoggedIn();
    this.isStaffLoggedIn();
    this.isLoggedInUser();
  }
  isLoggedInUser(){
    return this.isLoggedIn = !!(localStorage.getItem('id'));
  }
  isHodLoggedIn() {
    return this.isHod = !!(localStorage.getItem('role') === 'HOD');
  }
  isStaffLoggedIn(){
    return this.isStaff = !!(localStorage.getItem('role') === 'Staff')
  }

   // loggedInUser:any= JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  // userRole: any = (localStorage.getItem('role') || '{}');
  // isLoggedIn !: boolean;
  
  // isUserLoggedIn(){
  //   if(localStorage.getItem('loggedInUser')){
  //     this.isLoggedIn = true;
  //   }else{
  //     this.isLoggedIn = false;
  //   }
  // }
// }
}

