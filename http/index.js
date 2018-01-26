require('http').createServer(function(req,res){
  // res.writeHead(200,{'Content-Type':'text/plain'})
  res.writeHead(200,{'Content-Type':'text/html'})
  res.write('1')
  setTimeout(function(){
    res.end('2')
  })
  res.write('3')
}).listen(9999)
