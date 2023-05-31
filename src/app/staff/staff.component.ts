import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LeavesDataService } from '../Shared/leaves-data.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  myForm !: FormGroup | any;
  unsubscribe$= new Subject<void>();
  leaveList:any[]=[];
  leave:any;
  // staffId !:string;
  // staffrole!: string;
  // staffDept !: string;
  loggedInstaff !: any;
  stafffName !: any;
  stafflName !: any;
  totalLeaves: any= 20;
  approvedLeavesQty !: any;
  rejectedLeavesQty !: any;
  balancedLeaves !: number;  
  startDate!: any;
  endDate !: any;
  leaveDays!: any;
  
  constructor(private fb: FormBuilder, private leaveServ: LeavesDataService, private router: Router){
   }
  
  ngOnInit(): void {
   this.myForm = this.fb.group({
      // staffId: this.authServ.getItem('id'),
      // staffName: this.loggedInstaff.fName,
      // staffId: localStorage.getItem('id'),
      // stafffName: localStorage.getItem('fName'),
      // stafflName:localStorage.getItem('lName'),
      // staffrole: localStorage.getItem('role'),
      // staffDept: localStorage.getItem('dept'),
      startDate: this.fb.control('',[Validators.required]),
      endDate: this.fb.control('',[Validators.required]),
      reason: this.fb.control('',[Validators.required]),
      leaveStatus: this.fb.control('Pending'),
      leaveDays:this.leaveDays
    });
    this.loggedInEmp();
    this.getLeaveList();
    this.firstName();
    this.lastName();
    this.startDate1();
    this.endDate1()
    
    console.log( this.loggedInstaff.fName, this.loggedInstaff.lName);
  }
  onSubmit() {
    console.log(this.myForm.value);
    this.leaveServ.postNewLeave(this.myForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((leave:any)=> {      
      alert('New Leave Request Send');
        this.getLeaveList();
        console.log(leave.value);
      });
    this.myForm.reset();
   }
  getLeaveList(){
    this.leaveServ.getLeaveData().pipe(takeUntil(this.unsubscribe$)).subscribe((res:any)=>{
      console.log(res);
      this.leaveList= res.filter((ele:any)=>ele.staffId == this.loggedInstaff.id);
        let approvedLeaveList:any[]=this.leaveList.filter((ele:any)=>ele.leaveStatus == "Approved");
        this.approvedLeavesQty= approvedLeaveList.length;
        let rejectedLeaveList:any[]=this.leaveList.filter((ele:any)=>ele.leaveStatus == 'Rejected');
        this.rejectedLeavesQty= rejectedLeaveList.length;
      })
  }
  
  loggedInEmp(){
    this.loggedInstaff = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }
  getBalanceLeaves(){
    this.balancedLeaves= this.totalLeaves - this.approvedLeavesQty;
  }
  firstName(){
    // return this.stafffName = localStorage.getItem('fName'); or
    return this.stafflName = this.loggedInstaff.fName;
  }
  lastName(){
    // return this.stafflName = localStorage.getItem('lName'); or
    return this.stafflName = this.loggedInstaff.lName;
  }
  startDate1() {
    this.startDate= this.myForm.get('startDate').value;
  }
  endDate1() {
    this.endDate= this.myForm.get('endDate').value;
  }
  get reason() {
    return this.myForm.get('reason');
  }
  totalLeaveDays(){
    const sDate = new Date(this.myForm.get('startDate').value);
    console.log(sDate);
    const eDate = new Date(this.myForm.get('endDate').value);
    console.log(eDate);
    return this.leaveDays = (Math.round((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24)))+ 1; 
  }
  formClose() {
    this.myForm.reset();
  }
  logOut(){
    localStorage.clear();
    // localStorage.removeItem('loggedInEmp');
    this.router.navigate(['login']);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}