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
        });
    });
});
