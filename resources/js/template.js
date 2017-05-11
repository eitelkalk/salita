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
var FAMILY_NAMES = ["Abano","Abatangelo","Abatantuono","Abate","Abategiovanni","Abatescianni","Abbà","Abbadelli","Abbandonato","Abbascia","Abbatangelo","Abbatantuono","Abbate","Abbatelli","Abbaticchio","Abbiati","Abelli","Abrami","Abramo","Acardi","Accardi","Accardo","Acciai","Acciaio","Acciaioli","Acconci","Acconcio","Accorsi","Accorso","Accursio","Acerbi","Acone","Acqua","Acquafredda","Acquarone","Acquati","Adami","Adamo","Adamoli","Addario","Adelardi","Adesso","Adimari","Adriatico","Affini","Africani","Africano","Agani","Aggio","Agli","Agnelli","Agnellini","Agnusdei","Agosti","Agostini","Agresta","Agricola","Aiello","Aiolfi","Airaldi","Airò","Aita","Ajello","Alagona","Alamanni","Albanesi","Albani","Albano","Alberghi","Alberghini","Alberici","Alberighi","Albero","Albini","Albricci","Albrici","Aldebrandi","Alderisi","Alduino","Alemagna","Aleppo","Alesci","Alescio","Alesi","Alesini","Alesio","Alessandri","Alessi","Alfero","Aliberti","Alinari","Aliprandi","Allegri","Allegro","Alò","Aloi","Aloia","Aloisi","Altamura","Altimari","Altoviti","Alunni","Amadei","Amadori","Amalberti","Amantea","Amato","Amatore","Ambrogi","Ambrosi","Amerighi","Amoretto","Angioli","Ansaldi","Anselmetti","Anselmi","Antonelli","Antonini","Antonino","Aquila","Aquino","Arbore","Ardiccioni","Ardizzone","Ardovini","Arena","Arlotti","Armando","Armani","Armati","Arnolfi","Arnoni","Arrighetti","Arrighi","Arrigucci","Azzarà","Baggi","Baggio","Baglio","Bagni","Bagnoli","Balboni","Baldi","Baldini","Baldinotti","Baldovini","Bandini","Bandoni","Barbieri","Barone","Barsotti","Bartalotti","Bartolomei","Bartolomeo","Barzetti","Basile","Bassanelli","Bassani","Bassi","Basso","Battaglia","Bazzoli","Bellandi","Bellandini","Bellincioni","Bellini","Bello","Bellomi","Bellomo","Belloni","Belluomo","Belmonte","Bencivenni","Benedetti","Benenati","Benetton","Benini","Benvenuti","Berardi","Bergamaschi","Berti","Bertolini","Biagi","Biancardi","Bianchi","Bianco","Bicchieri","Biondi","Biondo","Boerio","Bologna","Bonaccorsi","Bonaccorso","Bonaventura","Bondesan","Bonomo","Borghi","Borgnino","Borgogni","Bosco","Bove","Boveri","Brambilla","Breda","Brioschi","Brivio","Brunetti","Bruno","Buffone","Bulgarelli","Bulgari","Buonarroti","Busto","Caiazzo","Caito","Caivano","Calabrese","Calligaris","Campana","Campo","Cantù","Capello","Capitani","Carbone","Carboni","Carideo","Carlevaro","Carnevale","Caro","Carrara","Caruso","Casale","Cassano","Catalano","Cattaneo","Cavalcante","Cavallo","Cingolani","Cino","Cipriani","Cisternino","Coiro","Cola","Colombera","Colombo","Columbo","Como","Confortola","Conti","Corna","Corrà","Corti","Corvi","Costa","Costantini","Costanzo","Cracchiolo","Cremaschi","Cremona","Cremonesi","Crespi","Crespo","Croce","Crocetti","Cucinotta","Cuocco","Cuoco","D'Ambrosio","Damiani","D'Amore","D'Angelo","D'Antonio","De Angelis","De Campo","De Felice","De Filippis","De Fiore","De Laurentis","De Luca","De Palma","De Rege","De Santis","De Vitis","Di Antonio","Di Caprio","Di Mercurio","Dinapoli","Dioli","Di Pasqua","Di Pietro","Di Stefano","Donati","D'Onofrio","Drago","Durante","Elena","Episcopo","Ermacora","Esposito","Evangelista","Fabbri","Fabbro","Falco","Faraldo","Farina","Farro","Fattore","Fausti","Fava","Favero","Fermi","Ferrara","Ferrari","Ferraro","Ferrero","Ferro","Fierro","Filippi","Fini","Fiore","Fiscella","Fonda","Fontana","Fortunato","Franco","Franzese","Furlan","Gabrielli","Gagliardi","Gallo","Ganza","Garfagnini","Garofalo","Gaspari","Gatti","Genovese","Gentile","Germano","Giannino","Gimondi","Giordano","Gismondi","Giùgovaz","Giunta","Goretti","Gori","Greco","Grillo","Grimaldi","Gronchi","Grossi","Grosso","Guarneri","Guerra","Guerriero","Guidi","Guttuso","Idoni","Innocenti","Labriola","Làconi","Laganà","Lagomarsìno","Lagorio","Laguardia","Lama","Lamberti","Lamon","Landi","Lando","Landolfi","Laterza","Laurito","Lazzari","Lecce","Leccese","Leggièri","Lèmmi","Leone","Leoni","Lippi","Locatelli","Lombardi","Longo","Lupo","Luzzatto","Maestri","Magro","Mancini","Manco","Mancuso","Manfredi","Manfredonia","Mantovani","Marchegiano","Marchesi","Marchetti","Marchioni","Marconi","Mari","Maria","Mariani","Marino","Marmo","Martelli","Martinelli","Masi","Masin","Mazza","Merlo","Messana","Micheli","Milani","Milano","Modugno","Mondadori","Mondo","Montagna","Montana","Montanari","Monte","Monti","Morandi","Morello","Moretti","Morra","Moschella","Mosconi","Motta","Muggia","Muraro","Murgia","Murtas","Nacar","Naggi","Naggia","Naldi","Nana","Nani","Nanni","Nannini","Napoleoni","Napoletani","Napoliello","Nardi","Nardo","Nardovino","Nasato","Nascimbene","Nascimbeni","Natale","Nave","Nazario","Necchi","Negri","Negrini","Nelli","Nenci","Nepi","Neri","Neroni","Nervetti","Nervi","Nespola","Nicastro","Nicchi","Nicodemo","Nicolai","Nicolosi","Nicosia","Nicotera","Nieddu","Nieri","Nigro","Nisi","Nizzola","Noschese","Notaro","Notoriano","Oberti","Oberto","Ongaro","Orlando","Orsini","Pace","Padovan","Padovano","Pagani","Pagano","Palladino","Palmisano","Palumbo","Panzavecchia","Parisi","Parma","Parodi","Parri","Parrino","Passerini","Pastore","Paternoster","Pavesi","Pavone","Pavoni","Pecora","Pedrotti","Pellegrino","Perugia","Pesaresi","Pesaro","Pesce","Petri","Pherigo","Piazza","Piccirillo","Piccoli","Pierno","Pietri","Pini","Piovene","Piraino","Pisani","Pittaluga","Poggi","Poggio","Poletti","Pontecorvo","Portelli","Porto","Portoghese","Potenza","Pozzi","Profeta","Prosdocimi","Provenza","Provenzano","Pugliese","Quaranta","Quattrocchi","Ragno","Raimondi","Rais","Rana","Raneri","Rapallino","Ratti","Ravenna","Ré","Ricchetti","Ricci","Riggi","Righi","Rinaldi","Riva","Rizzo","Robustelli","Rocca","Rocchi","Rocco","Roma","Romagna","Romagnoli","Romano","Romero","Roncalli","Ronchi","Rosa","Rossi","Rossini","Rotolo","Rovigatti","Ruggeri","Russo","Rustici","Ruzzier","Sabbadin","Sacco","Sala","Salomon","Salucci","Salvaggi","Salvai","Salvail","Salvatici","Salvay","Sanna","Sansone","Santini","Santoro","Sapienti","Sarno","Sarti","Sartini","Sarto","Savona","Scarpa","Scarsi","Scavo","Sciacca","Sciacchitano","Sciarra","Scordato","Scotti","Scutese","Sebastiani","Sebastino","Segreti","Selmone","Selvaggio","Serafin","Serafini","Serpico","Sessa","Sgro","Siena","Silvestri","Sinagra","Soldati","Somma","Sordi","Soriano","Sorrentino","Spada","Spanò","Sparacello","Speziale","Spini","Stabile","Stablum","Stilo","Sultana","Tafani","Tamàro","Tamboia","Tanzi","Tarantino","Taverna","Tedesco","Terranova","Tessaro","Testa","Tiraboschi","Tivoli","Todaro","Toloni","Tornincasa","Toselli","Tosetti","Tosi","Tosto","Trapani","Traversa","Traversi","Traversini","Traverso","Trucco","Trudu","Tumicelli","Turati","Turchi","Uberti","Uccello","Uggeri","Ughi","Ungaretti","Ungaro","Vacca","Vaccaro","Valenti","Valentini","Valerio","Varano","Ventimiglia","Ventura","Verona","Veronesi","Vescovi","Vespa","Vestri","Vicario","Vico","Vigo","Villa","Vinci","Viola","Vitali","Viteri","Voltolini","Zanetti","Zangari","Zappa","Zeni","Zini","Zino","Zunino"];

var DIE_TEXTS = [" ist von uns gegangen.", " starb.", " kam ums Leben."];

var BUILDINGS = [
	{
		"name"  : "HomePlayer01",
		"text"  : "Holzhaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePlayer02",
		"text"  : "Steinhaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePlayer03",
		"text"  : "Stadthaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePlayer04",
		"text"  : "Stadtvilla",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePlayer05",
		"text"  : "Palazzo",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePlayer06",
		"text"  : "Reggia",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC01",
		"text"  : "Holzhaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC02",
		"text"  : "Steinhaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC03",
		"text"  : "Stadthaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC04",
		"text"  : "Stadtvilla",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC05",
		"text"  : "Palazzo",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "HomePC06",
		"text"  : "Reggia",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Mill",
		"text"  : "Mühle",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Bakery",
		"text"  : "Bäckerei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "PastryShop",
		"text"  : "Konditorei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Wainwrights",
		"text"  : "Wagnerei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Joinery",
		"text"  : "Tischlerei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Carpentry",
		"text"  : "Zimmerei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Tavern",
		"text"  : "Kneipe",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Inn",
		"text"  : "Gasthaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Hotel",
		"text"  : "Hotel",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Tannery",
		"text"  : "Gerberei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Saddlery",
		"text"  : "Sattlerei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "CobblersShop",
		"text"  : "Schusterei",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Church",
		"text"  : "Kirche",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Cathedral",
		"text"  : "Kathedrale",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Duomo",
		"text"  : "Dom",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "Monastery",
		"text"  : "Kloster",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "CommunityHall",
		"text"  : "Gemeindehaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"  : "TownHall",
		"text"  : "Rathaus",
		"time"  : 300,
		"costs" : [{"name"  : "gold", "value" : 100}]
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
	var family = new Family(START_RESOURCES[i], 0, START_CITY);
	family.name = selectRandomlyFrom(FAMILY_NAMES);
	START_FAMILIES[i] = family;
	var noPersons = Math.floor(Math.random() * 5) + 1;
	for (var j = 0; j < noPersons; j++) {
		var person = new Person(START_FAMILIES[i]);
		person.age = Math.floor(Math.random() * YEAR * 15) + 15 * YEAR;
		person.maxAge = Math.floor(Math.random() * YEAR * 30) + 50 * YEAR;
		person.id = uid();
		person.gender = Math.random() >= 0.5 ? "male" : "female";
		person.genderText = person.gender == "male" ? "männlich" : "weiblich";
		person.name = person.gender == "male" ? selectRandomlyFrom(MALE_NAMES) : selectRandomlyFrom(FEMALE_NAMES);
		person.spouse = "none";
		START_PERSONS.push();
	}
}

function selectRandomlyFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

var START_BUILDINGS = []; //TODO