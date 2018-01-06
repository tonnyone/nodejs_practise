var fs = require('fs');
var stream = fs.createReadStream(__dirname+"/index.js");
stream.on('data',function(chunk){
  console.log('')
  process.stdout.write(chunk);
})
stream.on('end',function(chunk){
  console.log('read end ##################################');
})