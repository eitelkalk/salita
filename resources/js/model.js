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
		this.persons = START_PERSONS;
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
	}
	
	this.initBuildings = function (buildingData) {
		for (var i = 0; i < buildingData.length; i++) {
			var building = buildingData[i].building;
			var row = buildingData[i].i;
			var col = buildingData[i].j;
			this.map.set(building, row, col);
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
}