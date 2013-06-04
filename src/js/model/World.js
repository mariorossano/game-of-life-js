function World(cells, width, height){
	if (!(cells instanceof Array) || typeof width != 'number' || typeof height != 'number'){
		throw new Error('invalid arguments')
	}

	eventuality(this);
	this.cells = cells;
	this.width = width 
	this.height = height 
	this.generation = 0;
}

World.prototype.cellAt = function(x, y) {
	return this.cells[x][y];	
};

World.prototype.evolve = function(){
	var x, y, new_cells = [], column;

	for(x = 0; x < this.cells.length; x++){
		column = [];
		for(y = 0; y < this.cells[x].length; y++){
			column.push(this.cells[x][y].evolve(this.getCountOfAliveNeighbours(x, y)));		
		}	
		new_cells.push(column);
	}
	this.cells = new_cells;

	this.generation++;
	
	this.trigger('change', [this]);
}

World.prototype.getCountOfAliveNeighbours = function(xPosition, yPosition){
	var x, y, cell, count = 0;

	for(x = 0; x < this.cells.length; x++){
		for(y = 0; y < this.cells[x].length; y++){
			cell = this.cells[x][y];

			if(cell.isAlive()){
				if(
					x == xPosition     && y == yPosition - 1 || // TOP
					x == xPosition + 1 && y == yPosition - 1 || // TOP-RIGHT
					x == xPosition + 1 && y == yPosition     || // RIGHT
					x == xPosition + 1 && y == yPosition + 1 || // BOTTOM-RIGHT
					x == xPosition     && y == yPosition + 1 || // BOTTOM
					x == xPosition - 1 && y == yPosition + 1 || // BOTTOM-LEFT
					x == xPosition - 1 && y == yPosition     || // LEFT
					x == xPosition - 1 && y == yPosition - 1    // TOP-LEFT
				){ 
					count++;
				}
			}
		}
	}

	return count;
}