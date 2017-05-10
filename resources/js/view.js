function View() {
	this.tileSize = 100;
	this.zoomAmount = 50;
	this.x = 0;
	this.y = 0;
	this.highlightX = 0;
	this.highlightY = 0;
	this.highlight = false;
	
	this.move = function (dirx, diry) {
		// move camera
		var delta = 200; 
		this.x += dirx * delta;
		this.y += diry * delta;
		// clamp values
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
	};
	
	this.zoom = function (direction, centerX, centerY) {
		var oldSize = this.tileSize;
		var old = this.getIndizesAt(centerX, centerY);
		this.tileSize = Math.min(400, Math.max(50, oldSize - direction * this.zoomAmount));
		var ratio = this.tileSize / oldSize;
		this.x = (this.x + centerX) * ratio - centerX;
		this.y = (this.y + centerY) * ratio - centerY;
		//TODO: totally zoomed out it does not work if screen is wider than canvas
	}
	
	this.update = function (model) {
		this.drawMap(model.map);
		this.drawResources(model.getPlayerFamily().resources, model.getPlayerFamily().time, model.city.time);
		this.drawBuildingScreen(BUILDINGS, model);
		this.drawMarket(model.market);
		this.drawPersons(model.getPlayerFamily().familyMembers);
		
		//TODO changeResources, buttons etc.
	}
	
	this.updateSize = function (mapWidth, mapHeight, width, height) {
		this.maxX = mapWidth * this.tileSize - width;
		this.maxY = mapHeight * this.tileSize - height;
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
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
		var surroundingDiv = document.getElementById("map-div");
		var canvas = document.getElementById("map");
		var context = canvas.getContext("2d");
		canvas.width = Math.min(surroundingDiv.offsetWidth, this.tileSize * map.width);
		canvas.height = Math.min(surroundingDiv.offsetHeight, this.tileSize * map.height);
		
		this.updateSize(map.width, map.height, canvas.width, canvas.height);
		
		context.clearRect(0,0,canvas.width,canvas.height);
	
		var startCol = Math.floor(this.x / this.tileSize);
		var endCol = Math.min(startCol + (canvas.width / this.tileSize) + 1, map.width);
		var startRow = Math.floor(this.y / this.tileSize);
		var endRow = Math.min(startRow + (canvas.height / this.tileSize) + 1, map.height);
		var offsetX = -this.x + startCol * this.tileSize;
		var offsetY = -this.y + startRow * this.tileSize;

		for (var c = startCol; c < endCol; c++) {
			for (var r = startRow; r < endRow; r++) {
				var x = (c - startCol) * this.tileSize + offsetX;
				var y = (r - startRow) * this.tileSize + offsetY;
				this.drawTile(context, map.get(c, r), x, y, this.tileSize, this.tileSize);
			}
		}
	}
	
	this.drawTile = function (context, tile, startX, startY, width, height) {
		context.drawImage(Loader.getImage("background"), startX, startY, width, height);
		context.drawImage(Loader.getImage(tile.key), startX, startY, width, height);
		if (this.highlight && startX < this.highlightX && startX + width > this.highlightX && startY < this.highlightY && startY + width > this.highlightY) {
			context.strokeStyle = "#000000";
			context.strokeRect(startX, startY, width-1, height-1);
		}
	}
	
	this.getIndizesAt = function(x, y) {
		var startCol = Math.floor(this.x / this.tileSize);
		var startRow = Math.floor(this.y / this.tileSize);
		
		var offsetX = -this.x + startCol * this.tileSize;
		var offsetY = -this.y + startRow * this.tileSize;
		var i = startCol + Math.floor((x - offsetX) / this.tileSize);
		var j = startRow + Math.floor((y - offsetY) / this.tileSize);
		
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
	
	this.drawPersons = function (persons) {
		var div = document.getElementById("content-family");
		div.innerHTML = "";
		for (var i = 0; i < persons.length; i++) {
			div.appendChild(this.createPersonDiv(persons[i]));
		}
		
		var buttons = document.getElementsByClassName("person-show-hide-button");
		this.addShowHideFunctionalityTo(buttons);
	}
	
	this.addShowHideFunctionalityTo = function (buttons) {
		for (var i = 0; i < buttons.length; i++) {
			(function (index) {
				var button = buttons[index];
				button.onclick = function() {
					showHide(button);
				}
			})(i);
		}
	}
	
	this.createPersonDiv = function (person) {
		var div = document.createElement("div");
		div.id = "person-" + person.id;
		div.className = "person";
		var button = document.createElement("a");
		button.id = "button-" + person.id;
		button.className = "person-show-hide-button";
		button.innerHTML = "+";
		div.appendChild(button);
		div.innerHTML += person.name;
		var info = this.createPersonInfo(person);
		div.appendChild(info);
		return div;
	}
	
	this.createPersonInfo = function (person) {
		var div = document.createElement("div");
		div.style.display = "none";
		div.id = "info-" + person.id;
		div.className = "person-info";
		div.appendChild(this.createPersonData("Alter", this.format(person.age)));
		div.appendChild(this.createPersonData("Geschlecht", person.genderText));
		if (person.spouse == "none") {
			var marriageButton = document.createElement("a");
			marriageButton.innerHTML = "Verheiraten (+1 Familienmitglied)";
			//TODO costs?
			div.appendChild(marriageButton);
		} else {
			div.appendChild(this.createPersonData("Ehepartner", person.spouse.name));
		}
		//TODO functions and hence buttons:
		//begetChildren
		//educate
		//...
		return div;
	}
	
	this.createPersonData = function (name, value) {
		var div = document.createElement("div");
		div.style.display = "block";
		div.innerHTML = name + ": " + value;
		return div;
	}
	
	this.format = function (time) {
		var years = Math.floor(time / YEAR);
		var months = Math.floor((time - years * YEAR ) / MONTH);
		var days = (time - years * YEAR - months * MONTH);
		var text = "";
		if (years > 0) {
			text += years + "&nbsp;Jahr"
			text += years > 1 ? "e " : " ";
		}
		if (months > 0) {
			text += months + "&nbsp;Monat"
			text += months > 1 ? "e " : " ";
		}
		if (years + months == 0 || days > 0) {
			text += days + "&nbsp;Tag"
			text += days !== 1 ? "e" : "";
		}
		return text;
	}
	
	this.drawMarket = function (products) {
		var motherDiv = document.getElementById("content-market");
		motherDiv.innerHTML = "";
		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			if (product.name !== "gold") {
				var div = this.createMarketProduct(product);
				motherDiv.appendChild(div);
			}
		}
	}
	
	this.createMarketProduct = function (product) {
		var div = document.createElement("div");
		div.className = "product";
		div.appendChild(document.createTextNode(product.text + ": "));
		var field = document.createElement("input");
		field.id = "in-" + product.name;
		field.type = "number";
		field.min = "0";
		field.step = "1";
		field.value = "1";
		field.oninput = function () {
			fireProductChanged(product, field.value);
		};
		div.appendChild(field);
		var costText = " für je ";
		for (var i = 0; i < product.costs.length; i++) {
			//TODO
			costText += product.costs[i].value + "&nbsp;";
			costText += product.costs[i].text;
		}
		costText += " und " + product.time + "&nbsp;Zeit";
		var costs = document.createElement("span");
		costs.innerHTML = costText;
		div.appendChild(costs);
		var b = document.createElement("a");
		b.className = "buy";
		b.innerHTML = "Kaufen";
		b.onclick = function () { buy(product, 1); };
		div.appendChild(b);
		var sell = document.createElement("a");
		sell.className = "sell";
		sell.innerHTML = "Verkaufen";
		sell.onclick = function () { buy(product, -1); };
		div.appendChild(sell);
		return div;
	}
	
	this.showContent = function (button) {
		var divs = document.getElementsByClassName("container");
		var id = button.id.replace("-button", "-div");
		var div = document.getElementById(id);
		for (var i = 0; i < divs.length; i++) {
			divs[i].style.display = "none";
		}
		div.style.display = "block";
		
		tablinks = document.getElementsByClassName("toolbar-button");
		for (var i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active-button", "");
		}
		button.className += " active-button";
	}
}