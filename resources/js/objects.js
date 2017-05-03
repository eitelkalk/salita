function Person(family) {
	this.family = family;
	this.family.addPerson(this);
	
	this.hasEnough = function (cost) {
		return this.family.hasEnough(cost);
	}
	
	this.reduce = function (cost) {
		this.family.reduce(cost);
	}
	
	this.augment = function (name, value) {
		this.family.augment(name, value);
	}
	
	this.applyTime = function (time) {
		this.age += time;
		if (this.age >= this.maxAge) {
			this.die();
		}
		this.family.time += time;
	}
	
	this.die = function () {
		this.family.dies(this);
	}
	
	this.hasEnoughTime = function () {
		return this.maxAge >= this.age;
	}
}

function Family(startResources, startTime, city) {
	this.resources = startResources;
	this.time = startTime;
	this.city = city;
	this.familyMembers = [];
	this.city.addFamily(this);
	this.willDie = [];
	this.canDie = true;
	
	this.hasEnough = function (cost) {
		var res = this.findResource(cost.name);
		return res.value >= cost.value;
	}
	
	this.hasEnoughTime = function () {
		return this.familyMembers.length > this.willDie;
	}
	
	this.reduce = function (cost) {
		var res = this.findResource(cost.name);
		res.changeValue(-1*cost.value);
	}
	
	this.augment = function (name, value) {
		var res = this.findResource(name);
		res.changeValue(value);
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
		var l = this.familyMembers.length;
		var personalTime = this.splitRandomly(time, this.familyMembers.length);
		for (var i = 0; i < this.familyMembers.length; i++) {
			this.familyMembers[i].applyTime(personalTime[i]); //TODO members die meanwhile and change array
		}
		this.canDie = true;
		this.letMyPeopleGo();
		this.city.time += time;
	}
	
	this.sum = function (array) {
		var s = 0;
		for (var i = 0; i < array.length; i++) {
			s += array[i];
		}
		return s;
	}
	
	this.splitRandomly = function (number, parts) {
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
	
	this.letMyPeopleGo = function () {
		while (this.willDie.length > 0) {
			var iDieNow = this.willDie.pop();
			var index = this.familyMembers.indexOf(iDieNow);
			this.familyMembers.splice(index, 1);
			this.model.log(iDieNow.name + selectRandomlyFrom(DIE_TEXTS));			
		}
		//TODO check if family is alive
	}
	
	this.dies = function (person) {
		this.willDie.push(person);
		if (this.canDie) {
			this.letMyPeopleGo();
		}
	}
	
	this.addPerson = function (person) {
		this.familyMembers.push(person);
	}
}

function City(name) {
	this.name = name
	this.time = 0;
	this.families = [];
	this.powerSum = 0;
	
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
	
	this.augment = function (name, value) {
		//TODO
	}
	
	this.applyTime = function (time) {
		this.updateFamilyPowers();
		for (family in this.families) {
			family.applyTime(time * family.power / this.powerSum);
			//TODO not precise
		}
	}
	
	this.updateFamilyPowers = function () {
		this.powerSum = 0;
		this.families.sort(
			function(a, b) {
				return a.power - b.power;
			}
		);
		for (family in this.families) {
			this.powerSum += family.power;
		}
	}
	
	this.addFamily = function (family) {
		this.families.push(family);
		this.updateFamilyPowers;
	}
}

function Resource(name, text, value) {
	this.name = name;
	this.text = text;
	this.value = value;
	
	this.changeValue = function (val) {
		this.value += val;
	}
	
	this.copyData = function (that) {
		this.name = that.name;
		this.text = that.text;
		this.time = that.time;
		this.costs = that.costs;
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
}

Map.prototype.fillCells = function(size) {
	var cells = [];
	for (var i = 0; i < size; i++) {
		cells.push(new EmptyCell());
	}
	return cells;
};

Map.prototype.convert = function (i, j) {
	return j*this.width + i;
};

function EmptyCell() {
	this.color = "#008000"; //TODO
	
	this.isEmpty = function () {
		return true;
	}
}

function Building() {
	this.isEmpty = function () {
		return false;
	}
	
	this.copyData = function (that) {
		this.name = that.name;
		this.text = that.text;
		this.costs = that.costs;
		this.time = that.time;
		this.color = that.color;
	}
}