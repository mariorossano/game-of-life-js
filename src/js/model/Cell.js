function Cell(isAlive){
	this.status = isAlive || false;
}

Cell.prototype.isAlive = function(){
	return this.status;
}

Cell.prototype.evolve = function(countOfNeighboirsAlive){
	var willAlive = false;
	
	if(this.isAlive()){
		if(countOfNeighboirsAlive == 2 || countOfNeighboirsAlive == 3){
			willAlive = true;
		}else{
			willAlive = false;
		}
	}else{
		if(countOfNeighboirsAlive == 3){
			willAlive = true;
		}else{
			willAlive = false;	
		}
	}

	return new Cell(willAlive);
}