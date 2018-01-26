var start = Date.now();
setTimeout(function(){
  console.log(Date.now()-start);
  for(var i=0;i<100000;i++){ 
    console.log(); 
  }
},1000)

setTimeout(function(){
  console.log(Date.now() - start);
},2000)