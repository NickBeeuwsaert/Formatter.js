[![Build Status](https://travis-ci.org/NickBeeuwsaert/Formatter.js.svg?branch=master)](https://travis-ci.org/NickBeeuwsaert/Formatter.js)
#README
This is a javascript project for parsing format strings!


##Format String Grammar
Format strings follow grammar similar to how pythons `string.format` works, with a few modifications (mostly no auto incrementing positional arguments (like {}))

    replacement_field ::=  "{" field_name ["!" conversion] [":" format_spec] "}"
    field_name        ::=  arg_name ("." identifier | "[" element_index "]")*
    arg_name          ::=  identifier | integer
    identifier        ::=  [a-zA-Z_][a-zA-Z0-9_]*
    integer           ::=  [0-9]+
    element_index     ::=  integer | index_string
    index_string      ::=  <any character that is not "]">+
    conversion        ::=  [a-zA-Z0-9]
    format_spec       ::=  <Any character that isn't "}">*
    
##Example usage
Example node.js session using Formatter
	
	> var Formatter = require("./Formatter");
	> var strftime = require("strftime");
	> //Set up a format method on the Date object
	> Date.prototype.format = function(fmtString){return strftime(fmtString, this); };
	> //Create a formatter object
	> var formatter = new Formatter();
	> formatter.format("Hello, the current year is {currentDay:%Y %m %d}! Have a nice day!", {"currentDay": new Date()});
	'Hello, the current year is 2014 06 13! Have a nice day!'
	> formatter.format("Hello, {0} {1}!", ["Nick", "Beeuwsaert"]);
	'Hello, Nick Beeuwsaert!'
	> formatter.format("Hello, {0} {1}! todays date is {2.currentDay:%B %o, %Y} and the current time is {2.currentDay:%H:%M:%S}!", ["Nick", "Beeuwsaert", {currentDay: new Date()}]);
	'Hello, Nick Beeuwsaert! todays date is June 13th, 2014 and the current time is 15:34:52!'
    