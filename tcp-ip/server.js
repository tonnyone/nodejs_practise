var net = require('net');
var fs = require('fs');

var HOST = '127.0.0.1';
var PORT = 9999;
var count = 0;

net.createServer(function (conn) {

  conn.write('\033[92m Hey Welcome to liushaoqing\'s chat Room, There is '+count +' users in the room \033[39m');
  conn.write('\b >> ')
  count++;

  conn.on('data', function (data) {
    console.log('DATA: ' + conn.remotePort + ': ' + data);
    conn.write('got it: ' + data);
    // conn.end()
  });

  conn.on('close', function (data) {
    count--;
    console.log('USER QUIT: ' + conn.remotePort);
  });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
console.log("\033[92m liushaoqing's chat room start \033[39m");