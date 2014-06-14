var assert = require("assert");
var Formatter = require("../Formatter");
describe("Formatter", function(){
    describe("#parse", function(){
        it("should correctly parse plain formatters", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {world}"), 
                [
                    ["Hello, ", "world", undefined, undefined]
                ]
            );
            assert.deepEqual(formatter.parse("Hello, {world123}"), 
                [
                    ["Hello, ", "world123", undefined, undefined]
                ]
            );
        });
        it("should correctly parse {world!r}", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {world!r}"), 
                [
                    ["Hello, ", "world", undefined, "!r"]
                ]
            );
        });
        it("should correctly parse conversions", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {world!r:%Y %m %d}"), 
                [
                    ["Hello, ", "world", "%Y %m %d", "!r"]
                ]
            );
        });
        it("should correctly parse format strings", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {world:%Y %m %d}"), 
                [
                    ["Hello, ", "world", "%Y %m %d", undefined]
                ]
            );
        });
        it("should correctly parse array paths", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {world.some.deep.array}"), 
                [
                    ["Hello, ", "world.some.deep.array", undefined, undefined]
                ]
            );
            assert.deepEqual(formatter.parse("Hello, {world[some].deep.array}"), 
                [
                    ["Hello, ", "world[some].deep.array", undefined, undefined]
                ]
            );
            assert.deepEqual(formatter.parse("Hello, {world[some].deep.array}"), 
                [
                    ["Hello, ", "world[some].deep.array", undefined, undefined]
                ]
            );
            assert.deepEqual(formatter.parse("Hello, {world[0].deep.array}"), 
                [
                    ["Hello, ", "world[0].deep.array", undefined, undefined]
                ]
            );
            assert.deepEqual(formatter.parse("Hello, {world[some].0.array}"), 
                [
                    ["Hello, ", "world[some].0.array", undefined, undefined]
                ]
            );
        });
        it("Should be able to handle identifiers or integers as the first element", function(){
            var formatter = new Formatter();
            assert.deepEqual(formatter.parse("Hello, {0}!", ["world"]),
                [
                    ["Hello, ", "0", undefined, undefined],
                    ["!", undefined, undefined, undefined]
                ]
            );
        });
    });
    describe("#format", function(){
        var formatter = new Formatter();
        it("should handle simple formatting!", function(){
            assert.equal(formatter.format("Hello, {what}!", {"what": "World!"}), "Hello, World!!");
        });
        it("should handle simple deep paths!", function(){
                assert.equal(formatter.format("Hello, {what.in.the.what}!",
                                {
                                "what": {
                                "in":{
                                "the":{
                                "what":"World"
                                }
                                }
                                }
                                }
                         ), "Hello, World!");
        });
        it("should handle simple deep paths!", function(){
                assert.equal(formatter.format("Hello, {what[in].the.what}!",
                                {
                                "what": {
                                "in":{
                                "the":{
                                "what":"World"
                                }
                                }
                                }
                                }
                         ), "Hello, World!");
        });
        it("should handle format methods!", function(){
                        var hasFormat = {
                        "format": function(fmtString){
                        return fmtString.split('').reverse().join('');
                        }
                        };
                        assert.equal(formatter.format("Hello, {test:%Y %m %d}!", {"test": hasFormat}
                                        ), "Hello, d% m% Y%!");
        });
        it("should handle paths with array indices", function(){
                        assert.equal(formatter.format("Hello, {test.0}!", {"test": ["world", "mars"]}
                                        ), "Hello, world!");
                        assert.equal(formatter.format("Hello, {test[0]}!", {"test": ["world", "mars"]}
                                        ), "Hello, world!");
        });
        it("should handle conversion strings", function(){
                        assert.equal(formatter.format("This string needs escaped quotes: {0!r}", ["What's up? \"Hello\""])
                                        , "This string needs escaped quotes: \"What's up? \\\"Hello\\\"\"");
        });
    });
});
