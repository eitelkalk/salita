//Define global variables
//Dirty, should be loaded via JSON

var BUILDINGS = [
	{
		"name"  : "mill",
		"text"  : "Mühle",
		"time"  : 300,
		"color" : "#B22222",
		"costs" : [
			{
				"name"  : "wood", 
				"value" : 100
			},
			{
				"name"  : "gold",
				"value" : 100
			}
		]
	},
	{
		"name"  : "bakery",
		"text"  : "Bäckerei",
		"time"  : 300,
		"color" : "#CD5C5C",
		"costs" : [
			{
				"name"  : "wood", 
				"value" : 100
			},
			{
				"name"  : "gold",
				"value" : 100
			}
		]
	}
];

var RESOURCES = [
	{"name" : "wood", "text" : "Holz"},
	{"name" : "stone", "text" : "Super dicker Stein"},
	{"name" : "gold", "text" : "Gold"}
];

var MARKET = [];
for (var i = 0; i < RESOURCES.length; i++) {
	var res = RESOURCES[i];
	if (res.name !== "gold") {
		var p = {};
		p.name = res.name;
		p.text = res.text;
		p.time = Math.floor(Math.random() * 10 + 1);
		p.costs = [{"name" : "gold", "value" : 10, "text" : "Gold"}];
		MARKET.push(p);
	}
}

for (var i = 0; i < BUILDINGS.length; i++) {
	var costs = BUILDINGS[i].costs;
	for (var j = 0; j < costs.length; j++) {
		var cost = costs[j];
		cost.text = findResource(cost.name).text;
	}
}

function findResource(name) {
	for (var index = 0; index < RESOURCES.length; index++) {
		var res = RESOURCES[index];
		if (res.name == name) {
			return res;
		}
	}
}

var YEAR = 300;
var MONTH = 30;

//Start data if no data has been stored
var START_CITY = new City("Village");

var NO_FAMILIES = 4;

var START_RESOURCES = [];
for (var i = 0; i < NO_FAMILIES; i++) {
	START_RESOURCES[i] = [];
	for (var j = 0; j < RESOURCES.length; j++) {
		var res = new Resource();
		res.copyData(RESOURCES[j]);
		res.value = 500 + Math.floor(Math.random() * 500);
		START_RESOURCES[i].push(res);
	}
}

var START_FAMILIES = [];
var START_PERSONS = [];
for (var i = 0; i < NO_FAMILIES; i++) {
	START_FAMILIES[i] = new Family(START_RESOURCES[i], 0, START_CITY);
	var noPersons = Math.floor(Math.random() * 5);
	for (var j = 0; j < noPersons; j++) {
		var person = new Person(START_FAMILIES[i]);
		person.age = Math.floor(Math.random() * YEAR * 15) + 15 * YEAR;
		person.maxAge = Math.floor(Math.random() * YEAR * 30) + 50 * YEAR;
		START_PERSONS.push();
	}
}

var START_BUILDINGS = []; //TODO
