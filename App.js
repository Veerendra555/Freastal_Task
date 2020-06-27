var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');
var mysql=require('mysql');
var app=express();

//My  Sql Connection
var MyConn=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'root',
   database:'Student'
})
MyConn.connect((err)=>{
    console.log((!err)?'Connection created Successfully':"Connection error"+err);
})

// //set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
 
// Featch Data 
app.get('/',(req, res) => {
    let sql='select * from student';
    let query=MyConn.query(sql,(err,row)=>{
        if(err) throw  err
        res.render('Student_index',{
            title:"Student Details",
            users:row
        })
    })
})

//Add Student Details
app.get('/add',(req, res) => {
    res.render('Student_Details', {
        title : 'Student Registraion'
    });
});
 
//Save Student Details
app.post('/save',(req, res) => { 
  let data={sid:req.body.id,name:req.body.name,age:req.body.age}
    let sql = "insert into student set ?";
    let query = MyConn.query(sql,data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});
 
//Edit Student Details
app.get('/edit/:sid',(req, res) => {
    const sid = req.params.sid;
    let sql = `Select * from student where sid = ${sid}`;
    let query = MyConn.query(sql,(err, result) => {
        if(err) throw err;
        res.render('Student_edit', {
            title : 'Edit Details Here',
            user : result[0]
        });
    });
});

//Update Student Deatails

app.post('/update',(req, res) => {
    const sid = req.body.id;
    let sql = "update student SET sid='"+req.body.id+"',  name='"+req.body.name+"', age='"+req.body.age+"' where sid ="+sid;
    let query = MyConn.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

// Delete Student Details
app.get('/delete/:sid',(req, res) => {
    const sid = req.params.sid;
    let sql = `DELETE from student where sid = ${sid}`;
    let query = MyConn.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});

// Server Listening
app.listen(3000,(err)=>{
           console.log((!err)?'Server run on port number 3000':'Error'+err);
 })