import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.css']
})
export class PaycheckComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private appservice: AppServiceService) { }
  @Input() data:any;
  basesalary:number;
  inhand: number ;
  Foodallowance :number;
  HRA:number;
  Total: number;

  ngOnInit(): void {
this.appservice.getSalary(this.data.weeklyschedule).subscribe(
  (data1) => {
    console.log(data1);
    this.basesalary = data1.basesalary;
    this. inhand =data1.inhand ;
    this. Foodallowance = data1.Foodallowance;
    this. HRA =data1.HRA;
    this. Total= data1.Total;
    
  },
   (error) =>{
    console.log(error);
 }
 );

  }
  public closePopup(): void {
    this.activeModal.close();
  }
}
