const express = require('express');
const router =express.Router();
const User=require('../model/user');
const Appoint=require('../model/appointment');
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
var assert =require('assert');
var MongoClient = require('mongodb').MongoClient;
let hash;




var url = "mongodb://localhost:27017/";




router.get('/index',function(req,res){


	res.sendFile (__dirname+'/index.html');
});

router.post('/form',function(req,res){
	
      let hash = bcrypt.hashSync(req.body.Password, 10);
	 var userData = {
      name: req.body.Name,
      password: hash
    }
	
	User.create(userData,function(user,err){
		 
		
		res.sendFile (__dirname+'/login.html');
	
});
  
	
});


	router.get('/login',function(req,res){

	
	res.sendFile(__dirname+'/login.html');
});

router.post('/login',function(req,res){

 

MongoClient.connect(url, function(err, db) {
 var db=db.db('database');

  User.findOne({name:req.body.Name},function(err, result){

  	if (err) {
  return console.log("error: " + err);
}
  	if(result===null){
  		res.send("login invalid");
  	}
  	else {
  		if(bcrypt.compareSync(req.body.Password,result.password)){
	  //	res.send("welcome to profile"+"  "+req.body.Name);
			//res.send('test.html', {root: __dirname })
			res.redirect('/api/dat');
  	      }
  	      else
  	      	res.send("password incorrect");
  	  }
  	

   
  });
});
    
	});

	router.get('/dat',function(req,res){

		//res.send({type:'GET'});
		res.sendFile (__dirname+'/test.html');
	});
	
	router.post('/dat',function(req,res){
	  var ti=req.body.Time;
	  ti= ti.charAt(0)+ti.charAt(1);
	  var format=req.body.Date+" "+ti;
     
MongoClient.connect(url, function(err, db) {
	var db=db.db('database');
   
	 Appoint.findOne({name:format},function(err, result){
   
		 if (err) {
	 return console.log("error: " + err);
   }
		 if(result===null){
			var userData = {
				name: format,
				pname:req.body.Pname
			  }
			  
			  Appoint.create(userData,function(appointment,err){
				res.redirect('/api/Appointments');
				  
			  
		  });
		 }
		 else{
				   res.send("slot booked");
		   }
	  
	 });
   });
   router.get('/Appointments',function(req,res){

MongoClient.connect(url, function(err, db) {
	var db=db.db('database');
	assert.equal(null,err);
	db.collection('appointments').find({}, {name: false} ).toArray(function(err,result){
if(err) throw err;

res.writeHead(200,{"Content-Type":"text/html"});
res.end(JSON.stringify(result));
	});
	

	});
});

   


		
	   
	
	  
  });
  
  
router.put('/form/:id',function(req,res){

	res.send({type:'PUT'});
});

router.delete('/form/:id',function(req,res){

	res.send({type:'DELETE'});
});
module.exports=router;