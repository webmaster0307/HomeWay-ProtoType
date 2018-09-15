var express=require('express');
var app=express();
var bodyParser=require("body-parser");
var cors = require('cors');
var math=require('mathjs');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.json());
 
var data=null;

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  app.post('/calculate',(req,res)=>{
        console.log("Inside Calculate");
        try{
        var result=math.eval(req.body.expression);
        data=result;
        console.log(result);

        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end(""+ data);
        }catch(e){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error in evaluation");
        }

  });

  //start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");