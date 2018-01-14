var net = require("net");
stdin = process.stdin;
stdout = process.stdout;

var HOST = "127.0.0.1";
var PORT = 9999;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  console.log('CONNECTED TO SERVER: ' + HOST + ':' + PORT);
  stdout.write('>> ')
  stdin.resume(); // 等待输入
  stdin.setEncoding("utf-8");
  stdin.on("data", function(input){
    if ("quit" == input.trim()) {
      client.destroy();
      stdin.destroy();
    } else {
      client.write(input);
    }
  });
});

client.on("data", function(data) {
  console.log("server: " + data);
  stdout.write('>> ')
});

client.on("close", function() {
  console.log("Connection closed");
});
