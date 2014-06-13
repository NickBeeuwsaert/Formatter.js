[![Build Status](https://travis-ci.org/NickBeeuwsaert/Formatter.js.svg?branch=master)](https://travis-ci.org/NickBeeuwsaert/Formatter.js)
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
			return "reversed format string" + fmtString.split('').reverse().join('');
		};
	};
	console.log(formatter.format("Hello, {blap:%Y %m %d}", {"blap": blap}));
