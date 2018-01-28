import { stat } from "fs";

export default function(req,res,out){

  var stack = []; //存放回调 
  var index = 0;// 记录调用次数
  function use(middleWare){
     stack.push(middleWare); 
  }

  function listen(){
    var server = http.createServer(this);
    return server.listen.apply(server, arguments); 
  }

  function next(){
    var currentMiddle = stack[index++];
    if(currentMiddle){
      currentMiddle();
    }
  }


  return {
    use: use,
    listen: listen,
  }
}