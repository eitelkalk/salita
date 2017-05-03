//generates a unique ID for persons
var UID = 0; //TODO store
function uid() {
	UID += 1;
	return UID;
}

//Define global variables
//Dirty, should be loaded via JSON
var MALE_NAMES = ["Abele","Abramo","Achille","Adalberto","Adamo","Adelardo","Ademaro","Adolfo","Adriano","Agapito","Agostino","Albano","Alberico","Alberto","Albino","Alcide","Aldo","Ale","Alessandro","Alessio","Alex","Alfeo","Alfonso","Alfredo","Aloisio","Alonzo","Alvise","Amadeo","Amando","Amato","Amatore","Ambrogino","Ambrogio","Amedeo","Amerigo","Amilcare","Amore","Ampelio","Anacleto","Anastasio","Andrea","Angelino","Angelo","Angiolo","Annibale","Annunziato","Ansaldo","Anselmo","Antelmo","Antonello","Antonino","Antonio","Arcangelo","Ardito","Arduino","Aristide","Armando","Arnaldo","Arnolfo","Aroldo","Arrigo","Arsenio","Artemio","Arturo","Attilio","Augusto","Aureliano","Aurelio","Balbino","Baldassare","Baldo","Baldovino","Bartolo","Bartolomeo","Basilio","Battista","Benedetto","Beniamino","Benigno","Benito","Benvenuto","Beppe","Berardo","Bernardino","Bernardo","Berto","Bertoldo","Bertrando","Bettino","Biaggio","Biagino","Biagio","Bonaccorso","Bonaventura","Bonifacio","Bruno","Callisto","Camillo","Carlo","Carmelo","Carmine","Casimiro","Cecilio","Celeste","Celestino","Celino","Celio","Celso","Cesare","Cesarino","Cipriano","Ciriaco","Cirillo","Cirino","Ciro","Claudio","Clemente","Cleto","Colombano","Colombo","Concetto","Cornelio","Corradino","Corrado","Cosimo","Cosma","Costantino","Costanzo","Crescenzo","Cristiano","Cristoforo","Damiano","Daniele","Danilo","Dante","Dario","Davide","Demetrio","Desiderio","Dino","Diodato","Dionisio","Domenico","Donatello","Donato","Doriano","Duilio","Durante","Edgardo","Edmondo","Edoardo","Efisio","Egidio","Eleuterio","Elia","Eligio","Elio","Eliseo","Elmo","Elpidio","Emanuele","Emidio","Emiliano","Emilio","Ennio","Enrico","Enzo","Epifanio","Erasmo","Ercole","Ermanno","Ermenegildo","Ermes","Ermete","Erminio","Ernesto","Ettore","Eugenio","Eusebio","Eustachio","Eustorgio","Eutimio","Evaristo","Ezio","Fabiano","Fabio","Fabrizio","Faustino","Fausto","Fedele","Federico","Federigo","Felice","Feliciano","Ferdinando","Ferruccio","Filiberto","Filippo","Fiorenzo","Fiorino","Firmino","Flaviano","Flavio","Floriano","Fortunato","Francesco","Franco","Fredo","Fulgenzio","Fulvio","Gabriele","Gallo","Gaspare","Gasparo","Gastone","Gavino","Gennarino","Gennaro","Gerardo","Germano","Gerolamo","Gervasio","Gherardo","Giacinto","Giacobbe","Giacomo","Giambattista","Giampaolo","Giampiero","Gian","Giancarlo","Gianfranco","Gianluca","Gianluigi","Gianmarco","Gianmaria","Gianni","Giannino","Gianpaolo","Gianpiero","Gilberto","Gino","Gioacchino","Gioachino","Gioele","Gionata","Giordano","Giorgino","Giorgio","Giosue","Giotto","Giovanni","Giraldo","Girolamo","Giuliano","Giulio","Giuseppe","Giustino","Glauco","Goffredo","Graziano","Gregorio","Gualtiero","Guerino","Guglielmo","Guido","Gustavo","Iacopo","Ignazio","Ilario","Innocenzo","Ippolito","Isaia","Isidoro","Italo","Ivan","Ivano","Ivo","Jacopo","Ladislao","Lamberto","Lapo","Lauro","Lazzaro","Leandro","Lelio","Leonardo","Leone","Loreto","Loris","Lotario","Luca","Luciano","Lucilio","Lucio","Ludovico","Luigi","Luigino","Manfredo","Manlio","Manuel","Manuele","Marcellino","Marcello","Marciano","Marco","Maria","Marino","Mario","Martino","Marzio","Massimiliano","Massimo","Matteo","Mattia","Maurizio","Mauro","Melchiorre","Michelangelo","Michele","Narciso","Natale","Natanaele","Nazario","Nazzareno","Nerio","Nero","Niccolo","Nico","Nicodemo","Nicola","Oddo","Oliviero","Orazio","Orfeo","Orlando","Orsino","Orso","Oscar","Pancrazio","Panfilo","Pantaleone","Paolino","Paolo","Paride","Pasquale","Pasqualino","Patrizio","Pellegrino","Peppe","Peppi","Peppino","Pier","Pierino","Piero","Pietro","Pino","Pio","Placido","Plinio","Pompeo","Ponzio","Porfirio","Primo","Prospero","Prudenzio","Quirino","Raffaele","Raffaello","Raimondo","Raniero","Raoul","Raul","Remigio","Remo","Renato","Renzo","Riccardo","Rico","Rino","Roberto","Rocco","Rodolfo","Rodrigo","Rolando","Romano","Romeo","Romilda","Romolo","Rosario","Rufino","Ruggero","Ruggiero","Sabino","Salvatore","Samuele","Sandro","Sansone","Santino","Santo","Saturnino","Saverio","Savino","Savio","Scevola","Sebastiano","Serafino","Sergio","Sesto","Settimio","Severiano","Severino","Severo","Sigfrido","Silvano","Silvestro","Silvio","Simone","Teo","Teobaldo","Teodoro","Teodosio","Teofilo","Terenzio","Terzo","Timoteo","Tino","Tito","Tiziano","Tommaso","Tonino","Tonio","Tore","Uberto","Ugo","Ulderico","Ulisse","Umberto","Urbano","Valentino","Valerio","Valter","Vanni","Vasco","Venceslao","Vespasiano","Vico","Vilfredo","Vincente","Vincenzo","Vinicio","Virgilio","Vitale","Vito","Vittore","Vittorino","Vittorio","Walter","Zeno"];
var FEMALE_NAMES = ["Ada","Adelaide","Adele","Adelina","Adriana","Agata","Agnese","Agostina","Alba","Alberta","Albertina","Albina","Alda","Alfonsina","Alfreda","Alice","Alina","Allegra","Alma","Amalia","Amanda","Amaranta","Ambra","Amedea","Amelia","Amore","Anastasia","Andreina","Angela","Angelica","Angelina","Anna","Annalisa","Annamaria","Annetta","Annunciata","Annunziata","Anselma","Antonella","Antonia","Antonietta","Antonina","Apollonia","Arianna","Armida","Asia","Aurelia","Aureliana","Aurora","Azzurra","Balbina","Barbara","Beatrice","Benedetta","Benigna","Berenice","Bernardetta","Bernardina","Berta","Bettina","Bibiana","Bice","Brigida","Bruna","Brunella","Brunilda","Calogera","Camilla","Carla","Carlotta","Carmela","Carmen","Carmina","Carola","Carolina","Cassandra","Celestina","Celia","Cesarina","Chiara","Chiarina","Cinzia","Clara","Claretta","Clarissa","Claudia","Clelia","Clementina","Clio","Cloe","Clotilde","Colomba","Colombina","Concetta","Concettina","Consolata","Cornelia","Corona","Cosima","Cristiana","Cristina","Crocetta","Crocifissa","Dafne","Damiana","Dania","Debora","Delfina","Delia","Demetra","Desideria","Diana","Donata","Donatella","Dorotea","Edda","Emanuela","Emilia","Emiliana","Emma","Erika","Ermelinda","Ermenegilda","Erminia","Ernesta","Ernestina","Ersilia","Eufemia","Eugenia","Eulalia","Eva","Evelina","Fabia","Fabiana","Fabiola","Fabrizia","Fausta","Faustina","Febe","Federica","Feliciana","Felicita","Ferdinanda","Fernanda","Fiammetta","Filippa","Filomena","Fina","Fioralba","Fiorella","Fiorenza","Flavia","Flaviana","Flora","Floriana","Fortunata","Franca","Francesca","Fulvia","Gabriella","Gaetana","Gaia","Geltrude","Gemma","Genoveffa","Gerarda","Germana","Gessica","Gia","Giacinta","Giacoma","Giacomina","Giada","Gianna","Giannina","Gilberta","Gilda","Gina","Ginevra","Gioconda","Gioia","Giorgia","Giorgina","Giosetta","Giovanna","Giovannetta","Gisella","Giuditta","Giulia","Giuliana","Giulietta","Giuseppa","Giuseppina","Giustina","Gloria","Grazia","Graziana","Graziella","Ida","Imelda","Imma","Immacolata","Ines","Iolanda","Irene","Isa","Isidora","Isotta","Itala","Italia","Jessica","Jolanda","Lara","Laura","Lia","Liboria","Lidia","Liliana","Lina","Lisa","Livia","Liviana","Lora","Loredana","Lorena","Loretta","Lorita","Luana","Luce","Lucia","Luciana","Lucilla","Lucrezia","Ludovica","Luigia","Luigina","Luisa","Luisella","Maddalena","Mafalda","Manuela","Marcella","Margherita","Maria","Mariella","Marietta","Marilena","Marina","Marinella","Marisa","Maristella","Marta","Martina","Marzia","Matilde","Mattea","Maura","Mimi","Mirabella","Mirella","Mirta","Monica","Nadia","Narcisa","Natalia","Nella","Nerina","Nicoletta","Nicolina","Nina","Nives","Noemi","Nora","Norina","Norma","Nunzia","Nunziatina","Ofelia","Olga","Olimpia","Olivia","Oriana","Orlanda","Ornella","Orsina","Orsola","Osanna","Ottavia","Palmira","Paola","Paolina","Pasqualina","Patrizia","Perla","Perlita","Petronilla","Pia","Piera","Pierina","Pietra","Pietrina","Pina","Placida","Priscilla","Rachele","Raffaella","Raimonda","Rebecca","Regina","Renata","Riccarda","Rina","Roberta","Robertina","Romana","Romilda","Romina","Romola","Rosa","Rosalba","Rosalia","Rosalinda","Rosangela","Rosanna","Rosaria","Rosario","Rosella","Rosetta","Rosina","Rossa","Rossana","Rossella","Rubina","Sabina","Sabrina","Salvatrice","Samanta","Samantha","Samuela","Sandra","Santa","Santina","Santuzza","Sara","Saveria","Savina","Scilla","Sebastiana","Selvaggia","Serafina","Serena","Severina","Sibilla","Silvana","Silvestra","Silvia","Simona","Simonetta","Sofia","Sonia","Stefania","Stella","Susanna","Tania","Tatiana","Tecla","Teodora","Teofila","Teresa","Tina","Tiziana","Tonina","Tullia","Urbana","Valentina","Valeria","Vanda","Vanessa","Vanna","Veronica","Vincenza","Viola","Violetta","Virginia","Zaira","Zita","Zoe"];

var DIE_TEXTS = [" ist von uns gegangen.", " starb.", " kam ums Leben."];

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
	var noPersons = Math.floor(Math.random() * 5) + 1;
	for (var j = 0; j < noPersons; j++) {
		var person = new Person(START_FAMILIES[i]);
		person.age = Math.floor(Math.random() * YEAR * 15) + 15 * YEAR;
		person.maxAge = Math.floor(Math.random() * YEAR * 30) + 50 * YEAR;
		person.maxAge = person.age + 1;
		person.id = uid();
		person.gender = Math.random() >= 0.5 ? "male" : "female";
		person.genderText = person.gender == "male" ? "männlich" : "weiblich";
		person.name = person.gender == "male" ? selectRandomlyFrom(MALE_NAMES) : selectRandomlyFrom(FEMALE_NAMES);
		START_PERSONS.push();
	}
}

function selectRandomlyFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var START_BUILDINGS = []; //TODO