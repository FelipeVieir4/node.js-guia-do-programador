var http = require ('http');

http.createServer(function(req, res){
    res.end("Olá")

}).listen(7777);

console.log ("running!!!");