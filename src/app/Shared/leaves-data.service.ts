import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';


@Injectable({
  providedIn: 'root'
})
export class LeavesDataService{
  leaveArr: any=[];  
  

  static DatabaseUrl="https://employeelist-abc72-default-rtdb.asia-southeast1.firebasedatabase.app/leaves.json";
  
  constructor(private http: HttpClient, private apiServe: ApiServiceService) {}
 
  postNewLeave(newLeave : any):Observable<any>{
    return this.http.post(LeavesDataService.DatabaseUrl,newLeave);
  }
  
  getLeaveData(): Observable<any[]>{
    let leaveArr = this.http.get(LeavesDataService.DatabaseUrl).pipe(map((catchedData:any)=>{
      let newLeaveData= [];
      for( let key in catchedData){
        newLeaveData.push({...catchedData[key], leaveId : key})
      }
      return newLeaveData;
    }))
      return leaveArr;   
  }
  editLeave(id:any, leaveStatus:any){
  return this.http.patch("https://employeelist-abc72-default-rtdb.asia-southeast1.firebasedatabase.app/leaves/" + id + ".json",{leaveStatus})
    .subscribe(
        (val) => {
            console.log("PATCH call successful LeaveStatus updated",val);
        })
      }
}