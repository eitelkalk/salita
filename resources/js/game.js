function Game(model, view) {
	this.model = model;
	this.view = view;
	this.model.controller = this;
	
	this.queuedBuilding = "";
	this.queuedPerson = "";
	
	this.build = function (building, i, j, builder) {
		var result = this.model.build(building, i, j, builder);
		this.model.log(result);
		this.view.highlight = false;
		this.view.update(this.model);
	}
	
	this.buy = function (product, amount, buyer) {
		var result = this.model.buy(product, amount, buyer);
		this.model.log(result);
		this.view.update(this.model);
	}
	
	this.sell = function (product, amount, seller) {
		var result = this.model.sell(product, amount, seller);
		this.model.log(result);
		this.view.update(this.model);
	}
	
	this.marry = function (person) {
		var result = this.model.marry(person);
		this.model.log(result);
		this.view.update(this.model);
	}
	
	this.begetChildren = function (woman) {
		var result = this.model.begetChildren(woman);
		this.model.log(result);
		this.view.update(this.model);
	}
	
	this.educate = function (person, building) {
		var result = this.model.educate(person, building);
		this.model.log(result);
		this.queuedPerson = "";
		this.view.highlight = false;
		this.view.update(this.model);
	}
	
	this.produce = function (building, product) {
		var result = this.model.produce(building, product);
		this.model.log(result);
		this.view.update(this.model);
	}
	
	this.hideInfo = function () {
		this.view.showInfo = false;
		this.view.update(this.model);
	}
	
	this.toggleInfo = function (x, y) {
		this.view.toggleInfo(x, y, this.model.map);
		this.view.update(this.model);
	}
	
	this.zoom = function (direction, centerX, centerY) {
		this.view.zoom(direction, centerX, centerY);
		this.view.update(this.model);
	}
	
	this.start = function () {
		this.registerButtonActions();
		this.model.init();
		this.showContent(document.getElementById("map-button"));
		this.view.init();
		this.view.update(this.model);
	}
	
	this.eventLogged = function (event) {
		this.view.update(this.model);
	}
	
	this.registerButtonActions = function() {
		var buttons = document.getElementsByClassName("toolbar-button");
		for (var i = 0; i < buttons.length; i++) {
			(function (index) {
				buttons[index].onclick = function() {
					showContent(buttons[index]);
				}
			})(i);
		}
	}
	
	this.showContent = function (button) {
		this.view.showContent(button);
		this.view.update(this.model);
	}
	
	this.update = function () {
		this.view.update(this.model);
	}
}