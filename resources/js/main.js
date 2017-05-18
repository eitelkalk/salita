var model = new Model();
var view = new View();
var game = new Game(model, view);

//Image loader
var Loader = {
    images : [],
	stepsUntilLoadingFinished : BUILDINGS.length + 10,
	loadedInstances : 0
};

Loader.loadImage = function (name, src) {
    var img = new Image();
	
	var promise = new Promise(function(resolve, reject) {
		img.onload = function () {
			Loader.images[name] = img;
			resolve(img);
			Loader.performInstanceLoaded();
		};
		img.onerror = function () {
			reject("Image load failed: " + src);
			Loader.performInstanceLoaded();
		};
	
	});
	
	img.src = src;
	return promise;
};

Loader.getImage = function (name) {
	if (name in this.images) {
		return this.images[name];
	} else {
		console.log("No image found: " + name);
		return null; //return dummy image
	}
};

Loader.performInstanceLoaded = function () {
	Loader.loadedInstances++;
	var length = document.getElementById("load-bar").offsetWidth;
	var status = document.getElementById("load-status");
	status.style.width = 100 * (Loader.loadedInstances / Loader.stepsUntilLoadingFinished) + "%";
	if (Loader.loadedInstances == Loader.stepsUntilLoadingFinished) {
		document.getElementById("load-screen").style.display = "none";
	}
}


function loadImages() {
	var promises = [];
	promises.push(Loader.loadImage("background", "resources/images/Background.png"));
	for (var i = 1; i < 10; i++) {
		promises.push(Loader.loadImage("Empty0" + i, "resources/images/Empty0" + i + ".png"));
	}
	for (var i = 0; i < BUILDINGS.length; i++) {
		var name = BUILDINGS[i].name;
		promises.push(Loader.loadImage(name, "resources/images/" + name + ".png"));
	}
	return promises;
}

function main() {
	var imagePromises = loadImages();
	Promise.all(imagePromises).then(function() {game.start()});
}

main();


//bind gui actions to game
function build(name) {
	var button = document.getElementById('map-button');
	showContent(button);
	game.queuedBuilding = name;
	view.highlight = true;
}

function buy(product, multi) {
	var value = Math.floor(document.getElementById('in-' + product.name).value);
	if (multi >= 0) {
		game.buy(product, multi*value, model.getPlayerFamily());
	} else {
		game.sell(product, -multi*value, model.getPlayerFamily());
	}
}

function marry(person) {
	game.marry(person);
}

function begetChildren(person) {
	person.gender == "male" ? game.begetChildren(person.spouse) : game.begetChildren(person);
}

function educate(person) {
	var button = document.getElementById('map-button');
	showContent(button);
	game.queuedPerson = person;
	view.highlight = true;
}

function produce(building, product) {
	if (building.owner == model.getPlayerFamily()) {
		game.produce(building, product);
	}
	//TODO error message or... ???
}

function fireProductChanged(product, value) {
	//TODO update market
}

function gameOver(family) {
	view.showGameOverScreen(family);
}

function showContent(button) {
	game.hideInfo();
	game.showContent(button);
}

function showHide(button) {
	var id = button.id.replace("button-", "");
	var div = document.getElementById("info-" + id);
	var isCollapsed = div.style.display == "none";
	if (isCollapsed) {
		div.style.display = "block";
		button.innerHTML = "-";
	} else {
		div.style.display = "none";
		button.innerHTML = "+";
	}
	view.setPersonCollapsed(id, !isCollapsed);
}

function zoom(event) {
	var rect = document.getElementById('map').getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	view.highlightX = x;
	view.highlightY = y;
	game.zoom(Math.max(-1, Math.min(1, event.deltaY)), x, y);
}


//bind keyboard actions to game
var Keyboard = {};

Keyboard.LEFT  = [37, 65];
Keyboard.RIGHT = [39, 68];
Keyboard.UP    = [38, 87];
Keyboard.DOWN  = [40, 83];
Keyboard.K  = 75;
Keyboard.B  = 66;
Keyboard.M  = 77;
Keyboard.H  = 72;
Keyboard.I  = 73;

Keyboard.left  = function (key) { return Keyboard.LEFT.indexOf(key)  !== -1; }
Keyboard.right = function (key) { return Keyboard.RIGHT.indexOf(key) !== -1; }
Keyboard.up    = function (key) { return Keyboard.UP.indexOf(key)    !== -1; }
Keyboard.down  = function (key) { return Keyboard.DOWN.indexOf(key)  !== -1; }

function move(keyCode) {
	var dirx = 0;
    var diry = 0;
    if (Keyboard.left(keyCode))  { dirx = -1; }
    if (Keyboard.right(keyCode)) { dirx =  1; }
    if (Keyboard.up(keyCode))    { diry = -1; }
    if (Keyboard.down(keyCode))  { diry =  1; }

    view.move(dirx, diry);
	view.drawMap(model.map);
}

function switchMenu(keyCode) {
	switch (keyCode) {
		case Keyboard.K : 
			var button = document.getElementById('map-button');
			showContent(button);
			break;
		case Keyboard.M : 
			var button = document.getElementById('market-button');
			showContent(button);
			break;
		case Keyboard.I :
		case Keyboard.H :
			var button = document.getElementById('more-button');
			showContent(button);
			break;
		case Keyboard.B :
			var button = document.getElementById('build-button');
			showContent(button);
			break;
	}
}

document.onkeydown = function(event) {
	move(event.keyCode);
	switchMenu(event.keyCode);
}

document.getElementById('map').onmouseup = function(event) {
	var rect = document.getElementById('map').getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	var coords = view.getIndizesAt(x, y);
	
	if (game.queuedBuilding !== "") {
		var building = getNewBuilding(game.queuedBuilding);
		game.build(building, coords[0], coords[1], model.getPlayerFamily());
		game.queuedBuilding = "";
		game.hideInfo();
	} else if (game.queuedPerson !== "") {
		var building = game.model.map.get(coords[0], coords[1]);
		game.educate(game.queuedPerson, building);
	} else {
		game.toggleInfo(coords[0], coords[1]);
		//TODO produce or assign family members or...
	}
}

document.getElementById("map").addEventListener("wheel", zoom);
document.getElementById("map").onmousemove = function(event) {
	var rect = document.getElementById('map').getBoundingClientRect();
	view.highlightX = event.clientX  - rect.left;
	view.highlightY = event.clientY - rect.top;
	if (view.highlight) {
		view.drawMap(model.map);
	}
}

//bind window events to game
window.onresize = function(event) {
	view.drawMap(model.map);
}