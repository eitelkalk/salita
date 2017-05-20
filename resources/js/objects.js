function Person(family) {
	this.family = family;
	this.family.addPerson(this);
	this.parents = [];
	this.children = [];
	this.spouse = "none";
	this.job = "none";
	this.isAlive = true;
	
	this.hasEnough = function (cost) {
		return this.family.hasEnough(cost);
	}
	
	this.reduce = function (cost) {
		this.family.reduce(cost);
	}
	
	this.augment = function (cost) {
		this.family.augment(cost);
	}
	
	this.applyTime = function (time) {
		var feedingTimes = Math.floor((this.age + time)/ YEAR) - Math.floor(this.age / YEAR); //TODO every year?
		this.age += time;
		if (this.age >= this.maxAge || !this.canBeFed(feedingTimes)) {
			this.die();
		} else {
			this.feed(feedingTimes);
		}
		this.family.processTime(time);
	}
	
	this.die = function () {
		this.home.removeResident(this);
		this.removeFromParents();
		this.removeFromChildren();
		this.family.dies(this);
	}
	
	this.removeFromParents = function () {
		for (var i = 0; i < this.parents.length; i++) {
			var parent = this.parents[i];
			var index = parent.children.indexOf(this);
			parent.children.splice(index, 1);
		}	
	}
	
	this.removeFromChildren = function () {
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];
			var index = child.parents.indexOf(this);
			child.parents.splice(index, 1);
		}
	}
	
	this.canBeFed = function (number) {
		var can = true;
		var costs = this.getFood(number);
		for (var i = 0; i < costs.length; i++) {
			can &= this.family.hasEnough(costs[i]);
		}
		return can;
	}
	
	this.getFood = function (number) {
		//TODO
		var costs = [];
		costs.push({"name" : "bread",	"value" : number * 10});
		costs.push({"name" : "cake",	"value" : number * 1});
		costs.push({"name" : "meat",	"value" : number * 10});
		costs.push({"name" : "beer",	"value" : number * 10});
		costs.push({"name" : "shoe",	"value" : number * 1});
		costs.push({"name" : "clothes",	"value" : number * 1});
		return costs;
	}
	
	this.feed = function (number) {
		var costs = this.getFood(number);
		for (var i = 0; i < costs.length; i++) {
			this.family.reduce(costs[i]);
		}
	}
	
	this.hasEnoughTime = function () {
		return this.maxAge >= this.age;
	}
	
	this.marry = function (spouse) {
		var family = spouse.family;
		family.removePerson(spouse);
		spouse.family = this.family;
		spouse.spouse = this;
		spouse.home.removeResident(spouse);
		this.family.findFreeHome().addResident(spouse);
		this.spouse = spouse;
		this.family.addPerson(spouse);
		var power = Math.sign(this.family.power - family.power);
		family.power += power;
	}
	
	this.giveBirth = function () {
		var home = this.family.findFreeHome();
		var child = createPerson(this.family, 0);
		home.addResident(child);
		this.children.push(child);
		this.spouse.children.push(child);
		child.parents.push(this);
		child.parents.push(this.spouse);
		return child;
	}
}

function Family(startResources, startTime, city) {
	this.resources = startResources;
	this.time = startTime;
	this.simulationTime = 0;
	this.city = city;
	this.members = [];
	this.buildings = [];
	this.city.addFamily(this);
	this.willDie = [];
	this.canDie = true;
	
	this.hasEnough = function (cost) {
		var res = this.findResource(cost.name);
		return res.value >= cost.value;
	}
	
	this.hasEnoughTime = function () {
		return this.members.length > this.willDie;
	}
	
	this.reduce = function (cost) {
		var res = this.findResource(cost.name);
		res.value -= cost.value;
	}
	
	this.augment = function (cost) {
		var res = this.findResource(cost.name);
		res.value += cost.value;
	}
	
	this.findResource = function (name) {
		var res;
		for (var i = 0; i < this.resources.length; i++) {
			res = this.resources[i];
			if (res.name == name) {
				return res;
			}
		}
	}
	
	this.applyTime = function (time) {
		this.canDie = false;
		var l = this.members.length;
		var personalTime = splitRandomly(time, this.members.length);
		for (var i = 0; i < this.members.length; i++) {
			this.members[i].applyTime(personalTime[i]);
		}
		this.canDie = true;
		this.letMyPeopleGo();
		this.city.processTime(this, time);
	}
	
	this.processTime = function(time) {
		this.time += time;
		this.city.processTime(this, time);
	}
	
	this.sum = function (array) {
		var s = 0;
		for (var i = 0; i < array.length; i++) {
			s += array[i];
		}
		return s;
	}
	
	this.letMyPeopleGo = function () {
		while (this.willDie.length > 0) {
			var iDieNow = this.willDie.pop();
			iDieNow.isAlive = false;
			var index = this.members.indexOf(iDieNow);
			this.members.splice(index, 1);
			var event = new Result(this, this.city.time, "log-die-success", [iDieNow.name, formatYear(iDieNow.maxAge)]);
			this.model.log(event);
		}
		if (this.members.length == 0) {
			setTimeout((function(){ gameOver(this); }).bind(this), 1000);
		}
	}
	
	this.dies = function (person) {
		this.willDie.push(person);
		if (this.canDie) {
			this.letMyPeopleGo();
		}
	}
	
	this.addPerson = function (person) {
		this.members.push(person);
	}
	
	this.removePerson = function (person) {
		var index = this.members.indexOf(person);
		this.members.splice(index, 1);
	}
	
	this.hasAFreeHome = function () {
		return !("undefined" === typeof this.findFreeHome());
	}
	
	this.findFreeHome = function () {
		var freeHomes = [];
		for (var i = 0; i < this.buildings.length; i++) {
			var building = this.buildings[i];
			if ((building.category == "home") && (building.capacity - building.residents.length > 0)) {
				freeHomes.push(building);
			}
		}
		return selectRandomlyFrom(freeHomes);
	}
}

splitRandomly = function (number, parts) {
	var array = [];
	var splitted = [];
	var i;
	array.push(0);
	array.push(number);
	for (i = 0; i < parts-1; i++) {
		array.push(Math.floor(Math.random()*(number+1)));
	}
	array.sort(function(x,y){return x - y});
	for (i = 0; i < array.length-1; i++) {
		splitted.push(array[i+1] - array[i]);
	}
	return splitted;
}

function City(name) {
	this.name = name
	this.time = 0;
	this.families = [];
	this.powerSum = 0;
	this.buildings = []; //only buildings where the city is owner
	
	this.hasEnough = function (cost) {
		//TODO
		return true;
	}
	
	this.hasEnoughTime = function () {
		//TODO
		return true;
	}
	
	this.reduce = function (cost) {
		//TODO
	}
	
	this.augment = function (cost) {
		//TODO
	}
	
	this.processTime = function (owner, time) {
		if (owner == this.model.getPlayerFamily()) {
			var times = splitRandomly(time, this.families.length-1);
			for (var i = 1; i < this.families.length; i++) {
				var family = this.families[i];
				family.simulationTime += times[i-1];
				this.model.simulate(family);
			}
			this.updateFamilyPowers();
			this.model.simulateNewFamily(time, this.powerSum);
			this.time += time;
		}
	}
	
	this.applyTime = function (time) {
		this.updateFamilyPowers();
		for (var i = 0; i < this.families.length; i++) {
			var family = this.families[i];
			family.applyTime(time * family.power / this.powerSum);
		}
	}
	
	this.updateFamilyPowers = function () {
		this.powerSum = 0;
		for (var i = 0; i < this.families.length; i++) {
			this.powerSum += this.families[i].power;
		}
	}
	
	this.addFamily = function (family) {
		this.families.push(family);
		this.updateFamilyPowers();
	}
}

function Map(width, height) {
	this.width = width;
	this.height = height;
	this.cells = this.fillCells(width*height);
	
	this.set = function (building, i, j) {
		this.cells[this.convert(i, j)] = building;
	}
	
	this.isEmpty = function (i, j) {
		return this.get(i, j).isEmpty();
	}
	
	this.get = function (i, j) {
		return this.cells[this.convert(i,j)];
	}

	this.convert = function (i, j) {
		return j*this.width + i;
	}
	
	this.convertToPair = function (index) {
		return [index % this.width, Math.floor(index / this.width)];
	}
	
	this.getFreeRandomTile = function() {
		var free = [];
		for (var i = 0; i < this.cells.length; i++) {
			if (this.cells[i].isEmpty()) {
				free.push(this.convertToPair(i));
			}
		}
		return selectRandomlyFrom(free);
	}
}

Map.prototype.fillCells = function(size) {
	var cells = [];
	for (var i = 0; i < size; i++) {
		cells.push(new EmptyCell());
	}
	return cells;
}

function EmptyCell() {
	this.name = "Empty0" + (Math.floor(Math.random() * 9) + 1);
	this.category = "";
	
	this.isEmpty = function () {
		return true;
	}
}

function Home(that) {
	this.name = that.name;
	this.category = that.category;
	this.time = that.time;
	this.costs = that.costs;
	this.residents = [];
	this.capacity = that.capacity;

	this.isEmpty = function () {
		return false;
	}
	
	this.removeResident = function (person) {
		var index = this.residents.indexOf(person);
		this.residents.splice(index, 1);
	}
	
	this.addResident = function (person) {
		this.residents.push(person);
		person.home = this;
	}
}

function Shop(that) {
	this.name = that.name;
	this.category = that.category;
	this.time = that.time;
	this.costs = that.costs;
	this.jobs = [];
	for (var i = 0; i < that.jobs.length; i++) {
		this.jobs.push(new Job(that.jobs[i], this));
	}
	this.wages = [];
	for (var i = 0; i < that.wages.length; i++) {
		this.wages.push(that.wages[i]);
	}
	this.products = that.products;
	
	this.isEmpty = function () {
		return false;
	}
	
	this.educate = function (person) {
		if (this.canEducate(person)) {
			var job = this.findJobFor(person);
			job.worker.push(person);
			if (person.job !== "none") {
				person.job.fire(person);
			}
			person.job = job;
		}
	}
	
	this.canEducate = function (person) {
		var job = this.findJobFor(person);
		if (job == "undefined") {
			return false;
		}
		return (job.max - job.worker.length > 0);
	}
	
	this.findJobFor = function (person) {
		if (this.worksAtSimilarShop(person)) {
			switch (person.job.name) {
				case "apprentice": return this.getJob("journeyman");
				case "journeyman": return this.getJob("foreman");
				case "foreman": return "undefined";
			}
		} else {
			return this.getJob("apprentice");
		}
	}
	
	this.worksAtSimilarShop = function (person) {
		return (!(person.job == "none") && person.job.workplace.name == this.name);
	}
	
	this.getJob = function (name) {
		for (var i = 0; i < this.jobs.length; i++) {
			if (this.jobs[i].name == name) {
				return this.jobs[i];
			}
		}
	}
	
	this.hasForeman = function () {
		return (this.getJob("foreman").worker.length > 0);
	}
	
	this.canPayWorkers = function () {
		var sum = 0;
		for (var i = 0; i < this.jobs.length; i++) {
			var job = this.jobs[i];
			var wage = this.wages[i];
			for (var j = 0; j < job.worker.length; j++) {
				if (this.owner !== job.worker[j].family) {
					sum += wage;
				}
			}
		}
		var cost = {"name" : "gold", "value" : sum};
		return this.owner.hasEnough(cost);
	}
	
	this.payWorkers = function () {
		for (var i = 0; i < this.jobs.length; i++) {
			var job = this.jobs[i];
			var wage = this.wages[i];
			for (var j = 0; j < job.worker.length; j++) {
				this.payWorker(job.worker[j], wage);
			}
		}
	}
	
	this.payWorker = function (worker, wage) {
		var cost = {"name" : "gold", "value" : wage}
		worker.augment(cost);
		this.owner.reduce(cost);
	}
	
	this.canProduce = function (product) {
		var canProduce = true;
		canProduce &= this.hasForeman();
		canProduce &= this.canPayWorkers();
		for (var i = 0; i < product.costs.length; i++) {
			canProduce &= this.owner.hasEnough(product.costs[i]);
		}
		return canProduce;
	}
	
	this.produce = function (product) {
		//TODO tools etc.
		for (var i = 0; i < product.costs.length; i++) {
			this.owner.reduce(product.costs[i]);
		}
		this.payWorkers(); //TODO dependent on time?
		this.owner.augment({"name" : product.name, "value" : product.value});
	}
	
	this.applyTime = function (time) {
		time = time / this.numberOfWorkers();
		for (var i = 0; i < this.jobs.length; i++) {
			var job = this.jobs[i];
			for (var j = 0; j < job.worker.length; j++) {
				job.worker[j].applyTime(time);
			}
		}
	}
	
	this.numberOfWorkers = function () {
		var length = 0;
		for (var i = 0; i < this.jobs.length; i++) {
			length += this.jobs[i].worker.length;
		}
		return length;
	}
}

function Church(that) {
	this.name = that.name;
	this.category = that.category;
	this.time = that.time;
	this.costs = that.costs;

	this.isEmpty = function () {
		return false;
	}
}

function Town(that) {
	this.name = that.name;
	this.category = that.category;
	this.time = that.time;
	this.costs = that.costs;

	this.isEmpty = function () {
		return false;
	}
}

function Job(that, building) {
	this.name = that.name;
	this.max = that.max;
	this.workplace = building;
	this.time = 0;
	switch (this.name) {
		case "apprentice"	: this.time = 2 * YEAR; break;
		case "journeyman"	: this.time = 3 * YEAR; break;
		case "foreman"		: this.time = 5 * YEAR; break;
	}
	this.worker = [];
	
	this.fire = function (person) {
		var index = this.worker.indexOf(person);
		if (index !== -1) {
			this.worker.splice(index, 1);
		}
	}
}

function Resource(name, value, marketValue, marketTime, marketCost, category) {
	this.name = name;
	this.value = value;
	this.marketValue = marketValue;
	this.marketTime = marketTime;
	this.marketCost = marketCost;
	this.category = category || "";
}