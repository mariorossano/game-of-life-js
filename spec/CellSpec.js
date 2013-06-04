describe("Cell", function() {
  
  describe('constructor', function(){
    
    it('with no arguments the cell created is dead', function(){
      expect(new Cell().isAlive()).toBeFalsy();
    });

  });

  describe('evolve', function(){

      describe('alive cell', function(){
        var cell;

        beforeEach(function(){
          cell = new Cell(true);
        });

        it('must die if it has less than 2 neighbors alive', function(){
          expect(cell.evolve(1).isAlive()).toBeFalsy();
        });

        it('must die if it has more than three neighbors alive', function(){
          expect(cell.evolve(4).isAlive()).toBeFalsy();
        });

        it('remain alive if it has 2 neighbors alive', function(){
          expect(cell.evolve(2).isAlive()).toBeTruthy();
        });

        it('remain alive if it has 3 neighbors alive', function(){
          expect(cell.evolve(3).isAlive()).toBeTruthy();
        });

      });

      describe('dead cell', function(){
        var cell;

        beforeEach(function(){
          cell = new Cell(false);
        });

        it('must die if it has less than 3 neighbors alive', function(){
          expect(cell.evolve(2).isAlive()).toBeFalsy();
        });

        it('must die if it has more than 3 neighbors alive', function(){
          expect(cell.evolve(4).isAlive()).toBeFalsy();
        });

        it('must come to live if it has 3 neighbors alive', function(){
          expect(cell.evolve(3).isAlive()).toBeTruthy();
        });

      });

  });

});