function WorldView(el, model){
	var self = this;

	this.el = el;
	this.model = model;
	
	this.blockHeight = this.el.width() / this.model.height;
	this.blockWidth = this.el.height() / this.model.width;

	this.canvas = this.el;
	
	this.model.on('change', function(){ 
		self.render(); 
	});
}

WorldView.prototype.clear = function(){
	this.canvas.clearCanvas();	
}

WorldView.prototype.render = function() {
	this.clear();

	var x, y;
	
	for(x = 0; x < this.model.width; x++){
		
		for(y = 0; y < this.model.height; y++){
			this.canvas.drawRect({
				fillStyle: this.model.cellAt(x, y).isAlive() ? "#000" : "#fff",
				x: x * this.blockWidth, y: y * this.blockHeight,
				width: this.blockWidth - 1,
				height: this.blockHeight - 1,
				fromCenter: false,
				strokeStyle: "#36a",
  				strokeWidth: 1,
  				cornerRadius: 0
			});
		}
		
	}
};