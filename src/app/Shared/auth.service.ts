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
  
  // get currentUser() {//   
  //   return JSON.parse(localStorage.getItem('id'));
  // }  
  
    isLoggedInUser(){
    return this.isLoggedIn = !!(localStorage.getItem('id'));
  }
  isHodLoggedIn() {
    return this.isHod = !!(localStorage.getItem('role') === 'HOD');
  }
  isStaffLoggedIn(){
    return this.isStaff = !!(localStorage.getItem('role') === 'Staff')
  }
  // logout() {
  //   localStorage.clear();
  //   this.isHod= false;
  //   this.isStaff=false;
  //   this.isLoggedIn= false;
  // }
}
