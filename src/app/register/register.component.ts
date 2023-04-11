import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from '../Shared/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm : FormGroup | any;
  regEmployeeList:any=[];
  unsubscribe$= new Subject<void>();
  employee:any;
  
  constructor(private fbReg: FormBuilder, private apiServ: ApiServiceService) {
    this.regForm= this.fbReg.group({
      role:this.fbReg.control(''),
      fName:this.fbReg.control('',Validators.required),
      lName:this.fbReg.control('',Validators.required),
      email:this.fbReg.control('',Validators.required),
      contact:this.fbReg.control('',[Validators.required, Validators.minLength(10)]),
      dept:this.fbReg.control('',Validators.required),
      userName: this.fbReg.control('',Validators.required),
      password: this.fbReg.control('',Validators.required),
    })
  }
  ngOnInit(): void {
    // this.regEmployeeList=[{
    //   role:"Staff",
    //   fname:"John",
    //   lName:"Doe",
    //   email:"john",
    //   contact:"0123456789",
    //   dept:"R&D department",
    //   userName:"johndoe1234",
    //   password:"01234567"
    // }]
  }
  
  submit(newEmp:any){
    this.apiServ.postNewEmployee(this.regForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((data : any)=>{
      if(this.regForm.value.role=='HOD'){
        alert("New HOD registered");
        console.log("New HOD resistered",data);
      }
      if(this.regForm.value.role=='Staff'){
        alert("New Staff member registered");
        console.log("New Staff member registered",data);
      }
      this.regForm.reset();
      this.regEmployeeList.push(data);
      // localStorage.setItem('regEmployeeList',this.regEmployeeList);
      localStorage.setItem('regEmployeeList',JSON.stringify(this.regEmployeeList));
      console.log(this.regEmployeeList);
    })
  }
  

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  formClose() {
    this.regForm.reset();
    }
}