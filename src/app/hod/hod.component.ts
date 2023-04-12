import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiServiceService } from '../Shared/api-service.service';
import { LeavesDataService } from '../Shared/leaves-data.service';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})

export class HodComponent implements OnInit {
leavesList : any[]=[];
unsubscribe$= new Subject<void>();
loggedInHod !: any;
constructor(private leaveServ: LeavesDataService, private apiServe: ApiServiceService, private router: Router){}

ngOnInit(): void {
  this.getLeaveList();
  this.loggedInEmp();
 }
  approveBtn(leaveObj:any){
    leaveObj.leaveStatus="Approved";
    this.leaveServ.editLeave(leaveObj.leaveId,leaveObj.leaveStatus)
    console.log(leaveObj.leaveStatus, leaveObj.leaveId,leaveObj)
  }
  rejBtn(leaveObj:any){
    leaveObj.leaveStatus="Rejected";
    this.leaveServ.editLeave(leaveObj.leaveId,leaveObj.leaveStatus)
    console.log(leaveObj.leaveStatus, leaveObj.leaveId,leaveObj)
  }
  loggedInEmp(){
    this.loggedInHod = JSON.parse(localStorage.getItem('loggedInEmp') || '{}');
  }  
  getLeaveList(){    
    this.leaveServ.getLeaveData().pipe(takeUntil(this.unsubscribe$)).subscribe((leaves : any)=>{
      this.leavesList= leaves.filter((ele:any) =>  ele.staffDept === localStorage.getItem('dept'))
    })    
  }
  logOut(){
    localStorage.clear();
    localStorage.removeItem('id');
    this.router.navigate(['login'])
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}