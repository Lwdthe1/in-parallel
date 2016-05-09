var should = require('chai').should(),
    inParallel = require('../index'),
    run = inParallel.run;

describe('#run', function() {
  it('Runs the parallel action over all the elements in the collection (array) and finishes with onFinish() after all elements have finished.', function() {
    var collection = [1,2,3];
    run(collection, function(element){
    	element++;
        this.proceedAfterInParallelAction();
    }, function(){
    	collection.push(5);
    }).should.equal([2,3,4,5]);
  });
});
