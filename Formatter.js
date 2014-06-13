function Tokenizer(source, tokens){
    this.source = source;
    this.tokens = tokens || Tokenizer.defaultTokens;
};
Tokenizer.prototype.nextToken = function(){
    if(!this.source) return false;
    for(var tokenName in this.tokens){
        if(!this.tokens.hasOwnProperty(tokenName)) continue;
        var regexp = new RegExp("^"+this.tokens[tokenName], "g");
        var result = regexp.exec(this.source);
        if(result){
            this.source = this.source.substr(result[0].length);
            return [tokenName, result[0]];
        }
    }
    var ret = this.source[0];
    this.source = this.source.substr(1);
    return ret;
    
};
Tokenizer.prototype.getContent = function(token){
    if(typeof token == "string"){
        return token;
    }
    return token[1];
};
Tokenizer.defaultTokens = {
    "IDENTIFIER": "[a-zA-Z_][a-zA-Z0-9_]*",
    "NUMBER": "[0-9]+",
    "CONVERSION": "!."
};
function Formatter(){
};
Formatter.prototype.parse = function(format_str){
    var leading = "";
    var token;
    var tokenizer = new Tokenizer(format_str);
    var yields = [];
    while (token = tokenizer.nextToken()) {
        if (token != "{") {
            leading += tokenizer.getContent(token);
            continue;
        }
        token = tokenizer.nextToken();
        if (token[0] != "IDENTIFIER") {
            throw new Error("Expected a identifier, found: "+JSON.stringify(token));
        }
        var identifier=token[1], conversion, formatStr;
        while (token = tokenizer.nextToken()) {
            if(tokenizer.getContent(token) == "[") {
                identifier+="[";
                while (token = tokenizer.nextToken()) {
                    if(token == "]") break;
                    identifier+=tokenizer.getContent(token);
                }
                identifier+="]";
                continue;
            }else
            if (token == ".") {
                identifier+=".";
                token = tokenizer.nextToken();
                if (token[0] != "IDENTIFIER") {
                    throw new Error("Expected identifier, found: "+JSON.stringify(token));
                }
                identifier+=tokenizer.getContent(token);
                continue;
            }
            break;
        }
        if(token[0] == "CONVERSION"){
            conversion = tokenizer.getContent(token);
            token = tokenizer.nextToken();
        }
        if(token == ":"){
            formatStr = "";
            while(token = tokenizer.nextToken()){
                if (token == "}") break;
                formatStr += tokenizer.getContent(token);
            }
        }
        if (token != "}") {
            throw new Errot("ERROR: Expected '}', found: "+tokenizer.getContent(token));
        }
        yields.push([leading, identifier, formatStr, conversion]);
        leading = "";       
    }
    if (leading)
            yields.push([leading, null, null, null]);
    return yields;
};
module.exports = Formatter;
