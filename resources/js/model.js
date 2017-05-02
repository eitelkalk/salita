function Model() {
	this.map = new Map(30, 25);
	
	this.getPlayerFamily = function () {
		return this.families[0];
	}
	
	this.getNewBuilding = function (name) {
		var i;
		var build;
		for (i = 0; i < BUILDINGS.length; i++) {
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
		this.buildings = START_BUILDINGS;
		this.persons = START_PERSONS;
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
}