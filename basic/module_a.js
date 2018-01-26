exports.name = '我是A模块'
exports.changeByThis = function(){
  this.name = 'A模块自己被自己的方法改变了this';
}
exports.changeByExport = function(){
  exports.name = 'A模块自己被自己的方法改变了exports';
}