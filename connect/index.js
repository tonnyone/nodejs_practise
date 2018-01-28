var connect = require('connect');
console.log('111111111111111')
var app = connect();

function middleWare1(req,res,next){
  res.writeHeader(200);
  res.write('1')
  next()
  res.end('success');
}

function middleWare2(req,res,next){
  res.write('2')
}

function middleWare3(req,res,next){
  res.write('3')
}

app.use(middleWare1)
app.use(middleWare2)
app.use(middleWare3)
app.listen(3000);