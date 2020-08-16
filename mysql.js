var mysql = require('mysql');
const { compare } = require('semver');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database:"line_api"
});
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var select = "select userID from customer";
  con.query(select, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result[0].userID);
  });
*/
  var insert = "INSERT INTO customer (id,userID,displayName,pictureUrl,active)VALUES (1,'ant','antdisplay','anturl',1)";
  con.connect(function(err){
    if(err){throw err;}
    con.query(insert, function(err,result){
      if(err) throw err;
      console.log("1 record insertd");
    });
  });
