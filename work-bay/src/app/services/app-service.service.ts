import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iemployee, weeklyschedulemodel } from '../datamodel/appmodel';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
private serviceurl = 'http://localhost:8082/';
  constructor(private http: HttpClient) { }

  getalldata(): Observable<any>{
  return this.http.get<any>(this.serviceurl);
  }

  deletedata(data:(Iemployee | weeklyschedulemodel)[]){
    const fullurl = this.serviceurl+'delete';
    return this.http.post(fullurl,data,{observe:'response'});
  }

  Insertemployee(data :(Iemployee | weeklyschedulemodel)[]) {
    const fullurl = this.serviceurl+'add';
    return this.http.post(fullurl,data,{observe:'response'});
  }

  Updateemployee(data :(Iemployee | weeklyschedulemodel)[]) {
    console.log("servide",data);
    const fullurl = this.serviceurl+'update';
    return this.http.post(fullurl,data,{observe:'response'});
  }

  getSalary(hoursworked:number){
    const fullurl = this.serviceurl+'salary';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("hoursworked",hoursworked);
    return this.http.get<any>(fullurl,{params:queryParams});
  }
}
