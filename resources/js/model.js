function Model() {
	this.map = new Map(30, 25);
	this.logger = [];
	this.LOG_HISTORY = 100;
	
	this.getPlayerFamily = function () {
		return this.families[0];
	}
	
	this.getNewBuilding = function (name) {
		var build;
		for (var i = 0; i < BUILDINGS.length; i++) {
			if ( BUILDINGS[i].name == name) {
				build = BUILDINGS[i];
				break;
			}
		}
		
		var building = new Building();
		building.copyData(build);
		return building;
	}
	
	this.init = function () {
		//TODO load stored data
		this.city = START_CITY;
		this.families = START_FAMILIES;
		for (var i = 0; i < this.families.length; i++) {
			this.families[i].model = this;
		}
		this.buildings = START_BUILDINGS;
		this.persons = START_PERSONS;
		this.market = MARKET;
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
}