import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Iemployee, weeklyschedulemodel } from 'src/app/datamodel/appmodel';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {

  @Input() action:string;
  @Input() data:any;
  constructor(public activeModal: NgbActiveModal , private appservice: AppServiceService) {}
  datatopass:Iemployee = <Iemployee>{};
  weekschedule:weeklyschedulemodel = <weeklyschedulemodel>{};
  disableId:boolean = false;
  valmessage = '';
  Estatusvalmessage:string ;
  Eleavesvalmessage:string ;
  Eschedulevalmessage:string ;
  Ecityvalmessage:string ;
  Enamevalmessage:string ;
  weekidvalmessage:string;
  workHoursValMessage = '';
  eid : number;
  Ename = '';
  Ecity = '';
  Eschedule = '';
  Eleaves = '';
  Estatus = '';

    WeekId: number;
    Monday: number;
    Tuesday : number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday : number;
    Sunday : number;
  ngOnInit(): void {
    console.log(this.action,this.data);
    if(this.action == 'Edit'){
      this.disableId = true;
      this.eid = this.data.Id;
      this.Ename = this.data.Name;
      this.Ecity = this.data.City;
      this.Eschedule = this.data.weeklyschedule;
      this.Eleaves = this.data.leaves;
      this.Estatus = this.data.employementstatus;
      this.WeekId= this.data.weekid;
      this.Monday= this.data.mon;
      this.Tuesday =this.data.tue ;
      this.Wednesday= this.data.wed;
      this.Thursday=this.data.thur;
      this.Friday=this.data.fri;
      this.Saturday= this.data.sat;
      this.Sunday =this.data.sun;
    }
    this.disableId = false;
  }

  public closePopup(): void {
    this.activeModal.close();
  }

  public validateform(workhours: weeklyschedulemodel): boolean{
  
    if(this.eid == 0 || this.eid ==  undefined ) 
    {
      this.valmessage = "Enter Eid" ; return false;
    }
    else if(this.Ename== '') 
    {
      this.Enamevalmessage  = "Enter Name" ; return false;
    }
    else if(  this.Ecity== '')
    {
      this.Ecityvalmessage = "Enter City" ; return false;
    } 
    // else if(  this.Eschedule== '')
    // {
    //   this.Eschedulevalmessage = "Enter Schedule" ; return false;
    // } 
   
    else if(  this.Eleaves== '') 
    {
      this.Eleavesvalmessage = "Enter Leaves" ; return false;
    }
   
   else if(  this.Estatus == '') 
   {
     this.Estatusvalmessage= "Enter status" ; return false;

   }
   else if(  this.WeekId == null ) 
   {
     this.weekidvalmessage= "Enter weekID" ; return false;

   }
   

    const valuearr = Object.values(workhours);
    valuearr.shift();
    console.log(valuearr);
    let sum = 0;
    valuearr.forEach(element => {
      sum = sum + element;
    });
    console.log(sum);
   if(sum>25 ){
    this.workHoursValMessage = "The total work hours should be less than 25/week";
    return false;
   }
   else if( sum < 1){
    this.workHoursValMessage = "Enter work hours";
    return false;
   }
  else{
    return true;
  }
  }

  Addemployee(){
    console.log("Insert",this.datatopass ,this.Estatus);
    this.datatopass.id = this.eid;
    this.datatopass.name = this.Ename;
    this.datatopass.city = this.Ecity;
    this.datatopass.weeklyschedule = this.Eschedule;
    this.datatopass.leaves = this.Eleaves;
    this.datatopass.status = this.Estatus;

    this.weekschedule.WeekId = this.WeekId;
    this.weekschedule.Monday = this.Monday;
    this.weekschedule.Tuesday = this.Tuesday;
    this.weekschedule.Wednesday = this.Wednesday;
    this.weekschedule.Thursday = this.Thursday;
    this.weekschedule.Friday = this.Friday;
    this.weekschedule.Saturday = this.Saturday;
    this.weekschedule.Sunday = this.Sunday;

    const isValid: boolean = this.validateform(this.weekschedule);

    if(isValid){
      this.workHoursValMessage = "";
      const params = [this.datatopass,this.weekschedule];
      this.appservice.Insertemployee(params).subscribe(
        
        (data) => {
          if(data.status == 200){
            this.activeModal.close('refresh');
          }
          console.log( data);
        },
         (error) =>{
          console.log(error);
          if(error.error.code == "ER_DUP_ENTRY"){
            this.valmessage = "Duplicate Entry!!!!";
            console.log(this.valmessage);
          }
          console.log(this.valmessage);
       }
      );
    }
    else {
      
    }
  
  }

  Updateemployee(){
    const datatopass:Iemployee = <Iemployee>{};
    const weekschedule:weeklyschedulemodel = <weeklyschedulemodel>{};
    datatopass.id = this.eid;
    datatopass.name = this.Ename;
    datatopass.city = this.Ecity;
    datatopass.weeklyschedule = this.Eschedule;
    datatopass.leaves = this.Eleaves;
    datatopass.status = this.Estatus;

    weekschedule.WeekId = this.WeekId;
    weekschedule.Monday = this.Monday;
    weekschedule.Tuesday = this.Tuesday;
    weekschedule.Wednesday = this.Wednesday;
    weekschedule.Thursday = this.Thursday;
    weekschedule.Friday = this.Friday;
    weekschedule.Saturday = this.Saturday;
    weekschedule.Sunday = this.Sunday;

    console.log("update",datatopass,weekschedule);
    const isValid: boolean = this.validateform(weekschedule);

if(isValid){
  const params = [datatopass,weekschedule];
  this.appservice.Updateemployee(params).subscribe(
    (data) => {
      if(data.status == 200){
        this.activeModal.close('refresh');
      }
      console.log( data);
    },
     (error) =>{
      console.log(error);
      if(error.error.code == "ER_DUP_ENTRY"){
        this.valmessage = "Duplicate Entry!!!!";
        console.log(this.valmessage);
      }
      console.log(this.valmessage);
   }
  );
}
   
  }

}
