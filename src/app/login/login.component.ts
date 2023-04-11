import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from '../Shared/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup | any;
  regEmployees:any;
  unsubscribe$= new Subject<void>();

  
  
  constructor( private fbLogin : FormBuilder,private router: Router, private apiServ:ApiServiceService){}
  
  ngOnInit(): void {
    this.myLoginForm= this.fbLogin.group({
      userName: this.fbLogin.control('',Validators.required),
      password: this.fbLogin.control('',Validators.required),
    })
    // this.regEmployees= (localStorage.getItem('regEmployeeList'));
    // console.log(this.regEmployees);
  }
  
  
  submit(){
    let loggedinUser = this.myLoginForm.value;
    this.apiServ.getEmployees().pipe(takeUntil(this.unsubscribe$)).subscribe((empList:any[])=>{
      let empDetails= empList.find((emp:any)=> emp.userName === loggedinUser.userName && emp.password === loggedinUser.password)
      console.log(empDetails);
      if(!(empDetails.length === 0)){
        localStorage.setItem('loggedInEmp',JSON.stringify(empDetails));
        localStorage.setItem('fName',empDetails.fName);
        localStorage.setItem('lName',empDetails.lName);
        localStorage.setItem('dept',empDetails.dept);
        localStorage.setItem('role',empDetails.role);
        localStorage.setItem('id',empDetails.id);
        if(empDetails.role=== 'HOD'){
          this.router.navigate(['hod'])
        }else{
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