var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

var app = connect();
//create node.js http server and listen on port
app.use(serveStatic(__dirname,{'index': ['index.html', 'index.htm']}));
http.createServer(app).listen(3000);