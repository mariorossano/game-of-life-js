describe('World', function(){

	it('constructor require a matrix of seeds, width and height, else throw \'invalid arguments\' error', function(){
		expect(new World([], 10, 10)).toBeDefined();

		expect(function(){
			new World([], 10)
		}).toThrow('invalid arguments');

		expect(function(){
			new World([], 10)
		}).toThrow('invalid arguments');

		expect(function(){
			new World(10)
		}).toThrow('invalid arguments');
	});

	it('has a height and width that is determined during the creation', function(){
		expect(new World([], 20, 10).height).toEqual(10);
		expect(new World([], 20, 10).width).toEqual(20);
	});

	it('cellAt return a cell at a given position', function(){
		var world = new World(
			[
				[new Cell(false), new Cell(true), new Cell(false)], //1st column
				[new Cell(false), new Cell(false), new Cell(false)], //2nd column
				[new Cell(false), new Cell(false), new Cell(false)] //..
			]
		, 3, 3);

		expect(world.cellAt(0, 1)).toEqual(new Cell(true));
	});

	it('has a counter of generation', function(){
		var world = new World(
			[
				[new Cell(false), new Cell(true), new Cell(false)], //1st column
				[new Cell(false), new Cell(false), new Cell(false)], //2nd column
				[new Cell(false), new Cell(true), new Cell(true)] //..
			]
		, 3, 3);

		world.evolve();
		expect(world.generation).toEqual(1);

		world.evolve();
		expect(world.generation).toEqual(2);
	});

	it('getCountOfAliveNeighbours return the number of alive neighbours cells', function(){
		var world = new World(
			[
				[new Cell(false), new Cell(true), new Cell(false)], //1st column
				[new Cell(false), new Cell(false), new Cell(false)], //2nd column
				[new Cell(false), new Cell(true), new Cell(true)] //..
			]
		, 3, 3);

		expect(world.getCountOfAliveNeighbours(1, 1)).toEqual(3);
	});

	describe('evolve', function(){

		it('evolve the world according to the rule of the world', function(){

			var world  = new World(
				[
					[new Cell(true), new Cell(true), new Cell(false)],
					[new Cell(true), new Cell(false), new Cell(false)],
					[new Cell(false), new Cell(false), new Cell(false)],
				]
				, 3, 3
			);

			world.evolve();

			expect(_.map(_.flatten(world.cells), function(item){ return item.isAlive(); })).toEqual([
				true, true, false, //1st column
				true, true, false, //2nd column
				false, false, false //..
			]);
			
		});

		it('test beacon for funny', function(){
			
			var cellsState1 = [
				[new Cell(true), new Cell(true), new Cell(false), new Cell(false)], //1st column
				[new Cell(true), new Cell(false), new Cell(false), new Cell(false)], //2nd column
				[new Cell(false), new Cell(false), new Cell(false), new Cell(true)],
				[new Cell(false), new Cell(false), new Cell(true), new Cell(true)]
			];

			var cellsState2 = [
				[new Cell(true), new Cell(true), new Cell(false), new Cell(false)],
				[new Cell(true), new Cell(true), new Cell(false), new Cell(false)],
				[new Cell(false), new Cell(false), new Cell(true), new Cell(true)],
				[new Cell(false), new Cell(false), new Cell(true), new Cell(true)]
			];

			var world  = new World(cellsState1, 4, 4);
			
			var count = 4;

			while(count--){
				world.evolve();
				expect(world.cells).toEqual(cellsState2);
				world.evolve();
				expect(world.cells).toEqual(cellsState1);				
			}

		});

	});

});