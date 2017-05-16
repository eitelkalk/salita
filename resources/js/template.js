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

var LAN = {
	words : {}
}
LAN.words["HomePlayer01"] = "Holzhaus";
LAN.words["HomePlayer02"] = "Steinhaus";
LAN.words["HomePlayer03"] = "Stadthaus";
LAN.words["HomePlayer04"] = "Stadtvilla";
LAN.words["HomePlayer05"] = "Palazzo";
LAN.words["HomePlayer06"] = "Reggia";
LAN.words["HomePC01"] = "Holzhaus";
LAN.words["HomePC02"] = "Steinhaus";
LAN.words["HomePC03"] = "Stadthaus";
LAN.words["HomePC04"] = "Stadtvilla";
LAN.words["HomePC05"] = "Palazzo";
LAN.words["HomePC06"] = "Reggia";
LAN.words["Mill"] = "Mühle";
LAN.words["Bakery"] = "Bäckerei";
LAN.words["PastryShop"] = "Konditorei";
LAN.words["Wainwrights"] = "Wagnerei";
LAN.words["Joinery"] = "Tischlerei";
LAN.words["Carpentry"] = "Zimmerei";
LAN.words["Tavern"] = "Kneipe";
LAN.words["Inn"] = "Gasthaus";
LAN.words["Hotel"] = "Hotel";
LAN.words["Tannery"] = "Gerberei";
LAN.words["Saddlery"] = "Sattlerei";
LAN.words["CobblersShop"] = "Schusterei";
LAN.words["Church"] = "Kirche";
LAN.words["Cathedral"] = "Kathedrale";
LAN.words["Duomo"] = "Dom";
LAN.words["Monastery"] = "Kloster";
LAN.words["CommunityHall"] = "Gemeindehaus";
LAN.words["TownHall"] = "Rathaus";
LAN.words["home"] = "Wohngebäude";
LAN.words["shop"] = "Produktionsgebäude";
LAN.words["church"] = "Kirche";
LAN.words["town"] = "Verwaltungsgebäude";
LAN.words["gold"] = "Gold";
LAN.words["wood"] = "Holz";
LAN.words["crop"] = "Getreide";
LAN.words["flour"] = "Mehl";
LAN.words["bread"] = "Brot";
LAN.words["cake"] = "Kuchen";
LAN.words["cart"] = "Karren";
LAN.words["furniture"] = "Möbel";
LAN.words["truss"] = "Gebälk";
LAN.words["beer"] = "Bier";
LAN.words["cow"] = "Kuh";
LAN.words["leather"] = "Leder";
LAN.words["meat"] = "Fleisch";
LAN.words["harness"] = "Geschirr";
LAN.words["shoe"] = "Schuh";
LAN.words["stone"] = "Stein";
LAN.words["tile"] = "Ziegel";
LAN.words["brick"] = "Baustein";
LAN.words["sculpture"] = "Skulptur";
LAN.words["iron"] = "Eisen";
LAN.words["gate"] = "Tor";
LAN.words["tool"] = "Werkzeug";
LAN.words["weapon"] = "Waffe";
LAN.words["sheep"] = "Schaf";
LAN.words["freshmeat"] = "Frischfleisch";
LAN.words["wool"] = "Wolle";
LAN.words["silk"] = "Seide";
LAN.words["dyedwool"] = "Farbwolle";
LAN.words["dyedsilk"] = "Farbseide";
LAN.words["fabrik"] = "Stoff";
LAN.words["cloth"] = "Tuch";
LAN.words["clothes"] = "Kleidung";
LAN.words["herbs"] = "Kräuter";
LAN.words["medicine"] = "Medizin";
LAN.words["male"] = "männlich";
LAN.words["female"] = "weiblich";
LAN.words["built"] = "gebaut";
LAN.words["foremen"] = "Meister";
LAN.words["journeymen"] = "Gesellen";
LAN.words["apprentices"] = "Lehrlinge";
LAN.words["foreman"] = "Meister";
LAN.words["journeyman"] = "Geselle";
LAN.words["apprentice"] = "Lehrling";
LAN.words["residents"] = "Bewohner";
LAN.words["none"] = "keine";
LAN.words["free space"] = "freie Plätze";
LAN.words["time"] = "Zeit";
LAN.words["build"] = "Bauen";
LAN.words["family-age"] = "Familienalter";
LAN.words["city-age"] = "Stadtalter";
LAN.words["family"] = "Familie";
LAN.words["age"] = "Alter";
LAN.words["gender"] = "Geschlecht";
LAN.words["spouse"] = "Ehepartner";
LAN.words["year"] = "Jahr";
LAN.words["years"] = "Jahre";
LAN.words["month"] = "Monat";
LAN.words["months"] = "Monate";
LAN.words["day"] = "Tag";
LAN.words["days"] = "Tage";
LAN.words["y"] = "J";
LAN.words["ys"] = "J";
LAN.words["m"] = "M";
LAN.words["ms"] = "M";
LAN.words["d"] = "T";
LAN.words["ds"] = "T";
LAN.words["marry"] = "Verheiraten";
LAN.words["each at"] = "für je";
LAN.words["and"] = "und";
LAN.words["buy"] = "Kaufen";
LAN.words["sell"] = "Verkaufen";
LAN.words["log-sold-success"] = "#1&nbsp;#2 am Markt verkauft.";
LAN.words["log-bought-success"] = "#1&nbsp;#2 am Markt gekauft.";
LAN.words["log-sold-fail"] = "Verkauf von #1&nbsp;#2 am Markt fehlgeschlagen.";
LAN.words["log-bought-fail"] = "Kauf von #1&nbsp;#2 am Markt fehlgeschlagen.";
LAN.words["log-marriage-success"] = "#1 #2 und #3 #4 haben geheiratet. Die Mitgift von #5&nbsp;#6 wurde von der Familie #2 bezahlt.";
LAN.words["log-marriage-fail"] = "#1 hat keinen passenden Partner gefunden.";
LAN.words["log-marriage-denied"] = "#1 kann nicht heiraten, weil kein freies Haus verfügbar ist.";
LAN.words["child"] = "Kind";
LAN.words["beget-children"] = "Kinder zeugen";
LAN.words["log-children-denied"] = "#1 und #2 können keine Kinder zeugen, weil kein freies Haus verfügbar ist.";
LAN.words["log-children-success"] = "#1 erblickt das Licht der Welt.";
LAN.words["works-as-at"] = "Arbeitet als #1 in: #2";
LAN.words["educate"] = "Ausbilden";
LAN.words["log-works-at"] = "#3: #1 wurde als #2 eingestellt.";
LAN.words["produce"] = "Produzieren";
LAN.words["log-produce-success"] = "#1&nbsp;#2 in #3 produziert."

LAN.get = function (key, args) {
	if (key in LAN.words) {
		if ("undefined" === typeof args) {
			return LAN.words[key];
		} else {
			var text = LAN.words[key];
			for (var i = 0; i < args.length; i++) {
				var regex = new RegExp("#" + (i+1), 'g');
				text = text.replace(regex, args[i]);
			}
			return text;
		}
	} else {
		return "Error"; //TODO return key on default
	}
}

var DIE_TEXTS = [" ist von uns gegangen.", " starb.", " kam ums Leben."];

var BUILDINGS = [
	{
		"name"		: "HomePlayer01",
		"category"	: "home",
		"time"		: 300,
		"costs"		: [	{"name" : "gold", "value" : 100}, 
						{"name" : "furniture", "value" : 5}, 
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 100}, 
						{"name" : "brick", "value" : 300}, 
						{"name" : "gate", "value" : 1}],
		"capacity"	: 5
	},
	{
		"name"		: "HomePlayer02",
		"category"	: "home",
		"time"		: 400,
		"costs"		: [	{"name" : "gold", "value" : 200}, 
						{"name" : "furniture", "value" : 10}, 
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 150}, 
						{"name" : "brick", "value" : 450}, 
						{"name" : "gate", "value" : 1}],
		"capacity"	: 7
	},
	{
		"name"		: "HomePlayer03",
		"category"	: "home",
		"time"		: 600,
		"costs"		: [	{"name" : "gold", "value" : 400}, 
						{"name" : "furniture", "value" : 15}, 
						{"name" : "truss", "value" : 2}, 
						{"name" : "tile", "value" : 200}, 
						{"name" : "brick", "value" : 600}, 
						{"name" : "gate", "value" : 1}],
		"capacity"	: 8
	},
	{
		"name"		: "HomePlayer04",
		"category"	: "home",
		"time"		: 900,
		"costs"		: [	{"name" : "gold", "value" : 700}, 
						{"name" : "furniture", "value" : 20}, 
						{"name" : "truss", "value" : 2}, 
						{"name" : "tile", "value" : 300}, 
						{"name" : "brick", "value" : 750}, 
						{"name" : "gate", "value" : 1}],
		"capacity"	: 10
	},
	{
		"name"		: "HomePlayer05",
		"category"	: "home",
		"time"		: 1300,
		"costs"		: [	{"name" : "gold", "value" : 1100}, 
						{"name" : "furniture", "value" : 25}, 
						{"name" : "truss", "value" : 3}, 
						{"name" : "tile", "value" : 450}, 
						{"name" : "brick", "value" : 1000}, 
						{"name" : "sculpture", "value" : 2}, 
						{"name" : "gate", "value" : 1}],
		"capacity"	: 15
	},
	{
		"name"		: "HomePlayer06",
		"category"	: "home",
		"time"		: 1800,
		"costs"		: [	{"name" : "gold", "value" : 1500}, 
						{"name" : "furniture", "value" : 30}, 
						{"name" : "truss", "value" : 4}, 
						{"name" : "tile", "value" : 600}, 
						{"name" : "brick", "value" : 1500}, 
						{"name" : "sculpture", "value" : 10}, 
						{"name" : "gate", "value" : 2}],
		"capacity"	: 20
	},
	{
		"name"  	: "Mill",
		"category"	: "shop",
		"time"		: 300,
		"costs"		: [	{"name" : "gold", "value" : 100},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 100}, 
						{"name" : "brick", "value" : 300}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 2}, {"name" : "journeyman", "max" : 1}, {"name" : "foreman", "max" : 1}],
		"products"	: [{"name" : "flour", "value" : 300, "costs": [{"name" : "crop", "value" : 3000}]}]
	},
	{
		"name"  	: "Bakery",
		"category"	: "shop",
		"time"		: 600,
		"costs"		: [	{"name" : "gold", "value" : 500},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 200}, 
						{"name" : "brick", "value" : 500}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 8}, {"name" : "journeyman", "max" : 4}, {"name" : "foreman", "max" : 2}],
		"products"	: [{"name" : "bread", "value" : 300, "costs": [{"name" : "flour", "value" : 30}]}]
	},
	{
		"name"		: "PastryShop",
		"category"	: "shop",
		"time"		: 900,
		"costs"		: [	{"name" : "gold", "value" : 1000},
						{"name" : "truss", "value" : 2}, 
						{"name" : "tile", "value" : 400}, 
						{"name" : "brick", "value" : 1000}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 16}, {"name" : "journeyman", "max" : 8}, {"name" : "foreman", "max" : 4}],
		"products"	: [{"name" : "cake", "value" : 50, "costs": [{"name" : "flour", "value" : 30}]}]
	},
	{
		"name"		: "Wainwrights",
		"category"	: "shop",
		"time"		: 300,
		"costs"		: [	{"name" : "gold", "value" : 100},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 100}, 
						{"name" : "brick", "value" : 300}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 2}, {"name" : "journeyman", "max" : 1}, {"name" : "foreman", "max" : 1}],
		"products"	: [{"name" : "cart", "value" : 50, "costs": [{"name" : "wood", "value" : 100}]}]
	},
	{
		"name"		: "Joinery",
		"category"	: "shop",
		"time"		: 600,
		"costs"		: [	{"name" : "gold", "value" : 500},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 200}, 
						{"name" : "brick", "value" : 500}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 8}, {"name" : "journeyman", "max" : 4}, {"name" : "foreman", "max" : 2}],
		"products"	: [{"name" : "furniture", "value" : 10, "costs": [{"name" : "wood", "value" : 100}]}]
	},
	{
		"name"		: "Carpentry",
		"category"	: "shop",
		"time"		: 900,
		"costs"		: [	{"name" : "gold", "value" : 1000},
						{"name" : "truss", "value" : 2}, 
						{"name" : "tile", "value" : 400}, 
						{"name" : "brick", "value" : 1000}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 16}, {"name" : "journeyman", "max" : 8}, {"name" : "foreman", "max" : 4}],
		"products"	: [{"name" : "truss", "value" : 2, "costs": [{"name" : "wood", "value" : 200}]}]
	},
	{
		"name"		: "Tavern",
		"category"	: "shop",
		"time"		: 300,
		"costs"		: [	{"name" : "gold", "value" : 100},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 100}, 
						{"name" : "brick", "value" : 300}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 2}, {"name" : "journeyman", "max" : 1}, {"name" : "foreman", "max" : 1}],
		"products"	: [{"name" : "beer", "value" : 1000, "costs": [{"name" : "crop", "value" : 10000}]}]
	},
	{
		"name"		: "Inn",
		"category"	: "shop",
		"time"		: 600,
		"costs"		: [	{"name" : "gold", "value" : 500},
						{"name" : "truss", "value" : 1}, 
						{"name" : "furniture", "value" : 10}, 
						{"name" : "tile", "value" : 200}, 
						{"name" : "brick", "value" : 500}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 8}, {"name" : "journeyman", "max" : 4}, {"name" : "foreman", "max" : 2}],
		"products"	: [] //TODO
	},
	{
		"name"		: "Hotel",
		"category"	: "shop",
		"time"		: 900,
		"costs"		: [	{"name" : "gold", "value" : 1000},
						{"name" : "truss", "value" : 2}, 
						{"name" : "furniture", "value" : 40}, 
						{"name" : "tile", "value" : 400}, 
						{"name" : "brick", "value" : 1000}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 16}, {"name" : "journeyman", "max" : 8}, {"name" : "foreman", "max" : 4}],
		"products"	: [] //TODO
	},
	{
		"name"		: "Tannery",
		"category"	: "shop",
		"time"		: 300,
		"costs"		: [	{"name" : "gold", "value" : 100},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 100}, 
						{"name" : "brick", "value" : 300}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 2}, {"name" : "journeyman", "max" : 1}, {"name" : "foreman", "max" : 1}],
		"products"	: [{"name" : "leather", "value" : 100, "costs": [{"name" : "cow", "value" : 10}]}]
	},
	{
		"name"		: "Saddlery",
		"category"	: "shop",
		"time"		: 600,
		"costs"		: [	{"name" : "gold", "value" : 500},
						{"name" : "truss", "value" : 1}, 
						{"name" : "tile", "value" : 200}, 
						{"name" : "brick", "value" : 500}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 8}, {"name" : "journeyman", "max" : 4}, {"name" : "foreman", "max" : 2}],
		"products"	: [{"name" : "harness", "value" : 10, "costs": [{"name" : "leather", "value" : 100}]}]
	},
	{
		"name"		: "CobblersShop",
		"category"	: "shop",
		"time"		: 900,
		"costs"		: [	{"name" : "gold", "value" : 1000},
						{"name" : "truss", "value" : 2}, 
						{"name" : "tile", "value" : 400}, 
						{"name" : "brick", "value" : 1000}, 
						{"name" : "gate", "value" : 1}],
		"jobs"		: [{"name" : "apprentice", "max" : 16}, {"name" : "journeyman", "max" : 8}, {"name" : "foreman", "max" : 4}],
		"products"	: [{"name" : "shoe", "value" : 10, "costs": [{"name" : "", "value" : 100}]}]
	},
	{
		"name"		: "Church",
		"category"	: "church",
		"time"		: 15000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"		: "Cathedral",
		"category"	: "church",
		"time"		: 30000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"		: "Duomo",
		"category"	: "church",
		"time"		: 45000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"		: "Monastery",
		"category"	: "church",
		"time"		: 15000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"		: "CommunityHall",
		"category"	: "town",
		"time"		: 3000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	},
	{
		"name"		: "TownHall",
		"category"	: "town",
		"time"		: 10000,
		"costs"		: [{"name"  : "gold", "value" : 100}]
	}
];

var length = BUILDINGS.length
for (var i = 0; i < length; i++) {
	var building = BUILDINGS[i];
	if (building.category == "home") {
		var tmp = {};
		for (var key in building) {
			tmp[key] = building[key];
		}
		tmp.name = tmp.name.replace("Player", "PC");
		BUILDINGS.push(tmp);
	}
	if (building.category == "shop") {
		building.wages = [10, 20, 100]; //TODO
	}
}

var CATEGORIES = ["home", "shop", "church", "town"];

var JOBS = ["apprentice", "journeyman", "foreman"];

var RESOURCES = ["gold", "wood", "crop", "flour", "bread", "cake", "cart", "furniture", "truss", "beer", "cow", "leather", "meat", "harness", "shoe", "stone", "tile", "brick", "sculpture", "iron", "gate", "tool", "weapon", "sheep", "freshmeat", "wool", "silk", "dyedwool", "dyedsilk", "fabrik", "cloth", "clothes", "herbs", "medicine"]; //TODO expensive clothes?

//TODO
var NO_SHOP = ["wood", "crop", "stone", "iron", "herbs", "silk"];
var SHOP1 = ["flour", "cart", "beer", "cow", "tile", "sheep", "wool", "silk", "freshmeat", "leather"];
var SHOP2 = ["bread", "furniture", "truss", "meat", "harness", "shoe", "brick", "gate", "tool", "weapon", "dyedwool", "dyedsilk", "fabrik"];
var SHOP3 = ["cake", "sculpture", "cloth", "clothes", "medicine"];

var MARKET = [];
for (var i = 0; i < RESOURCES.length; i++) {
	var res = RESOURCES[i];
	if (res.name !== "gold") {
		var p = {};
		p.name = res;
		var tmp = isIn(res, NO_SHOP) ? 1 : (isIn(res,SHOP1) ? 2 : (isIn(res, SHOP2) ? 3 : (isIn(res, SHOP3) ? 4 : 5)));
		p.time = tmp * 10;
		p.costs = [{"name" : "gold", "value" : tmp}];
		MARKET.push(p);
	}
}

function isIn(find, array) {
	for (var i = 0; i < array.length; i++) {
		if (find == array[i]) return true;
	}
	return false;
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
		var res = new Resource(RESOURCES[j]);
		res.value = 500 + Math.floor(Math.random() * 500); //TODO
		if (res.name == "gold") {res.value = 10000;}
		START_RESOURCES[i].push(res);
	}
}

var START_FAMILIES = [];
var START_PERSONS = [];
for (var i = 0; i < NO_FAMILIES; i++) {
	var family = new Family(START_RESOURCES[i], 0, START_CITY);
	family.name = selectRandomlyFrom(FAMILY_NAMES);
	family.power = 1;
	START_FAMILIES[i] = family;
	var noPersons = Math.floor(Math.random() * 5) + 1;
	for (var j = 0; j < noPersons; j++) {
		var startAge = Math.floor(Math.random() * YEAR * 15) + 15 * YEAR;
		var person = createPerson(START_FAMILIES[i], startAge);
		START_PERSONS.push(person);
	}
}

function createPerson(family, startAge) {
	var person = new Person(family);
	person.age = startAge;
	person.maxAge = Math.floor(Math.random() * YEAR * 30) + 50 * YEAR;
	person.id = uid();
	person.gender = Math.random() >= 0.5 ? "male" : "female";
	person.name = person.gender == "male" ? selectRandomlyFrom(MALE_NAMES) : selectRandomlyFrom(FEMALE_NAMES);
	return person;
}

var START_BUILDINGS = [];
for (var i = 0; i < NO_FAMILIES; i++) {
	var name = i == 0 ? "HomePlayer01" : "HomePC01";
	var home = getNewBuilding(name);
	home.owner = START_FAMILIES[i];
	START_FAMILIES[i].buildings.push(home);
	for (var j = 0; j < START_FAMILIES[i].members.length; j++) {
		home.addResident(START_FAMILIES[i].members[j]);
	}
	var row = 5 + i;
	var col = 4 + i % 3;
	var building = {};
	building["building"] = home;
	building["i"] = row;
	building["j"] = col;
	START_BUILDINGS.push(building);
}

function selectRandomlyFrom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getNewBuilding(name) {
		var build;
		for (var i = 0; i < BUILDINGS.length; i++) {
			if ( BUILDINGS[i].name == name) {
				build = BUILDINGS[i];
				break;
			}
		}
		switch (build.category) {
			case "home"		: return new Home(build);
			case "shop"		: return new Shop(build);
			case "church"	: return new Church(build);
			case "town"		: return new Town(build);
		}
	}