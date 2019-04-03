const mysql=require('mysql');
const express=require('express');
var app =express();

const bodyParser=require('body-parser');

app.use(bodyParser.json());


var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'EmployeeDB',
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB Connection success')
    }
    else{
        console.log('Failed')
    }
});

app.listen(3000,()=>console.log('running on 3000'));

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err,rows,fields)=>{
        if(!err){
            res.send(rows)
            console.log(rows);
            
        }
        else{
            console.log(err);
        }
    })
});

app.post('/employees',(req,res)=>{
console.log(req.body)

    var sql="Insert into Employee (Name,Email,Salary) Values('"+req.body.name+"','"+req.body.email+"','"+req.body.salary+"')"
    mysqlConnection.query(sql,(err,rows,fields)=>{
        if(!err){
            res.send(rows)
            console.log(rows);
            
        }
        else{
            console.log(err);
        }
    })
})