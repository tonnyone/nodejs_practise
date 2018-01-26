var fs = require("fs");
path = require("path");
stdin = process.stdin;
stdout = process.stdout;

readDir(process.cwd());
function readDir(dirPath) {
  fs.readdir(dirPath, function(err, files) {
    console.log("\033[32mcurrent: \033[34m " + dirPath + " \033[39m");
    var stats = [];
    if (!files.length) {
      return console.log("   \033[31m No files to show! \033[39m \n");
    }
    console.log(
      "\033[36m" +
        "Select which file or dictionary you want to see: \n" +
        " \033[39m \n"
    );
    file(0);
    function file(i) {
      var filename = files[i];
      fs.stat(path.join(dirPath, filename), function(error, stat) {
        stats[i] = stat;
        if (stat.isDirectory()) {
          console.log("           " + i + " \033[32m" + filename + "/\033[39m");
        } else {
          console.log("           " + i + " \033[36m" + filename + "/\033[39m");
        }
        i++;
        if (i == files.length) {
          read();
        } else {
          file(i);
        }
      });
    }

    function read() {
      console.log("");
      console.log(
        "\033[36m" +
          'Enter your choice (number), or back to up file path:(example: "../") , or quit input ("quit").' +
        "\033[39m"
      );
      stdout.write("\033[36m" + "your choice is >> " + "\033[39m");
      stdin.resume(); // 输入等待
      stdin.setEncoding("utf-8");
      stdin.removeAllListeners("data"); //移除所有的监听输入的事件再注册,不然会有两次事件
      stdin.on("data", enterCallback);
    }

    function enterCallback(i) {
      if ("quit" == i.trim()) {
        console.log("\033[31m" + "Bye bye! " + "\033[39m");
        stdin.end();
      } else {
        if (isNaN(Number(i.trim()))) {
          fs.access(
            path.normalize(path.resolve(dirPath, i.trim())),
            fs.constants.R_OK,
            err => {
              if (err) {
                console.log("");
                console.log(
                  "\033[31m" +
                    "you can not access this path : " +
                    path.resolve(dirPath, i.trim()) +
                    "\033[39m"
                );
                readDir(path.resolve(dirPath));
              } else {
                readDir(path.resolve(dirPath, i.trim()));
              }
            }
          );
        }
        var oneFile = files[Number(i.trim())];
        if (!oneFile) {
          stdout.write("    \033[36m" + "Enter your choice: " + "\033[39m");
        } else {
          if (stats[Number(i.trim())].isDirectory()) {
            readDir(path.join(dirPath, oneFile));
          } else {
            fs.readFile(
              path.resolve(dirPath, files[Number(i)]),
              "utf-8",
              function(err, data) {
                if (err) {
                  console.log("", err);
                  return;
                }
                console.log("\033[32m" + "file content is:" + "\033[39m");
                console.log("");
                console.log("\033[42m" + data + "\033[40m");
                console.log("");
                readDir(dirPath);
              }
            );
          }
        }
      }
    }
  });
}
