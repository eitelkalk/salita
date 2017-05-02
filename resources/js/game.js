function Game(model, view) {
	this.model = model;
	this.view = view;
	this.queuedBuilding = "";
	
	this.build = function (building, i, j, builder) {
		var map = this.model.map;
		var canBuild = map.isEmpty(i, j);
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
			this.view.log(building.text + " gebaut.");
		}
		this.view.update(this.model);
	}
	
	this.start = function () {
		this.model.init();
		this.view.update(this.model);
	}
	
	this.log = function (event) {
		//TODO model.log
		this.view.log(event);
	}
}