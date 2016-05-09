# in-parallel
A node module for running async tasks on an array and finishing together to run a final function.

## Installation

  npm install in-parallel --save

## Usage
  ```javascript
	//the proceedAfterParallelAction() method is provided
	var inParallel = require('scapegoat');

	//A very simple use case
	var collection = [1,2,3];
	inParallel.run(collection, function(element){
		element++;
		this.proceedAfterParallelAction();
	}, function(){
		collection.push(5);
	});
  
  	//a less simple use case with a MongoDB query
  	var users = [user1,user2,user3];
  	inParallel.run(users, function(user){
		//find the user's photos
		db.collection(PHOTOS_COLLECTION).findOne(searchQuery,function(err, doc) {
			if(err || !doc) {
			    	//handle the error
			    	if(err) console.log("Failed to find one doc: " + err.message);
		    		//call the provided proceed method after this user is done 
			   	this.proceedAfterInParallelAction();
			} else {
				//find succeeded
				//do something with the result
				
				//call the provided proceed method after this user is done 
			  	this.proceedAfterInParallelAction();
			}
		});
	}, function(){
		//everything is done
		//do something afterwards
		console.log("FINISHED!");
	}, function(err){
		//error. handle it
		console.log(err.message)
	});
```

## Config

###Debug Messages
  Debug messages are printed to the console by default but you can choose not have that like so:
  ```javascript
  	inParallel.config({showDebugMessages:false});
  ```

  

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
