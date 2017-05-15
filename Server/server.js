var express=require('express')
//var mongoose =require('mongoose')
var bodyParser=require('body-parser')
var morgan=require('morgan')
var fs      = require( 'fs' );
var path        = require("path");
var mysql       = require("mysql");

var app=express();
/*mongoose.connect('mongodb://localhost:27017/projecttracking',()=>{
    console.log("Mongoose Connected")
}); 
 mongoose.Promise = require("bluebird");*/
/*
** Local config **
* server 
* MySql connection
*/

 var port = process.env.PORT | 3000;
    var server = app.listen(port,'0.0.0.0',function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log("Server listen to : "+host+":"+port);
    }); 
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"rolls_royce"
    });

var router=express.Router();


 var server = require('http').createServer(app);
var io = require('socket.io')(server);   
server.listen(2016);

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("X-powered-by", "FORTUNE");
        next();
    })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use('/api', router);
var port = process.env.PORT || 8080; 

app.get('/',function(req,res){
    res.send("Welcome to Express Server")
})

/*var userSchema=require('./schemas/user_schema')
var projectSchema=require('./schemas/project_schema')
var requirementSchema=require('./schemas/requirement_schema')*/

var userAPI=require('./apis/user_api').userCRUD(app, router, con);
/*var projectAPI=require('./apis/project_api').projectCRUD(app,router,projectSchema);
var requirementAPI=require('./apis/requirement_api').requirementCRUD(app,router,requirementSchema,userSchema,io);*/

app.listen(port,function(){
  console.log("Server Started on Port http://localhost:"+port)  
})

  module.exports = router;