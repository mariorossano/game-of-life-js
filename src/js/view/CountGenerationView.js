function CountGenerationView(el, model){
	var self = this;
	this.el = el; 
	this.model = model;
	this.model.on('change', function(){ self.render(); });
}

CountGenerationView.prototype.render = function() {
	$('.value', this.el).html(this.model.generation)
};