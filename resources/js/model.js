function Model() {
	this.map = new Map(50, 25);
	this.logger = [];
	this.LOG_HISTORY = 100;
	
	this.getPlayerFamily = function () {
		return this.families[0];
	}
	
	this.init = function () {
		//TODO load stored data
		this.city = START_CITY;
		this.families = START_FAMILIES;
		this.market = MARKET;
		
		for (var i = 0; i < this.families.length; i++) {
			this.families[i].model = this;
		}
		this.initBuildings(START_BUILDINGS);
		this.city.families = this.families;
		this.city.model = this;
		
		//Buildings possible for the player to build
		this.possibleBuildings = []
		for (var i = 0; i < BUILDINGS.length; i++) {
			var building = BUILDINGS[i];
			if (!building.name.includes("PC")) {
				this.possibleBuildings.push(building);
			}
		}
		
		var result = new Result(this.getPlayerFamily(), this.city.time, "log-new-family-success", [this.getPlayerFamily().name]);
		this.log(result);
	}
	
	this.initBuildings = function (buildingData) {
		this.buildings = [];
		for (var i = 0; i < buildingData.length; i++) {
			var building = buildingData[i].building;
			var row = buildingData[i].i;
			var col = buildingData[i].j;
			this.map.set(building, row, col);
			this.buildings.push(building);
		}
	}
	
	this.canBeBuiltByPlayer = function (building) {
		var costs = building.costs;
		var canBuild = true;
		for (var index = 0; index < costs.length; index++) {
			if (!this.getPlayerFamily().hasEnough(costs[index])) {
				canBuild = false;
			}
		}
		return canBuild;
	}
	
	this.log = function (event) {
		this.logger.unshift(event);
		while (this.logger.length > this.LOG_HISTORY) {
			this.logger.pop();
		}
		this.controller.eventLogged(event);
	}
	
	this.simulateNewFamily = function (time, cityPower) {
		var probability = cityPower / (YEAR) * (time / YEAR); //TODO
		if (Math.random() < probability) {
			var family = createFamily(getInfiniteResources());
			var house = createFirstHomeForNewFamily(family, "PC");
			var coords = this.map.getFreeRandomTile();
			this.map.set(house, coords[0], coords[1]);
			var result = new Result(family, this.city.time, "log-new-family-success", [family.name], 0);
			this.log(result);
		}
	}
	
	this.simulate = function (family) {
		while (family.simulationTime > 0) {
			var result = this.performRandomAction(family);
			if (result.text.includes("success")) {
				this.log(result);
			}
			family.simulationTime -= result.time;
		}
	}
	
	this.performRandomAction = function (family) {
		var familyShops = this.getBuildings(family.buildings, "shop");
		var producers = this.getShopsThatCanProduceFor(familyShops, family);	
		var allTheShops = this.getBuildings(this.buildings, "shop");
		var possibleMoms = this.getProlificWomen(family);
		var members = this.getMarriageWantingMembers(family);

		var actions = ["build", "none"];
		if (family.hasAFreeHome() && members.length > 0) { 
			actions.push("marry");
		}
		if (possibleMoms.length > 0) {
			actions.push("beget");
		}
		if (allTheShops.length > 0) {
			for (var i = 0; i < family.members.length; i++) {
				actions.push("educate");
			}
		}
		if (producers.length > 0) {
			for (var i = 0; i < familyShops.length; i++) {
				actions.push("produce");
			}
		}
		switch (selectRandomlyFrom(actions)) {
			case "produce" :
				return this.simulateProduction(family, producers);
			case "build" :
				return this.simulateBuild(family);
			case "marry" :
				return this.simulateMarriage(members);
			case "beget" :
				return this.simulateBirth(possibleMoms);
			case "educate" :
				return this.simulateEducation(family, allTheShops);
			default:
				return new Result(family, this.city.time, "fail", [], YEAR);
		}
	}
	
	this.getBuildings = function (buildings, category) {
		var b = [];
		for (var i = 0; i < buildings.length; i++) {
			var building = buildings[i];
			if (building.category == category) {
				b.push(building);
			}
		}
		return b;
	}
	
	this.getShopsThatCanProduceFor = function (shops, family) {
		var producers = [];
		for (var i = 0; i < shops.length; i++) {
			var building = shops[i];
			for (var j = 0; j < family.members.length; j++) {
				var person = family.members[j];
				if (person.job.workplace == building && person.job.name == "foreman") {
					producers.push(building);
				}
			}
		}
		return producers;
	}
	
	this.simulateProduction = function (family, producers) {
		var shop = selectRandomlyFrom(producers);
		var product = selectRandomlyFrom(shop.products);
		return this.produce(shop, product);
	}
	
	this.simulateBuild = function (family) {
		var building;
		if (!family.hasAFreeHome()) {
			building = getNewBuilding(selectRandomlyFrom(this.getHomeNames()));
		} else {
			building = getNewBuilding(selectRandomlyFrom(this.getShopNames()));
		}
	
		var coords = this.map.getFreeRandomTile();
		return this.build(building, coords[0], coords[1], family);
	}
	
	this.getHomeNames = function () {
		var homeNames = [];
		for (var i = 0; i < BUILDINGS.length; i++) {
			var building = BUILDINGS[i];
			if (building.category == "home" && building.name.includes("PC")) {
				homeNames.push(building.name);
			}
		}
		return homeNames;
	}
	
	this.getShopNames = function () {
		var shopNames = [];
		for (var i = 0; i < BUILDINGS.length; i++) {
			var building = BUILDINGS[i];
			if (building.category == "shop") {
				shopNames.push(building.name);
			}
		}
		return shopNames;
	}
	
	this.simulateMarriage = function (members) {
		return this.marry(selectRandomlyFrom(members));
	}
	
	this.getMarriageWantingMembers = function (family) {
		var members = [];
		for (var i = 0; i < family.members.length; i++) {
			var m = family.members[i];
			if (m.spouse == "none") {
				members.push(m);
			}
		}
		return members;
	}
	
	this.simulateBirth = function (possibleMoms) {
		return this.begetChildren(selectRandomlyFrom(possibleMoms));
	}
	
	this.getProlificWomen = function (family) {
		var women = [];
		for (var i = 0; i < family.members.length; i++) {
			var m = family.members[i];
			if (m.spouse !== "none" && m.gender == "female" && m.age < 42*YEAR) {
				women.push(m);
			}
		}
		return women;
	}
	
	this.simulateEducation = function (family, shops) {
		return this.educate(selectRandomlyFrom(this.getPossiblePersons), selectRandomlyFrom(shops));
	}
	
	this.getPossiblePersons = function (family) {
		var journeymen = this.getPersons(family, "journeyman");
		if (journeymen.length > 0) {
			return journeymen;
		}
		var apprentices = this.getPersons(family, "apprentice");
		if (apprentices.length > 0) {
			return apprentices;
		}
		return family.members;
	}
	
	this.getPersons = function (family, job) {
		var persons = [];
		for (var i = 0; i < family.members.length; i++) {
			var p = family.members[i];
			if (p.job == "none") {
				if ("none" == job) {
					persons.push(p);
				}
			} else {
				if (p.job.name == job) {
					persons.push(p);
				}
			}
		}
		return persons;
	}
	
	this.build = function (building, i, j, builder) {
		var canBuild = this.map.isEmpty(i, j) && builder.hasEnoughTime();
		var costs = building.costs;
		var time = building.time;
		for (var index = 0; index < costs.length; index++) {
			canBuild &= builder.hasEnough(costs[index]);
		}
		if (canBuild) {
			for (var index = 0; index < costs.length; index++) {
				builder.reduce(costs[index]);
			}
			builder.applyTime(time);
			building.owner = builder;
			builder.buildings.push(building);
			this.map.set(building, i, j);
			return new Result(builder, this.city.time, "log-building-success", [LAN.get(building.name)], time);
		}
		return new Result(builder, this.city.time, "log-building-fail", [LAN.get(building.name)]);
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
			var time = product.time * amount;
			buyer.applyTime(time);
			buyer.augment({"name" : product.name, "value" : amount});
			return new Result(buyer, this.city.time, "log-bought-success", [amount, LAN.get(product.name)], time);
		}
		return new Result(buyer, this.city.time, "log-bought-fail", [amount, LAN.get(product.name)]);
	}
	
	this.sell = function (product, amount, seller) {
		var canSell = true;
		var multipliedCosts = this.multiplyCosts(product.costs, amount);
		canSell &= seller.hasEnough({"name" : product.name, "value" : amount});
		if (canSell) {
			for (var i = 0; i < multipliedCosts.length; i++) {
				seller.augment(multipliedCosts[i]);
			}
			var time = product.time * amount;
			seller.applyTime(time);
			seller.reduce({"name" : product.name, "value" : amount});
			return new Result(seller, this.city.time, "log-sold-success", [amount, LAN.get(product.name)], time);
		}
		return new Result(seller, this.city.time, "log-sold-fail", [amount, LAN.get(product.name)]);
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
			var spouse = this.findSuitableSpouse(person);
			if ("undefined" === typeof spouse) {
				return new Result(person.family, this.city.time, "log-marriage-fail", [person.name]);
			} else {
				var family = spouse.family;
				var cost = this.marriageCosts(family, person.family);
				var args = [person.name, person.family.name, spouse.name, spouse.family.name, cost.value, LAN.get(cost.name)];
				person.family.reduce(cost);
				family.augment(cost);
				person.marry(spouse);
				var time = YEAR;
				person.applyTime(time);
				spouse.applyTime(time);
				return new Result(person.family, this.city.time, "log-marriage-success", args, 2*time);
			}
		}
		return new Result(person.family, this.city.time, "log-marriage-denied", [person.name]);
	}
	
	this.findSuitableSpouse = function (person) {
		var possibleSpouses = []
		for (var i = 0; i < this.families.length; i++) {
			var family = this.families[i];
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
			if (woman.age < 42 * YEAR && woman.spouse.age < 60 * YEAR) {
				var child = woman.giveBirth();
				var numberOfMonthsTillSuccess = Math.floor(Math.random() * 5) + 1;
				var overallTime = (numberOfMonthsTillSuccess + 10) * MONTH;
				woman.applyTime(overallTime);
				woman.spouse.applyTime(overallTime);
				child.applyTime(15 * YEAR); //TODO less with school
				return new Result(woman.family, this.city.time, "log-children-success", [child.name], overallTime*2 + 15 * YEAR);
			} else {
				return new Result(woman.family, this.city.time, "log-children-too-old", [woman.name, woman.spouse.name]);
			}
		}
		return new Result(woman.family, this.city.time, "log-children-denied", [woman.name, woman.spouse.name]);
	}
	
	this.educate = function (person, building) {
		if (building.category == "shop" && building.canEducate(person)) {
			building.educate(person);
			var time = person.job.time;
			person.applyTime(time);
			var args = [person.name, LAN.get(person.job.name), LAN.get(building.name)];
			return new Result(person.family, this.city.time, "log-educate-success", args, time);
		}
		var args = [person.name, LAN.get(building.name)];
		return new Result(person.family, this.city.time, "log-educate-denial", args);
	}
	
	this.produce = function (building, product) {
		var result = 0;
		if (building.category == "shop" && building.canProduce(product)) {
			building.produce(product);
			var time = YEAR; //TODO always 1 year?
			building.applyTime(time);
			var args = [product.value, LAN.get(product.name), LAN.get(building.name)];
			return new Result(building.owner, this.city.time, "log-produce-success", args, time);
		}
		return new Result(building.owner, this.city.time, "log-produce-denial");
	}
}

function Result(family, cityTime, text, args, time) {
	this.family = family;
	this.cityTime = cityTime;
	this.text = text;
	this.args = args || [];
	this.time = time || 0;
}