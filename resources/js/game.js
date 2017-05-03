function Game(model, view) {
	this.model = model;
	this.view = view;
	this.model.controller = this;
	
	this.queuedBuilding = "";
	
	this.build = function (building, i, j, builder) {
		var map = this.model.map;
		var canBuild = map.isEmpty(i, j) && builder.hasEnoughTime();
		var costs = building.costs;
		var time = building.time;
		for (var index = 0; index < costs.length; index++) {
			if (!builder.hasEnough(costs[index])) {
				canBuild = false;
			}
		}
		if (canBuild) {
			for (var index = 0; index < costs.length; index++) {
				builder.reduce(costs[index]);
			}
			builder.applyTime(time);
			map.set(building, i, j);
			this.model.log(building.text + " gebaut.");
		}
		this.view.update(this.model);
	}
	
	this.buy = function (product, amount, buyer) {
		var canBuy = true;
		var multipliedCosts = this.multiplyCosts(product.costs, amount);
		for (var i = 0; i < multipliedCosts.length; i++) {
			if (!buyer.hasEnough(multipliedCosts[i])) {
				canBuy = false;
			}
		}
		if (canBuy) {
			for (var i = 0; i < multipliedCosts.length; i++) {
				buyer.reduce(multipliedCosts[i]);
			}
			buyer.applyTime(product.time * amount);
			buyer.augment(product.name, amount);
		}
		this.model.log(Math.abs(amount) + " " + product.text + " am Markt " + (amount >= 0 ? "ge" : "ver") + "kauft.");
		this.view.update(this.model);
	}
	
	this.multiplyCosts = function (costs, multi) {
		var multipliedCosts = [];
		for (var i = 0; i < costs.length; i++) {
			var cost = costs[i];
			var multipliedCost = {};
			multipliedCost.name = cost.name;
			multipliedCost.value = cost.value * multi;
			multipliedCost.text = cost.text;
			multipliedCosts[i] = multipliedCost;
		}
		return multipliedCosts;
	}
	
	this.start = function () {
		this.registerButtonActions();
		this.model.init();
		this.showContent(document.getElementById("map-button"));
		this.view.update(this.model);
	}
	
	this.eventLogged = function (event) {
		this.view.log(event);
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