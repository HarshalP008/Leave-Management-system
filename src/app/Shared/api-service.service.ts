import { Injectable } from '@angular/core';
import { map} from 'rxjs';
import{ HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  static DatabaseUrl="https://employeelist-abc72-default-rtdb.asia-southeast1.firebasedatabase.app/employee.json";
  constructor(private http: HttpClient) { }
  postNewEmployee(newEmp : any){
    return this.http.post(ApiServiceService.DatabaseUrl,JSON.stringify(newEmp));
  }
  
  getEmployees(){
    const allEmployees= this.http.get(ApiServiceService.DatabaseUrl).pipe(map((catchedData:any)=>{
    const newEmpData= [];
    for( let key in catchedData){
      newEmpData.push({...catchedData[key], id : key})
    }
    console.log(newEmpData);
    return newEmpData;
  }))
    return allEmployees;
  }
  
}
