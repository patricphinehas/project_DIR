var express = require('express');
var router = express.Router();
var sqlstring = require('sqlstring');
var mysql = require('mysql');


var con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'sharmi'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registerid');
});

router.get('/registerid',function(req,res){

  con.query('use hospitalrecord',function(err,res){
    if(err) throw err;
    
    con.query('select * from acclogin where id=?',req.query.username,function(error,results){
      if(error) throw error;
      else{
        console.log("results:",results);
        if(results.length > 0){
          console.log('id already exists');
        }
        else{
          console.log(req.query.username+ "-------" + req.query.password);

          con.query('insert into acclogin (id,password,privilege) values(?,?,?)',[req.query.username,req.query.password,0],function(er,re){
            if(er) throw er;
            else{
              console.log("signup success"); 
            }
          });
          
        }
      }
    })
  });
  res.render('index');
});





module.exports = router;
