var net = require('net');
var fs = require('fs');

var HOST = '127.0.0.1';
var PORT = 9999; 
var count = 0;
var users = {};

net.createServer(function (conn) {

  count++
  conn.write('\033[92m Hey Welcome to liushaoqing\'s chat Room, There is '+count +' users in the room \033[39m');
  conn.write('\033[92m please input you nickname first \033[39m \n');
  conn.write('\033[92m input help to get more information \033[39m \n');
  var userkey = conn.remoteAddress+':'+conn.remotePort;
  if(!users[userkey]){
    users[userkey] = {name: '匿名',conn:conn};
  }
  for (const userKey in users ) {
    if (users.hasOwnProperty(userKey)){
      const user = users[userKey];
      conn.write('\033[92m '+ user.name +': '+user.conn.remoteAddress+':'+user.conn.remotePort+'\033[39m \n');
    }
  } 

  conn.on('data', function (data) {
    console.log('DATA FROME:' + conn.remotePort + ': '+ data.toString('utf8'));
    dataHaldler(JSON.parse(data.toString('utf8')),conn);
    // conn.write('got it: ' + data);
  });

  conn.on('close', function (data) {
    count--;
    var userkey = conn.remoteAddress+':'+conn.remotePort;
    delete users[userkey]
    console.log('clinet close: ' + conn.remotePort);
  });

  conn.on('error', function (error) {
    console.log('connection error');
  });

  function dataHaldler(message,conn){
    switch(message.type){
      case 'client':
        sendToClient(message.user,message.message,conn);
        break;
      case 'boardcast':
        boardcast(message.message,conn);
        break;
      case 'nickname': 
        nickname(message.user,message.message,conn);
        break;
      case 'listall': 
        listall(conn);
        break;
      default:
        conn.write('protocal is no correct');  
    }
  }

  /**定点给某个用户消息 */
  function sendToClient(nickname,message,conn){
    var userkey = conn.remoteAddress+':'+conn.remotePort;
    if(nickname=='匿名'){
      conn.write('no this user or user is offline');
      return;
    }
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        const user= users[key];
        if(user.name==nickname){
          user.conn.write('from '+users[userkey].name+' :'+message)
        }
      }
    }
  }

  /**广播消息 */
  function boardcast(message){
    var userkey = conn.remoteAddress+':'+conn.remotePort;
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        const user= users[key];
        if(key!=userkey){
          user.conn.write('from '+users[userkey].name+' boardcast :'+message)
        }
      }
    }
  }

  /**修改Nickname*/
  function nickname(nickname,message,conn){
    var userkey = conn.remoteAddress+':'+conn.remotePort;
    var count = 0;
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        const user= users[key];
        // 如果nickname 重复判断
        if(key!=userkey && users[userkey].name==message){
          count++;
          conn.write('error please input a new nick name,this name has been used');
          break;
        }
      }
    }
    if(count==0){
      users[userkey].name=message;
      conn.write('your nickname is '+message+' now');
    } 
  }

  /**列出所有在线用户*/
  function listall(conn){
    var userkey = conn.remoteAddress+':'+conn.remotePort;
    var resString = 'There is '+count+' users online:\n'
    for (const key in users) {
      if (users.hasOwnProperty(key)) {
        const user= users[key];
        resString += '\033[92m '+ user.name +': '+user.conn.remoteAddress+':'+user.conn.remotePort+'\033[39m \n';
      }
    }
    conn.write(resString)
  }
}).listen(PORT, HOST);
 
console.log('Server listening on ' + HOST + ':' + PORT);
console.log("\033[92m liushaoqing's chat room start \033[39m");

process.on('uncaughtException',function(e){
  console.log('exception',e);
})