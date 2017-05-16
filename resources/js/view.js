﻿function View() {
	this.tileSize = 100;
	this.zoomAmount = 50;
	this.x = 0;
	this.y = 0;
	this.highlightX = 0;
	this.highlightY = 0;
	this.highlight = false;
	this.infoX = 0;
	this.infoY = 0;
	this.showInfo = false;
	
	this.move = function (dirx, diry) {
		var delta = 200; 
		this.x += dirx * delta;
		this.y += diry * delta;
		
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
		this.drawResources(model.getPlayerFamily().resources);
		this.drawBuildingScreen(model.possibleBuildings, model);
		this.drawMarket(model.market);
		this.drawPersons(model.getPlayerFamily());
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
		
		
		var indizes = this.getIndizesAt(this.highlightX, this.highlightY);
		var x = (indizes[0] - startCol) * this.tileSize + offsetX;
		var y = (indizes[1] - startRow) * this.tileSize + offsetY;
		this.drawHighlightedTile(context, x, y, this.tileSize, this.tileSize);
		
		var x = (this.infoX - startCol) * this.tileSize + offsetX;
		var y = (this.infoY - startRow) * this.tileSize + offsetY;
		this.drawInfo(map.get(this.infoX, this.infoY), x, y, this.tileSize, this.tileSize, canvas.width, canvas.height);
	}
	
	this.drawTile = function (context, tile, startX, startY, width, height) {
		context.drawImage(Loader.getImage("background"), startX, startY, width+1, height+1);
		context.drawImage(Loader.getImage(tile.name), startX, startY, width, height);
	}
	
	this.drawHighlightedTile = function (context, x, y, width, height) {
		if (this.highlight) {
			context.strokeStyle = "#000000";
			context.strokeRect(x, y, width-1, height-1);
		}
	}
	
	this.drawInfo = function (tile, x, y, width, height, maxWidth, maxHeight) {
		var info = document.getElementById("info");
		if (this.showInfo) {
			info.innerHTML = "";
			info.style.display = "block";
			if (!tile.isEmpty()) {
				info.appendChild(this.createInfo(tile));
			}
			var top = y - info.offsetHeight;
			top = top < 0 ? top + this.tileSize + info.offsetHeight : top;
			top = Math.max(0, Math.min(top, maxHeight - info.offsetHeight));
			var left = x + width / 2 - info.offsetWidth / 2;
			left = Math.max(0, Math.min(left, maxWidth - info.offsetWidth));
			info.style.top = top + "px";
			info.style.left = left + "px";
		} else {
			info.style.display = "none";
		}
	}
	
	this.createInfo = function (building) {
		switch (building.category) {
			case "home": return this.createHomeInfo(building);
			case "shop": return this.createShopInfo(building);
		}
		var div = document.createElement("div");
		div.innerHTML = LAN.get(building.name) + "<br>";
		return div;
	}
	
	this.createHomeInfo = function (building) {
		var div = document.createElement("div");
		div.innerHTML = LAN.get(building.name) + " (" + building.owner.name + ")<br>";
		div.innerHTML += LAN.get("residents") + ":";
		if (building.residents.length == 0) {
			div.innerHTML += " " + LAN.get("none") + "<br>";
		} else {
			div.innerHTML += "<br>";
			for (var i = 0; i < building.residents.length; i++) {
				var person = building.residents[i];
				div.innerHTML += person.name + "<br>";
			}
		}
		div.innerHTML += LAN.get("free space") + ": " + (building.capacity - building.residents.length) + "<br>";
		
		return div;
	}
	
	this.createShopInfo = function (building) {
		var div = document.createElement("div");
		div.className = "shop-info";
		div.innerHTML = LAN.get(building.name) + "<br>";
		div.innerHTML += LAN.get("foremen") + ": " + building.getJob("foreman").worker.length + "/" + building.getJob("foreman").max + "<br>";
		div.innerHTML += LAN.get("journeymen") + ": " + building.getJob("journeyman").worker.length + "/" + building.getJob("journeyman").max + "<br>";
		div.innerHTML += LAN.get("apprentices") + ": " + building.getJob("apprentice").worker.length + "/" + building.getJob("apprentice").max + "<br>";
		var produceButtons = [];
		for (var i = 0; i < building.products.length; i++) {
			var product = building.products[i];
			var text = "";
			for (var j = 0; j < product.costs.length; j++) {
				var cost = product.costs[j];
				text += ", " + cost.value + " " + LAN.get(cost.name);
			}
			text = text.replace(", ", "");
			div.appendChild(document.createTextNode(text));
			var produceButton = document.createElement("a");
			produceButton.innerHTML = "-\>"; //TODO
			div.appendChild(produceButton);
			produceButtons[i] = produceButton;
			div.appendChild(document.createTextNode(LAN.get(product.name)));
			div.appendChild(document.createElement("br"));
		}
		
		
		this.addProduceOnClickEvents(produceButtons, building);
		return div;
	}
	
	this.addProduceOnClickEvents = function (buttons, building) {
		for (var i = 0; i < buttons.length; i++) {
			(function (index) {
				buttons[index].onclick = function() {
					produce(building, building.products[index]);
				};
			})(i);
		}
	}
	
	this.toggleInfo = function (x, y, map) {
		this.showInfo = !this.showInfo && !map.get(x, y).isEmpty();
		this.infoX = x;
		this.infoY = y;
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
		var nextCategoryIndex = 0;
		for (var i = 0; i < buildings.length; i++) {
			var building = buildings[i];
			if (nextCategoryIndex < CATEGORIES.length && CATEGORIES[nextCategoryIndex] == building.category) {
				var title = document.createElement("h3");
				title.innerHTML = LAN.get(CATEGORIES[nextCategoryIndex]);
				motherDiv.appendChild(title);
				nextCategoryIndex++;
			}
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
		title.innerHTML = LAN.get(building.name);
		div.appendChild(title);
		
		
		var image = document.createElement("IMG");
		image.src = "resources/images/" + building.name + ".png";
		div.appendChild(image);
		
		
		var time = document.createElement("div");
		time.className = "building-cost";
		time.innerHTML = LAN.get("time") + ": " + this.formatShort(building.time);
		div.appendChild(time);
		
		for (var i = 0; i < building.costs.length; i++) {
			var cost = building.costs[i];
			var costDiv = document.createElement("div");
			costDiv.className = "building-cost";
			costDiv.innerHTML = LAN.get(cost.name) + ": " + cost.value;
			div.appendChild(costDiv);
		}
		
		var button = document.createElement("a");
		button.id = "build-" + building.name;
		button.className = "build";
		button.innerHTML = LAN.get("build");
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
	
	this.drawResources = function (resources) {
		var motherDiv = document.getElementById("resources");
		motherDiv.innerHTML = "";
		
		for (var i = 0; i < resources.length; i++) {
			var res = resources[i];
			var div = document.createElement("div");
			div.id = 'res-' + res.name;
			div.className = 'resource';
			div.innerHTML = LAN.get(res.name) + ": " + res.value;
			motherDiv.appendChild(div);
		}
	}
	
	this.drawPersons = function (family) {
		var persons = family.members;
		var div = document.getElementById("content-family");
		div.innerHTML = "";
		
		var title = document.createElement("p");
		title.style.fontSize = "x-large";
		title.innerHTML = LAN.get("family") + " " + family.name + ", " + LAN.get("age") + ": " + this.format(family.time);
		div.appendChild(title);
		
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
		div.appendChild(this.createPersonData(LAN.get("age") + ": " + this.format(person.age)));
		div.appendChild(this.createPersonData(LAN.get("gender") + ": " + LAN.get(person.gender)));
		if (person.spouse == "none") {
			var marriageButton = document.createElement("a");
			marriageButton.innerHTML = LAN.get("marry");
			marriageButton.onclick = function() { marry(person) };
			div.appendChild(marriageButton);
		} else {
			div.appendChild(this.createPersonData(LAN.get("spouse") + ": " + person.spouse.name));
			var childButton = document.createElement("a");
			childButton.innerHTML = LAN.get("beget-children");
			childButton.onclick = function() { begetChildren(person) };
			div.appendChild(childButton);
		}
		div.appendChild(document.createElement("br"));
		for (var i = 0; i < person.children.length; i++) {
			div.appendChild(this.createPersonData(LAN.get("child") + ": " + person.children[i].name));
		}
		if (person.job !== "none") {
			var args = [LAN.get(person.job.name), LAN.get(person.job.workplace.name)];
			div.appendChild(this.createPersonData(LAN.get("works-as-at", args)));
		}
		var jobButton = document.createElement("a");
		jobButton.innerHTML = LAN.get("educate");
		jobButton.onclick = function() { educate(person) };
		div.appendChild(jobButton);
		return div;
	}
	
	this.createPersonData = function (text) {
		var div = document.createElement("div");
		div.style.display = "block";
		div.innerHTML = text;
		return div;
	}
	
	this.formatFancy = function (time, y, m, d) {
		var years = Math.floor(time / YEAR);
		var months = Math.floor((time - years * YEAR ) / MONTH);
		var days = (time - years * YEAR - months * MONTH);
		var text = "";
		if (years > 0) {
			text += years + "&nbsp;" + (years == 1 ? LAN.get(y) : LAN.get(y + "s")) + " ";
		}
		if (months > 0) {
			text += months + "&nbsp;" + (months == 1 ? LAN.get(m) : LAN.get(m + "s")) + " ";
		}
		if (years + months == 0 || days > 0) {
			text += days + "&nbsp;" + (days == 1 ? LAN.get(d) : LAN.get(d + "s"));
		}
		return text;
	}
	
	this.formatShort = function (time) {
		return this.formatFancy(time, "y", "m", "d");
	}
	
	this.format = function (time) {
		return this.formatFancy(time, "year", "month", "day");
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
		div.appendChild(document.createTextNode(LAN.get(product.name) + ": "));
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
		var costText = " " + LAN.get("each at") + " ";
		for (var i = 0; i < product.costs.length; i++) {
			//TODO
			costText += product.costs[i].value + "&nbsp;";
			costText += LAN.get(product.costs[i].name);
		}
		costText += " " + LAN.get("and") + " " + product.time + "&nbsp;" + LAN.get("time");
		var costs = document.createElement("span");
		costs.innerHTML = costText;
		div.appendChild(costs);
		var b = document.createElement("a");
		b.className = "buy";
		b.innerHTML = LAN.get("buy");
		b.onclick = function () { buy(product, 1); };
		div.appendChild(b);
		var sell = document.createElement("a");
		sell.className = "sell";
		sell.innerHTML = LAN.get("sell");
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