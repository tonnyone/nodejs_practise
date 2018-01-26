
var a = require('./module_a');

exports.name='我是b模块';
exports.changeA = function(){
  a.name = 'b 模块改变了a模块';
}