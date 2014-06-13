#README
---
This is a javascript project for parsing format strings!

Check it! you can do this!

	var formatter = new Formatter();
	formatter.format("Hello, {world}!", {"world": "MARS!"});
	// -> "Hello, world!!"
	
Aint that the neatest!

What about this stuff!

	var blap = {
		"format": function(fmtString){
			return "IDK what to do with this but whatever.";
		};
	};
	console.log(formatter.format("Hello, {blap}", {"blap": blap}));
