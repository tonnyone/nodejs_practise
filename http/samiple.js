require('http').createServer(function(req,res){
  // res.writeHead(200,{'Content-Type':'text/plain'})
  res.writeHead(200,{'Content-Type':'text/html','Transfer-Encoding':'unchunked'})
  res.write('<h1>Helloworld</h1>')
}).listen(9999)
