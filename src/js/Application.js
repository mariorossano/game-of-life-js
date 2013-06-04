function boot(){

	var seeds = []

	var width = 25;
	var height = 25;

	var x, y, cell, row;
	
	for(x = 0; x < width; x++){
		column = []
		for(y = 0; y < height; y++){
			column.push(new Cell(Math.random() < 0.34));
		}
		seeds.push(column);
	}

	var world = new World(seeds, width, height);

	var worldView = new WorldView($('#view'), world);

	var countGenerationView = new CountGenerationView($('#count-view'), world);

	worldView.render(); countGenerationView.render();

	setInterval(function(){
		world.evolve();
	}, 1000);

}