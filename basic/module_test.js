var a  = require('./module_a')
var b  = require('./module_b')

console.log('aname:',a.name)
console.log('bname:',b.name)
console.log('this',this)

a.changeByThis()
console.log('aname:',a.name)
a.changeByExport()
console.log('aname:',a.name)
b.changeA()
console.log('aname:',a.name)