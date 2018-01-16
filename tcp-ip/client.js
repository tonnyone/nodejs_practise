var net = require("net");
stdin = process.stdin;
stdout = process.stdout;

var HOST = "127.0.0.1";
var PORT = 9999;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
  console.log('CONNECTED TO SERVER: ' + HOST + ':' + PORT);
  console.log('input "b:message" to boardcast a message')
  console.log('input "c:nickname:message" to send a message to a user')
  console.log('input "n:nickname to modify" or set a nickname to yourself')
  console.log('input "l" to list all online users')
  stdin.resume(); // 等待输入
  stdin.setEncoding("utf-8");
  stdin.on("data", function(input){
    if ("quit" == input.trim().toLowerCase()) {
      client.destroy();
      stdin.destroy();
      return;
    }     
    if('help'===input.trim().toLowerCase()){
      console.log('input "b:message" to boardcast a message')
      console.log('input "c:nickname:message" to send a message to a user')
      console.log('input "n:nickname to modify" or set a nickname to yourself')
      console.log('input "l" to list all online users')
      stdout.write('>> ')
    }else{
      var s = convertM(input);
      if(s.length<=2){
        console.warn('input error');
        stdout.write('>> ')
        return;
      }
      client.write(Buffer.from(s,'utf8'));
      stdout.write('>> ')
    }    
  });
});

client.on("data", function(data) {
  console.log("");
  console.log("server response: " + data);
  stdout.write('>> ')
});

function convertM(message){
  message = message.trim();
  var result = {};
  if(message.trim().length>0){
    switch(message[0].trim().toLowerCase()){
      case 'b': // 广播数据
        result = JSON.stringify({
          type: 'boardcast',
          message: message.slice(2)
        })
        break;
      case 'c': //发送给某个在线用户
        var arr = message.split(':',2);
        var mTemp = message.slice(arr[0].length + arr[1].length + 2);
        result = JSON.stringify({
          type: 'client',
          user: arr[1],
          message: mTemp
        })
        break;
      case 'n': // 设置昵称
        result = JSON.stringify({
          type: 'nickname',
          message: message.slice(2)
        })
        break;
      case 'l': // 设置昵称
        result = JSON.stringify({
          type: 'listall',
          message:'' 
        })
        break;
      default: 
        result={};
        break;
    }
  }
  return result;
}

client.on("close", function() {
  console.log("Connection closed");
});

client.on("error", function(e) {
  console.log("Connection error");
});

process.on('uncaughtException',function(e){
  console.log('exception',e);
})