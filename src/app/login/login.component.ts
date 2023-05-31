import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from '../Shared/api-service.service';
import { AuthService } from '../Shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup | any;
  regEmployees:any;
  unsubscribe$= new Subject<void>();
  loggedInEmpDetails: any;

  
  
  constructor( private fbLogin : FormBuilder,private router: Router, private apiServ:ApiServiceService, private authServ: AuthService){}
  
  ngOnInit(): void {
    this.myLoginForm= this.fbLogin.group({
      userName: this.fbLogin.control('',Validators.required),
      password: this.fbLogin.control('',Validators.required),
    })
    // this.regEmployees= (localStorage.getItem('regEmployeeList'));
    // console.log(this.regEmployees);
  }
  
  
  submit(){
    localStorage.clear();
    let loggedinUser = this.myLoginForm.value;
    this.apiServ.getEmployees().pipe(takeUntil(this.unsubscribe$)).subscribe((empList:any[])=>{
      let empDetails= empList.find((emp:any)=> emp.userName === loggedinUser.userName && emp.password === loggedinUser.password)
      console.log(empDetails);
      if(empDetails.length !== 0){
        localStorage.setItem('role',empDetails.role);
        localStorage.setItem('loggedInUser',JSON.stringify(empDetails));
        this.loggedInEmpDetails = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        console.log(this.loggedInEmpDetails.role);
        if(empDetails.role=== 'HOD' || this.loggedInEmpDetails.role === "HOD"){
          // if(this.loggedInEmpDetails.role === "HOD"){
          this.router.navigate(['hod'])
        }else if (empDetails.role=== 'Staff' || this.loggedInEmpDetails.role=== 'Staff'){
          this.router.navigate(['staff'])
        }
      }else{
        console.log('error')
        alert('wrong Username or password')
      }
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}