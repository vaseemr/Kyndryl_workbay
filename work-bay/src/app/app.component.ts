import { Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AppServiceService } from './services/app-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeedetailsComponent } from './feature/employeedetails/employeedetails.component';
import { PaycheckComponent } from './feature/paycheck/paycheck.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent implements OnInit  {
  dataSource = new MatTableDataSource();
  expandedElement = '';
  title = 'work-bay';
  columnsToDisplay = ['Id', 'Name', 'City', 'leaves', 'employementstatus','Edit','delete', 'weeklyschedule'];
  WeekId = 0;
    Monday = 0;
    Tuesday = 0;
    wednesday = 0;
    Thursday = 0;
    Friday = 0;
    Saturday = 0;
    Sunday = 0;
  constructor(private appservice: AppServiceService, private modalservice:NgbModal){}

  ngOnInit() {
    this.getallData();
  }
getallData(){
  this.appservice.getalldata().subscribe(
    (data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.data[0]);
      console.log( this.dataSource.data);
      
    },
     (error) =>{
      console.log(error);
   }
   );
}
  Addemployee(){
    const activemodal = this.modalservice.open(EmployeedetailsComponent,{backdrop: 'static',size:'lg',centered:true});
    activemodal.componentInstance.action = "Add";
    activemodal.closed.subscribe((res) => {
      if(res=="refresh"){
        this.getallData();
      }
     
    })
  }

  editdata($event:any,element:any){
    $event.stopPropagation();
    const activemodal = this.modalservice.open(EmployeedetailsComponent,{backdrop: 'static',size:'lg',centered:true});
    activemodal.componentInstance.data = element;
    activemodal.componentInstance.action = "Edit";
    activemodal.closed.subscribe((res) => {
      if(res=="refresh"){
        this.getallData();
      }
     
    })
  }

  deletedata($event:any,element:any){
    $event.stopPropagation();
    this.appservice.deletedata(element).subscribe(
      (data) => {
        console.log('deleted',data);
        this.getallData();
      },
       (error) =>{
        console.log(error);
     }
     );
  }
  openreport($event:any,element:any){
    $event.stopPropagation();
    const activemodal = this.modalservice.open(PaycheckComponent,{backdrop: 'static',size:'lg',centered:true});
    activemodal.componentInstance.data = element;
  }

}


