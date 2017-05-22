function View() {
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
	this.personCollapsed = [];
	this.highlightedResources = [];
	
	this.init = function () {
		this.gameOver = false;
		var div = document.getElementById("game-over");
		div.className = "full-screen game-not-over";
		// div.style.opacity = 0;
	}
	
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
		this.family = model.getPlayerFamily();
		this.drawMap(model.map);
		this.drawResources();
		this.drawBuildingScreen(model.possibleBuildings, model);
		this.drawMarket(model.market);
		this.drawPersons(this.family);
		this.updateLogger(model);
		this.updateFeedingInfo(this.family);
	}
	
	this.updateSize = function (mapWidth, mapHeight, width, height) {
		this.maxX = mapWidth * this.tileSize - width;
		this.maxY = mapHeight * this.tileSize - height;
		this.x = Math.max(0, Math.min(this.x, this.maxX));
		this.y = Math.max(0, Math.min(this.y, this.maxY));
	}
	
	this.updateLogger = function(model) {
		var logger = document.getElementById("logger");
		logger.innerHTML = "";
		for (var i = 0; i < model.logger.length; i++ ) {
			var event = model.logger[i];
			var year = Math.floor(event.cityTime / YEAR);
			var text = LAN.get("log", [year, LAN.get(event.text, event.args)]);
			var p = document.createElement("p");
			p.title = event.family.name;
			p.style.color = this.getLoggerColor(event, model, text);
			p.innerHTML = text;
			logger.appendChild(p);// += "<p title='" + event.family.name + "' style='color:" + color + "'>" + text + "</p>";
		}
	}
	
	this.getLoggerColor = function (event, model, text) {
		if (!event.text.includes("success")) {
			return "#f08080";
		}
		if (event.family == model.getPlayerFamily()) {
			if (event.text.includes("die")) {
				return "#f08080";
			}
			return "#faf8ef";
		}
		if (event.family == model.city) {
			return "#faf8ef";
		}
		if (text.includes(model.getPlayerFamily().name)) {
			return "#faf8ef";
		}
		return "black";
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
		div.innerHTML = LAN.get(building.name) + " (" + building.owner.name + ")<br>";
		div.innerHTML += LAN.get("foremen") + ": " + building.getJob("foreman").worker.length + "/" + building.getJob("foreman").max + "<br>";
		div.innerHTML += LAN.get("journeymen") + ": " + building.getJob("journeyman").worker.length + "/" + building.getJob("journeyman").max + "<br>";
		div.innerHTML += LAN.get("apprentices") + ": " + building.getJob("apprentice").worker.length + "/" + building.getJob("apprentice").max + "<br>";
		div.innerHTML += LAN.get("wages") + ": " + building.workerWages().value + "&nbsp;" + LAN.get(building.workerWages().name) + "<br>";
		var produceButtons = [];
		for (var i = 0; i < building.products.length; i++) {
			var product = building.products[i];
			var text = "";
			for (var j = 0; j < product.costs.length; j++) {
				var cost = product.costs[j];
				text += ", " + cost.value + "\u00A0" + LAN.get(cost.name);
			}
			text = text.replace(", ", "");
			div.appendChild(document.createTextNode(text));
			var produceButton = document.createElement("a");
			produceButton.innerHTML = "-\>"; //TODO
			produceButton.title = LAN.get("produce");
			div.appendChild(produceButton);
			produceButtons[i] = produceButton;
			div.appendChild(document.createTextNode(product.value + "\u00A0" + LAN.get(product.name)));
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
		var nextSubCategoryIndex = 0;
		for (var i = 0; i < buildings.length; i++) {
			var building = buildings[i];
			if (nextCategoryIndex < CATEGORIES.length && CATEGORIES[nextCategoryIndex] == building.category) {
				var title = document.createElement("h3");
				title.innerHTML = LAN.get(CATEGORIES[nextCategoryIndex]);
				motherDiv.appendChild(title);
				nextCategoryIndex++;
			}
			if (building.category == "shop" && nextSubCategoryIndex < SUB_CATEGORIES.length && SUB_CATEGORIES[nextSubCategoryIndex] == building.subcat) {
				var title = document.createElement("h4");
				title.innerHTML = LAN.get(SUB_CATEGORIES[nextSubCategoryIndex]);
				motherDiv.appendChild(title);
				nextSubCategoryIndex++;
			}
			var div = this.createBuildingDiv(model.getPlayerFamily(), building);
			motherDiv.appendChild(div);
			buildable[i] = model.canBeBuiltByPlayer(building);
		}
		
		var buttons = document.getElementsByClassName("build");
		this.addOnClickEvents(buttons, buildable, buildings.map(function(b) {return b.name;}));
	}
	
	this.createBuildingDiv = function (family, building) {
		var div = document.createElement("div");
		div.className = "building";
		var title = document.createElement("div");
		title.className = "building-title";
		title.innerHTML = LAN.get(building.name);
		div.appendChild(title);
		
		
		var image = document.createElement("IMG");
		image.src = "resources/images/" + building.name + ".png";
		div.appendChild(image);
		
		
		var costs = document.createElement("div");
		costs.style.display = "inline-block";
		costs.style.verticalAlign = "top";
		
		var time = document.createElement("div");
		time.className = "building-cost";
		time.innerHTML = LAN.get("duration") + ": " + formatYear(building.time);
		costs.appendChild(time);
		
		for (var i = 0; i < building.costs.length; i++) {
			var cost = building.costs[i];
			var costDiv = document.createElement("div");
			costDiv.style.color = family.hasEnough(cost) ? "white" : "#f08080";
			costDiv.className = "building-cost";
			costDiv.innerHTML = LAN.get(cost.name) + ": " + cost.value;
			costs.appendChild(costDiv);
		}
		div.appendChild(costs);

		//TODO effects
		var effects = document.createElement("div");
		effects.style.display = "inline-block";
		effects.style.marginLeft = "5px";
		effects.style.verticalAlign = "top";
		
		effects.appendChild(document.createTextNode(LAN.get("fame") + ": +" + building.fame));
		effects.appendChild(document.createElement("br"));
		
		if (!("undefined" === typeof building.products)) {
			effects.appendChild(document.createTextNode(LAN.get("products")));
			for (var i = 0; i < building.products.length; i++) {
				var product = building.products[i];
				var pDiv = document.createElement("div");
				pDiv.className = "building-cost";
				pDiv.innerHTML = LAN.get(product.name);
				effects.appendChild(pDiv);
			}
		}
		
		div.appendChild(effects);
		
		var button = document.createElement("a");
		button.id = "build-" + building.name;
		button.className = "build";
		button.innerHTML = LAN.get("build");
		div.appendChild(button);
		
		div.onmouseenter = (function () {
			this.addHighlightedResources(building.costs);
			this.drawResources();
		}).bind(this);
		div.onmouseleave = (function () {
			this.removeHighlightedResources(building.costs);
			this.drawResources();
		}).bind(this);
		
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
				buttons[index].style.cursor = enabled[index] ? "pointer" : "not-allowed";
			})(i);
		}
	}
	
	this.drawResources = function () {
		var resources = this.family.resources;
		var motherDiv = document.getElementById("resources");
		motherDiv.innerHTML = "";
		
		for (var i = 0; i < resources.length; i++) {
			var res = resources[i];
			var div = document.createElement("div");
			div.id = 'res-' + res.name;
			div.className = 'resource';
			//div.style.color = this.getColorForResource(this.family, res);
			
			if (this.highlightedResources.indexOf(res.name) !== -1) {
				div.style.color = "#776e65";
				div.style.backgroundColor = "white";
			}
			
			div.innerHTML = LAN.get(res.name) + ": " + res.value.toLocaleString();
			motherDiv.appendChild(div);
		}
	}
	
	this.getColorForResource = function (family, resource) {
		var val = resource.value / family.members.length / 5;
		if (val <= 10) {return "#f08080";}
		if (val <= 100) {return "#ff8c00";}
		return "white";
	}
	
	this.drawPersons = function (family) {
		this.cleanUpPersonCollapsed(family);
		var persons = family.members;
		var div = document.getElementById("content-family");
		div.innerHTML = "";
		
		var title = document.createElement("p");
		title.style.fontSize = "x-large";
		title.innerHTML = LAN.get("family-title", [family.name, family.power, formatYear(family.time)]);
		div.appendChild(title);
		
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			var collapsed = this.isPersonCollapsed(person.id);
			div.appendChild(this.createPersonDiv(person, collapsed));
		}
		
		var buttons = document.getElementsByClassName("person-show-hide-button");
		this.addShowHideFunctionalityTo(buttons);
	}
	
	this.indexOfPersonCollapsed = function (id) {
		for (var i = 0; i < this.personCollapsed.length; i++) {
			if (id == this.personCollapsed[i].id) {
				return i;
			}
		}
		return -1;
	}
	
	this.isPersonCollapsed = function (id) {
		var index = this.indexOfPersonCollapsed(id);
		if (index !== -1) {
			var data = this.personCollapsed[index];
			return data.collapsed;
		}
		//person is new
		this.personCollapsed.push({"id" : id, "collapsed" : true});
		return true;
	}
	
	this.cleanUpPersonCollapsed = function (family) {
		var persons = family.members;
		for (var i = 0; i < persons.length; i++) {
			var person = persons[i];
			if (!person.isAlive) {
				var index = this.indexOfPersonCollapsed(person.id);
				this.personCollapsed.splice(index, 1);
			}
		}
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
	
	this.setPersonCollapsed = function (id, collapsed) {
		var index = this.indexOfPersonCollapsed(id);
		if (index !== -1) {
			this.personCollapsed[index].collapsed = collapsed;
		}
	}
	
	this.createPersonDiv = function (person, collapsed) {
		var div = document.createElement("div");
		div.id = "person-" + person.id;
		div.className = "person";
		var button = document.createElement("a");
		button.id = "button-" + person.id;
		button.className = "person-show-hide-button";
		button.innerHTML = collapsed ? "+" : "-";
		div.appendChild(button);
		div.innerHTML += person.name + " (" + formatYear(person.age) + ")";
		var info = this.createPersonInfo(person, collapsed);
		div.appendChild(info);
		return div;
	}
	
	this.createPersonInfo = function (person, collapsed) {
		var div = document.createElement("div");
		div.id = "info-" + person.id;
		div.style.display = collapsed ? "none" : "block";
		div.className = "person-info";
		div.appendChild(this.createPersonData(LAN.get("age") + ": " + format(person.age)));
		div.appendChild(this.createPersonData(LAN.get("gender") + ": " + LAN.get(person.gender)));
		if (person.spouse == "none") {
			var marriageButton = document.createElement("a");
			marriageButton.innerHTML = LAN.get("marry");
			marriageButton.onclick = function() { marry(person) };
			div.appendChild(marriageButton);
			div.appendChild(document.createTextNode(LAN.get("duration") + ": " + formatYear(2*YEAR)));
		} else {
			div.appendChild(this.createPersonData(LAN.get("spouse") + ": " + person.spouse.name));
			var childButton = document.createElement("a");
			childButton.innerHTML = LAN.get("beget-children");
			childButton.onclick = function() { begetChildren(person) };
			div.appendChild(childButton);
			div.appendChild(document.createTextNode(LAN.get("duration") + ": " + formatYear(17*YEAR)));
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
		var dur = document.createTextNode(LAN.get("duration") + ": " + formatYear(2 * YEAR) + " / " + formatYear(3 * YEAR) + " / " + formatYear(5 * YEAR));
		dur.title = LAN.get("app-jou-for");
		div.appendChild(dur);
		return div;
	}
	
	this.createPersonData = function (text) {
		var div = document.createElement("div");
		div.style.display = "block";
		div.innerHTML = text;
		return div;
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
		div.appendChild(document.createTextNode(product.value + "\u00A0" + LAN.get(product.name)));
		var costText = " " + LAN.get("for") + " ";
		for (var i = 0; i < product.costs.length; i++) {
			costText += product.costs[i].value + "&nbsp;";
			costText += LAN.get(product.costs[i].name);
		}
		var costs = document.createElement("span");
		costs.innerHTML = costText;
		div.appendChild(costs);
		var b = document.createElement("a");
		b.className = "buy";
		b.innerHTML = LAN.get("buy");
		b.onclick = function () { buy(product, product.value); };
		div.appendChild(b);
		var sell = document.createElement("a");
		sell.className = "sell";
		sell.innerHTML = LAN.get("sell");
		sell.onclick = function () { buy(product, -product.value); };
		div.appendChild(sell);
		
		var time = document.createElement("span");
		time.innerHTML = "(" + LAN.get("duration") + ": " + format(product.time) + ")";
		div.appendChild(time);
		
		div.onmouseenter = (function () { 
			this.addHighlightedResources([product]);
			this.addHighlightedResources(product.costs);
			this.drawResources();
		}).bind(this);
		div.onmouseleave = (function () {
			this.removeHighlightedResources([product]);
			this.removeHighlightedResources(product.costs);
			this.drawResources();
		}).bind(this);
		
		return div;
	}
	
	this.addHighlightedResources = function (array) {
		for (var i = 0; i < array.length; i++) {
			this.highlightedResources.push(array[i].name);
		}
	}
	
	this.removeHighlightedResources = function (array) {
		for (var i = 0; i < array.length; i++) {
			var index = this.highlightedResources.indexOf(array[i].name);
			if (index !== -1) {
				this.highlightedResources.splice(index, 1);
			}
		}
	}
	
	this.updateFeedingInfo = function (family) {
		var div = document.getElementById("feeding-info");
		div.innerHTML = "";
		div.appendChild(document.createTextNode(LAN.get("next-feeding")));
		div.appendChild(document.createTextNode(format(family.nextFeedingTime())));
		div.appendChild(document.createElement("br"));
		div.appendChild(document.createTextNode(LAN.get("needed-resources")));
		var costs = family.getFood(1);
		for (var i = 0; i < costs.length; i++) {
			var cost = costs[i];
			div.appendChild(document.createTextNode(cost.value + "\u00a0" + LAN.get(cost.name)));
			if (i < costs.length - 1) {
				div.appendChild(document.createTextNode(", "));
			}
		}
		div.onmouseenter = (function () {
			this.addHighlightedResources(costs);
			this.drawResources();
		}).bind(this);
		div.onmouseleave = (function () {
			this.removeHighlightedResources(costs);
			this.drawResources();
		}).bind(this);
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
	
	this.showGameOverScreen = function (family) {
		if (!this.gameOver) {
			var div = document.getElementById("game-over");
			div.innerHTML = "";
			div.className = "full-screen game-over";
			div.style.opacity = 0;
			setTimeout(fadeIn, 10);
			var title = document.createElement("h1");
			title.innerHTML = "Salita";
			div.appendChild(title);
			var subtitle = document.createElement("p");
			subtitle.innerHTML = "Was zählt, ist die Familie.";
			div.appendChild(subtitle);
			
			var text = document.createElement("p");
			text.innerHTML = LAN.get("game-over", [family.name, family.power]);
			div.appendChild(text);
			
			var restartButton = document.createElement("a");
			restartButton.innerHTML = LAN.get("restart");
			restartButton.onclick = function () { start(); };
			
			div.appendChild(document.createElement("br"));
			div.appendChild(document.createElement("br"));
			div.appendChild(restartButton);
			
			this.gameOver = true;
		}
	}	
}

fadeIn = function() {
	var div = document.getElementById("game-over");
	div.style.opacity = (parseFloat(div.style.opacity) + 0.01);
	if (div.style.opacity < 1) {
		setTimeout(fadeIn, 10);
	}
}