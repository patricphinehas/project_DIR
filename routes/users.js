var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sqlstring = require('sqlstring');

var con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'sharmi'
})

router.get('/auth', function (req, res) {
console.log(req.query.username);
  con.query('use hospitalrecord', function (err) {
    if (err) throw err;
  
    con.query('SELECT * FROM acclogin WHERE id = ?', req.query.username, function (error, results) {
      if (error) {
        // console.log("error ocurred",error);
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        //console.log('The solution is: ', results);
        if (results.length > 0) {
          if (results[0].password == req.query.password) {
            console.log("Login Success");
            res.render('dashboard');
          }
          else {
            res.send(
              "Password does not Match"
            );
          }
        }
        else {
          res.send(
            "Given id does not exits"
          );
          //res.render('dash');
        }
      }
    });
  });
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/reg',function(req,res){
  res.render('registerid');
});

// router.get('/registerid',function(req,res){

//   con.query('use hospitalrecord',function(err,res){
//     if(err) throw err;
    
//     con.query('select * from acclogin where id=?',req.query.username,function(error,results){
//       if(error) throw error;
//       else{
//         console.log("results:",results);
        
//         if(results.length > 0){
//           console.log('id already exists');
//         }
//         else{
//           con.query('insert into acclogin (id,password,privilege) values(?,?,?)',req.query.username,req.query.password,0,function(er,re){
//             console.log('signup success');
            
//           });
//         }
//       }
//     })
//   });
//   res.render('index');
// });

module.exports = router;
