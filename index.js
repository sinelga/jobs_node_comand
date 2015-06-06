#! /usr/bin/env node

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/remotejob';
var urlparser = require("url");

console.log('filesearch');
console.log(process.argv);
var userArgs = process.argv.slice(2);
var searchPattern = userArgs[0];
console.log(searchPattern);

MongoClient.connect(url,function(err, db) {
	assert.equal(null,err);
	
	var collection = db.collection('employers');

	
	collection.find({"manual":true}, function(err, resultCursor) {
	      resultCursor.each(function(err, result) {
	    	  
	    	  
	    	  var toparse = result;
	    	  
	    	  if (toparse !== null) { 
	    	  
	    		  if (toparse.hasOwnProperty('extlink')) {

	    			  
	    			  var hostname = urlparser.parse(toparse.extlink).hostname;
	    			  
//	    			  console.log(hostname);
	    			  
	    			  if (hostname ==='hire.jobvite.com') {
	    				  
	    				  console.log(toparse.extlink);
	    				  
	    			  }
	    			  
	    			  
	    			  
	    		  }
	    	  
	    	  } else {
	    		  db.close(); 
	    		  
	    	  }

	    	  

	      });
	
	});
	
	
});
	
