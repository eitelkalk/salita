var model = new Model();
var view = new View();
var game = new Game(model, view);

game.start();


//bind gui actions to game

function build(name) {
	var button = document.getElementById('map-button');
	showContent(button);
	game.queuedBuilding = name;
}

//TODO
function buy(product, multi) {
	var value = Math.floor(document.getElementById('in-' + product.name).value);
	game.buy(product, multi*value, model.getPlayerFamily());
}

function fireProductChanged(product, value) {
	
}

function showContent(button) {
	game.showContent(button);
}

function showHide(button) {
	var div = document.getElementById("info-" + button.id.replace("button-", ""));
	var isCollapsed = div.style.display == "none";
	if (isCollapsed) {
		div.style.display = "block";
		button.innerHTML = "-";
	} else {
		div.style.display = "none";
		button.innerHTML = "+";
	}
}

//bind keyboard actions to game
var Keyboard = {};

Keyboard.LEFT  = [37, 65];
Keyboard.RIGHT = [39, 68];
Keyboard.UP    = [38, 87];
Keyboard.DOWN  = [40, 83];

Keyboard.left  = function (key) { return Keyboard.LEFT.indexOf(key)  !== -1; }
Keyboard.right = function (key) { return Keyboard.RIGHT.indexOf(key) !== -1; }
Keyboard.up    = function (key) { return Keyboard.UP.indexOf(key)    !== -1; }
Keyboard.down  = function (key) { return Keyboard.DOWN.indexOf(key)  !== -1; }

function move(event) {
	var dirx = 0;
    var diry = 0;
    if (Keyboard.left(event.keyCode))  { dirx = -1; }
    if (Keyboard.right(event.keyCode)) { dirx =  1; }
    if (Keyboard.up(event.keyCode))    { diry = -1; }
    if (Keyboard.down(event.keyCode))  { diry =  1; }

    view.move(dirx, diry);
	view.drawMap(model.map);
}

document.onkeydown = function(event) {
	move(event);
}

document.getElementById('map').onmouseup = function(event) {
	var rect = document.getElementById('map').getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	var coords = view.getIndizesAt(x, y);
	
	if (game.queuedBuilding !== "") {
		var building = model.getNewBuilding(game.queuedBuilding);
		game.build(building, coords[0], coords[1], model.getPlayerFamily());
		game.queuedBuilding = "";
	} else {
		//TODO produce or assign family members or...
	}
}

//bind window events to game
window.onresize = function(event) {
	view.drawMap(model.map);
}