var fs = require("fs");
fs.readFile('D:/Pro_Src/VMware-workstation-full-12.5.2-4638234.exe',function(err,data){
  if (err) throw err;
  console.log(data.byteLength);
})