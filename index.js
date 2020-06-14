app=require("express");
const {db}=require("./conn.js")
require("ejs");
server=app();
//Set View Engine To EJS
server.set("view engine", "ejs");
//Set Static Directory
server.use(app.static(__dirname));
const bodyParser= require('body-parser');
server.use(bodyParser.urlencoded({extended:true}))
const url = require('url');


server.get("/create",(req,res)=>{
    console.log("fasddsfasd");
    res.render("createhtml");
});
server.get("/update/:names/submit",(req,res)=>{
    res.redirect('displayall')

})
server.post('/update/submit',(req,res)=>{
    db.query("update users set email='"+req.body.email+"', password='"+req.body.password+"' where username='"+req.body.username +"'")
    res.redirect('/displayall/')
})
server.get("/update/:names",(req,res)=>{
    res.render('update',{'name':req.params.names})

})
server.post("/createdata",(req,res)=>{

    console.log("got it");
    username=req.body.username;
    password=req.body.password;
    email=req.body.email;
    
    db.query(`insert into users (username,email,password) values('${username}','${email}','${password}')`,(err,result)=>{
        if(err)
            console.log(err)

    });
    res.redirect('/create')
})


server.get("/displayall",(req,res)=>{
    db.query('select * from users',(err,result)=>{
       // console.log(result[]['username'])
       console.log(result)
        res.render("displayall",{'userdetails':result})
    });

});
server.get('/delete/:names',(req,res)=>{
    
    console.log("redafljasdlfkjasdlfja;sljdf"+req.params.names)
    db.query("delete from users where username ='"+ req.params.names+"'",(err)=>
    {
        console.log(err)
    });
    res.redirect("/displayall")
    


})








server.get('/about', function(req, res) {  res.render('hello');});


server.listen(
    3000,(err,res)=>{
        if(err){
            console.log("some thing went wrong");
        }
        else{
            console.log("started")
        }

    }
);