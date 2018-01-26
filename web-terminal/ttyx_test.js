var ttyx = require('ttyx');

var app = ttyx.createServer({
  shell: 'bash',
  users: {
    foo: 'bar'
  },
  port: 8000
});

app.get('/foo', function(req, res, next) {
  res.send('bar');
});

app.listen();