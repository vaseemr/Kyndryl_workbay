const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const dbConfig = require("./app/config/db.config");

const app = express();
var corsOptions = {
    origin: "http://localhost:9091"
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
  });
  // open the MySQL connection
  db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
 
//Routing

//get all employees
app.get("/", (req, res) => {
    let qr = `CALL workbay.getAllemployees`;
    db.query(qr,(error,result)=>{
        if(error){
            console.log('errors',error);
        }
        if(result){
          console.log('get result',result);
            res.send({
                message:'all employee data',
                data:result
            })
        }
    })
  });

  app.get("/salary", (req, res) => {
 
   const hours =req.query.hoursworked;
 
  const salary = {};
  salary.basesalary =  500;
  salary.inhand = hours * 500 ;
  salary.Foodallowance = 2000 ;
  salary.HRA =7000 ;
  salary.Total = (salary.inhand + salary.Foodallowance + salary.HRA );
  console.log('salary',salary);
  res.send(salary )



  });

  //add employees
  app.post("/add", (req, res) => {

    console.log(req.body,'data to be added');
    let Eid = req.body[0].id;
    let EName = req.body[0].name;
    let ECity= req.body[0].city;
    let Eweeklyschedule = req.body[0].weeklyschedule;
    let Eleaves = req.body[0].leaves;
    let Estatus = req.body[0].status;

    let WeekId = req.body[1].WeekId;
    let Monday= req.body[1].Monday;
    let Tuesday= req.body[1].Tuesday;
    let Wednesday= req.body[1].Wednesday;
    let Thursday= req.body[1].Thursday;
    let Friday= req.body[1].Friday;
    let Saturday= req.body[1].Saturday;
    let Sunday= req.body[1].Sunday;
  var param = [Eid,EName,ECity,Eweeklyschedule,Eleaves,Estatus,WeekId,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]

    let qr = "CALL workbay.Insertemployee(?)";
    db.query(qr,[param],(error,result)=>{
        if(error){
            
            if(error.code =="ER_DUP_ENTRY"){
                console.log('duplicate --- ',error);
                res.status(400).send(error)
            }
            else{
                console.log('errors',error);
            }
        }
        if(result){
            res.send({
                message:'data added succesfully',
                data:result
            })
        }
    })
  });

//update data

app.post("/update", (req, res) => {

  console.log(req.body,'data to be added');
  let Eid = req.body[0].id;
  let EName = req.body[0].name;
  let ECity= req.body[0].city;
  let Eweeklyschedule = req.body[0].weeklyschedule;
  let Eleaves = req.body[0].leaves;
  let Estatus = req.body[0].status;

  let WeekId = req.body[1].WeekId;
  let Monday= req.body[1].Monday;
  let Tuesday= req.body[1].Tuesday;
  let Wednesday= req.body[1].Wednesday;
  let Thursday= req.body[1].Thursday;
  let Friday= req.body[1].Friday;
  let Saturday= req.body[1].Saturday;
  let Sunday= req.body[1].Sunday;
var param = [Eid,EName,ECity,Eweeklyschedule,Eleaves,Estatus,WeekId,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]
console.log(param,'paramdata');
  let qr = "CALL workbay.updateemployee(?)";
  db.query(qr,[param],(error,result)=>{
      if(error){
          
          if(error.code =="ER_DUP_ENTRY"){
              console.log('duplicate --- ',error);
              res.status(400).send(error)
          }
          else{
              console.log('errors',error);
          }
      }
      if(result){
        console.log('updated result',result);
          res.send({
              message:'data updated succesfully',
              data:result
          })
      }
  })
});


//delete data 


app.post("/delete", (req, res) => {

  console.log(req.body,'data to be added');
  let Eid = req.body.Id;
 
var param = [Eid]

  let qr = "CALL workbay.deletedata(?)";
  db.query(qr,[param],(error,result)=>{
      if(error){
          
          if(error.code =="ER_DUP_ENTRY"){
              console.log('duplicate --- ',error);
              res.status(400).send(error)
          }
          else{
              console.log('errors',error);
          }
      }
      if(result){
          res.send({
              message:'data updated succesfully',
              data:result
          })
      }
  })
});


const PORT = process.env.PORT || 8082;
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
