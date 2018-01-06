var fs = require('fs');
    stdin = process.stdin;
    stdout = process.stdout;

fs.readdir(process.cwd(), function(err,files){
  console.log('currentDictionary: ',process.cwd());
  console.log('')
  var stat = [];
  if(!files.length){
    return console.log('   \033[31m No files to show! \033[39m \n')
  }
  console.log(' Select which file or dictionary you want to see \n')

  function file(i){
    var filename = files[i];
    fs.stat(__dirname + "/" + filename, function(error, state){
      stat[i]= state;
      if (state.isDirectory){
        console.log('           '+ i +' \033[36m' + filename + '/\033[39m');
      }else{
        console.log('           '+ i +' \033[36m' + filename + '/\033[39m');
      }
      i++;
      if(i == files.length){
        read();
      }else{
        file(i);
      }
    })
  }

  function read(){
    console.log('')
    stdout.write('     \033[36m' + 'Enter your choice: ' +'\033[39m');
    stdin.resume(); // 输入等待
    stdin.setEncoding('utf-8')
    stdin.on('data',option)
  }

  function option(i){
    var oneFile = files[Number(i)];
    if(!oneFile){
      stdout.write('    \033[36m' + 'Enter your choice: ' +'\033[39m');
    }else{
      if(stat[Number(i)].isDirectory()){
        console.log('bbb',oneFile)
        fs.readdir(__dirname +'/'+oneFile,function(err,files){
          console.log('');
          console.log('   ( '+ files.length + ' files '+')')
          files.forEach(function(file){
            console.log('                  - '+file);
          });
          // stdin.resume()
        })
      }else{
        fs.readFile(files[Number(i)], 'utf-8', function(err,data){
          console.log('');
          stdout.write('       \033[90m' + data.replace(/(.*)/g,'     $1') + '\033[39m' );
          // stdout.write('       \033[90m' + data + '\033[39m' );
        })
      }
      stdin.resume()
    }
  }
  file(0)
})
