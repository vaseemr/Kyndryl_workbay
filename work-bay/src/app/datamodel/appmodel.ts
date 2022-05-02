
export type Iemployee = {
    id: number,
    name:string ,
    city:  string,
    weeklyschedule: string,
    leaves: string,
    status: string
  }
  

  export type weeklyschedulemodel = {
    WeekId :number;
    Monday:number;
    Tuesday:number;
    Wednesday:number;
    Thursday:number;
    Friday:number;
    Saturday:number;
    Sunday:number;
  }

  export type salarymodel = {
    basesalary :number;
    inhand: number ;
    Foodallowance :number;
    HRA :number;
    Total: number;
  }