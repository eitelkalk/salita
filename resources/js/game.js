function Game(model, view) {
	this.model = model;
	this.view = view;
	this.model.controller = this;
	
	this.queuedBuilding = "";
	this.queuedPerson = "";
	
	this.build = function (building, i, j, builder) {
		//TODO builder of churches etc. must be city
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
			building.owner = builder;
			builder.buildings.push(building);
			map.set(building, i, j);
			this.model.log(LAN.get(building.name) + " " + LAN.get("built") + ".");
		}
		this.view.highlight = false;
		this.view.update(this.model);
	}
	
	this.buy = function (product, amount, buyer) {
		var canBuy = true;
		var multipliedCosts = this.multiplyCosts(product.costs, amount);
		for (var i = 0; i < multipliedCosts.length; i++) {
			canBuy &= buyer.hasEnough(multipliedCosts[i]);
		}
		if (canBuy) {
			for (var i = 0; i < multipliedCosts.length; i++) {
				buyer.reduce(multipliedCosts[i]);
			}
			buyer.applyTime(product.time * amount);
			buyer.augment({"name" : product.name, "value" : amount});
			this.model.log(LAN.get("log-bought-success", [amount, LAN.get(product.name)]));
		} else {
			this.model.log(LAN.get("log-bought-fail", [amount, LAN.get(product.name)]));
		}
		this.view.update(this.model);
	}
	
	this.sell = function (product, amount, seller) {
		var canSell = true;
		var multipliedCosts = this.multiplyCosts(product.costs, amount);
		canSell &= seller.hasEnough({"name" : product.name, "value" : amount});
		if (canSell) {
			for (var i = 0; i < multipliedCosts.length; i++) {
				seller.augment(multipliedCosts[i]);
			}
			seller.applyTime(product.time * amount);
			seller.reduce({"name" : product.name, "value" : amount});
			this.model.log(LAN.get("log-sold-success", [amount, LAN.get(product.name)]));
		} else {
			this.model.log(LAN.get("log-sold-fail", [amount, LAN.get(product.name)]));
		}
		this.view.update(this.model);
	}
	
	this.multiplyCosts = function (costs, multi) {
		var multipliedCosts = [];
		for (var i = 0; i < costs.length; i++) {
			var cost = costs[i];
			var multipliedCost = {};
			multipliedCost.name = cost.name;
			multipliedCost.value = cost.value * multi;
			multipliedCosts[i] = multipliedCost;
		}
		return multipliedCosts;
	}
	
	this.marry = function (person) {
		if (person.family.hasAFreeHome()) {
			var spouse = this.findSuitableSpouse(person, family);
			if ("undefined" === typeof spouse) {
					this.model.log(LAN.get("log-marriage-fail", [person.name + " " + person.family.name]));
			} else {
				var cost = this.marriageCosts(family, person.family);
				person.family.reduce(cost);
				family.augment(cost);
				var args = [person.name, person.family.name, spouse.name, spouse.family.name, cost.value, LAN.get(cost.name)];
				this.model.log(LAN.get("log-marriage-success", args));
				person.marry(spouse); //time applied to the two there
				//TODO family power
			}
		} else {
			this.model.log(LAN.get("log-marriage-denied", [person.name]));
		}
		this.view.update(this.model);
	}
	
	this.findSuitableSpouse = function (person) {
		var possibleSpouses = []
		for (var i = 0; i < this.model.families.length; i++) {
			var family = this.model.families[i];
			if (family !== person.family) {
				var cost = this.marriageCosts(family, person.family);
				if (person.family.hasEnough(cost)) {
					for (var j = 0; j < family.members.length; j++) {
						var tmp = family.members[j];
						if (tmp.age >= 14 * YEAR && tmp.gender !== person.gender && tmp.spouse == "none") {
							possibleSpouses.push(tmp);
						}
					}
				}
			}	
		}
		return selectRandomlyFrom(possibleSpouses); 
		//TODO what is a good choice?
	}
	
	this.marriageCosts = function (fam, ily) {
		var cost = {};
		cost.name = "gold";
		cost.value = (fam.power - ily.power + 1) * 100;
		return cost;
	}
	
	this.begetChildren = function (woman) {
		if (woman.family.hasAFreeHome()) {
			var child = woman.giveBirth();
			this.model.log(LAN.get("log-children-success", [child.name]));
		} else {
			this.model.log(LAN.get("log-children-denied", [woman.name, woman.spouse.name]));
		}
		this.view.update(this.model);
	}
	
	this.educate = function (person, building) {
		if (building.category == "shop" && building.canEducate(person)) {
			building.educate(person);
			person.applyTime(person.job.time);
			var args = [person.name, LAN.get(person.job.name), LAN.get(building.name)];
			this.model.log(LAN.get("log-works-at", args));
		}
		this.queuedPerson = "";
		this.view.highlight = false;
		this.view.update(this.model);
	}
	
	this.produce = function (building, product) {
		if (building.category == "shop" && building.canProduce(product)) {
			building.produce(product);
			var args = [1, LAN.get(product.name), LAN.get(building.name)]; //TODO product value
			this.model.log(LAN.get("log-produce-success", args));
		} else {
			//TODO
		}
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