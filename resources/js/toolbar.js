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

function buy(id, multi) {
	var cost = document.getElementById(id + '-cost').value;
	var div = document.getElementById('res-' + id);
	var text = div.innerHTML.split(": ");
	var name = text[0];
	var value = parseInt(text[1], 10);
	var increment = document.getElementById('in-' + id).value;
	value += multi*increment;
	div.innerHTML = name + ": " + value;
	
	//TODO separate model view
	//TODO 0 lower bound
}