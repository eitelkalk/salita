function View() {
	this.tileSize = 64;
	this.x = 0;
	this.y = 0;
	
	this.move = function (dirx, diry) {
		// move camera
		var delta = this.tileSize; 
		this.x += dirx * delta;
		this.y += diry * delta;
		// clamp values
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
	};
	
	this.updateSize = function (mapWidth, mapHeight, width, height) {
		this.maxX = mapWidth * this.tileSize - width;
		this.maxY = mapHeight * this.tileSize - height;
	}
	
	this.log = function(text) {
		var logger = document.getElementById("logger");
		var oldText = logger.innerHTML;
		oldText = oldText.replace(/<p>/g, "");
		var array = oldText.split(/<\/p>/);
		array.pop();
		array.unshift(text);
		while (array.length > 20) {
			array.pop();
		}
		logger.innerHTML = "<p>" + array.join("</p><p>") + "</p>";
	}
	
	this.drawMap = function(map) {
		var surroundingDiv = document.getElementById("mapdiv");
		var canvas = document.getElementById("map");
		var context = canvas.getContext("2d");
		canvas.width = surroundingDiv.offsetWidth;
		canvas.height = surroundingDiv.offsetHeight;
		
		this.updateSize(map.width, map.height, canvas.width, canvas.height);
		
		context.clearRect(0,0,canvas.width,canvas.height);
	
		var startCol = Math.floor(this.x / this.tileSize);
		var endCol = Math.min(startCol + (canvas.width / this.tileSize), map.width-1);
		var startRow = Math.floor(this.y / this.tileSize);
		var endRow = Math.min(startRow + (canvas.height / this.tileSize), map.height-1);
		var offsetX = -this.x + startCol * this.tileSize;
		var offsetY = -this.y + startRow * this.tileSize;

		for (var c = startCol; c <= endCol; c++) {
			for (var r = startRow; r <= endRow; r++) {
				var x = (c - startCol) * this.tileSize + offsetX;
				var y = (r - startRow) * this.tileSize + offsetY;
				this.drawTile(context, map.get(c, r), x+1, y+1, this.tileSize-2, this.tileSize-2);
			}
		}
	}
	
	this.drawTile = function (context, tile, startX, startY, width, height) {
		//TODO display more information
		if (tile.isEmpty()) {
		
		}
		context.fillStyle = tile.color;
		context.fillRect(startX, startY, width, height);
	}
	
	this.getIndizesAt = function(x, y, map) {
		var startCol = Math.floor(this.x / this.tileSize);
		var startRow = Math.floor(this.y / this.tileSize);
		
		var i = startCol + Math.floor(x / this.tileSize);
		var j = startRow + Math.floor(y / this.tileSize);
		
		return [i, j];
	}
	
	this.drawBuildingScreen = function (buildings, model) {
		var motherDiv = document.getElementById("building-container");
		motherDiv.innerHTML = "";
		
		var buildable = [];
		for (var i = 0; i < buildings.length; i++) {
			var building = buildings[i];
			var div = this.createBuildingDiv(building);
			motherDiv.appendChild(div);
			buildable[i] = model.canBeBuiltByPlayer(building);
		}
		
		var buttons = document.getElementsByClassName("build");
		this.addOnClickEvents(buttons, buildable, buildings.map(function(b) {return b.name;}));
	}
	
	this.createBuildingDiv = function (building) {
		var div = document.createElement("div");
		div.className = "building";
		var title = document.createElement("div");
		title.className = "building-title";
		title.innerHTML = building.text;
		div.appendChild(title);
		
		var time = document.createElement("div");
		time.className = "building-cost";
		time.innerHTML = "Zeit: " + building.time;
		div.appendChild(time);
		
		for (var i = 0; i < building.costs.length; i++) {
			var cost = building.costs[i];
			var costDiv = document.createElement("div");
			costDiv.className = "building-cost";
			costDiv.innerHTML = cost.text + ": " + cost.value;
			div.appendChild(costDiv);
		}
		
		var button = document.createElement("a");
		button.id = "build-" + building.name;
		button.className = "build";
		button.innerHTML = "Bauen";
		div.appendChild(button);
		return div;
	}
	
	this.addOnClickEvents = function (buttons, enabled, buildingNames) {
		for (var i = 0; i < buttons.length; i++) {
			(function (index) {
				buttons[index].onclick = function() {
					if (enabled[index]) {
						build(buildingNames[index]);
					}
				}
				if (enabled[index]) {
					buttons[index].style.cursor = "pointer";
				} else {
					buttons[index].style.cursor = "not-allowed";
				}
			})(i);
		}
	}
	
	this.update = function (model) {
		this.drawMap(model.map);
		this.drawResources(model.getPlayerFamily().resources, model.getPlayerFamily().time, model.city.time);
		this.drawBuildingScreen(BUILDINGS, model);
		//TODO changeResources, buttons etc.
	}
	
	this.drawResources = function (resources, familyTime, cityTime) {
		var motherDiv = document.getElementById("resources");
		motherDiv.innerHTML = "";
		
		for (var i = 0; i < resources.length; i++) {
			var res = resources[i];
			var div = document.createElement("div");
			div.id = 'res-' + res.name;
			div.className = 'resource';
			div.innerHTML = res.text + ": " + res.value;
			motherDiv.appendChild(div);
		}
		
		var timeDiv = document.createElement("div");
		timeDiv.id = 'res-family-time';
		timeDiv.className = 'resource';
		timeDiv.innerHTML = "Familienalter: " + this.format(familyTime);
		motherDiv.appendChild(timeDiv);
		
		var timeDiv = document.createElement("div");
		timeDiv.id = 'res-city-time';
		timeDiv.className = 'resource';
		timeDiv.innerHTML = "Stadtalter: " + this.format(cityTime);
		motherDiv.appendChild(timeDiv);
	}
	
	this.format = function (time) {
		var years = time / YEAR;
		var months = (time - years * YEAR ) / MONTH;
		var days = (time - years * YEAR - months * MONTH);
		var text = "";
		if (years > 0) {
			text += years + "&nbsp;Jahr"
			if (years > 1) {
				text += "e ";
			}
		}
		if (months > 0) {
			text += months + "&nbsp;Monat "
			if (years > 1) {
				text += "e ";
			}
		}
		if (years + months == 0 || days > 0) {
			text += days + "&nbsp;Tag"
			if (days !== 1) {
				text += "e";
			}
		}
		return text;
	}
}

function show(button, id) {
	var divs = document.getElementsByClassName("container");
	var div = document.getElementById(id);
	var i;
	for (i = 0; i < divs.length; i++) {
		divs[i].style.display = "none";
	}
	div.style.display = "block";
	
	tablinks = document.getElementsByClassName("toolbar-button");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active-button", "");
	}
	button.className += " active-button";
}