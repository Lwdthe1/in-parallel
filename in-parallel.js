function runInParallel(collection, parallelAction, onFinish, handleError){
	if(collection && isFunction(parallelAction) && isFunction(onFinish)) {
		if(collection.length > 0) {
			consoleLog("runInParallel", "Running actions in parallel.");
			collection.parallelErrorsMap99 = {};
			var numElements = collection.length;
			var numElementsCompleted = 0;

			var proceed = function() {
				numElementsCompleted++;
				
				//check if all parallel actions are complete
				if(numElementsCompleted == numElements) {
					//delete the proceed function from the collection as we are done
					delete collection.proceedAfterParallelAction;
					//run the onFinish function
					onFinish();
				}
			}

			/*add the proceed function to the collection 
			for each parallel action to call when it finishes with an element*/
			collection.proceedAfterParallelAction = proceed;

			//run the parallel action on each element of the collection
			for(var i = 0; i < numElements; i++) {
				var currentElement = collection[i];
				if(currentElement) {
					//run the parallel action on the element in background
					setTimeout(parallelAction(currentElement), 0);
				}
			}
		} else {
			consoleLog("runInParallel", "Provided collection is empty.", true);
			if(isFunction(handleError)) {
				//an error handler was provided. handle the error as desired.
				handleError({message:"Provided collection is empty."});
			} else {
				//no error handler was provided. Handle the error by calling the onFinish method by default
				onFinish();
			}
		}
	} else {
		consoleLog("runInParallel", "Missing necessary arguments. No collection provided.", true);
		if(isFunction(handleError)) handleError({message:"Missing necessary arguments: " + collection + " " + parallelAction + " " + onFinish});
	}
}
