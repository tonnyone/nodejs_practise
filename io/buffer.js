
// 不指定,默认用0填充
const buf = Buffer.alloc(5);
// 输出: <Buffer 00 00 00 00 00>
console.log(buf);

//初始化一个Buffer 用某个字符填充
const buf1 = Buffer.alloc(5, 'a');
// 输出: <Buffer 61 61 61 61 61>
console.log(buf1);

//初始化一个Buffer 用另一个Buffer填充,默认只取填充buffer的第一个字节
const buf3 = Buffer.alloc(5, Buffer.alloc(1,255));
// 输出 <Buffer ff ff ff ff ff>
console.log(buf3);
// 输入 5 
console.log(buf3.length);
// 输入 5 
console.log(Buffer.byteLength(buf3));

// 'Hello World' base64 后的字符串表示,第二个参数是编码后的字符串，
const buf2 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
// 输出: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(buf2);


// 从一个Buffer 拷贝一个Buffer
const bufFrom1 = Buffer.from('buffer');
const bufFrom2 = Buffer.from(bufFrom1);
bufFrom1[0] = 0x61; //'a'
// 输出: auffer
console.log(bufFrom1.toString());
// 输出: buffer
console.log(bufFrom2.toString());

const bufFrom3= Buffer.from('this is a tést');
// 输出: this is a test
console.log(bufFrom3.toString());
// 输出: this is a tC)st
console.log(bufFrom3.toString('ascii'));

const bufFrom4= Buffer.from('aGVsbG8gd29ybGQ=', 'base64');
// 输出: Hello world 
console.log(bufFrom4.toString());


const str = 'Node.js';
const bufUnsafe = Buffer.allocUnsafe(str.length);
// 输出: 不确定
console.log(bufUnsafe.toString('ascii'));
for (let i = 0; i < str.length; i++) {
  bufUnsafe[i] = str.charCodeAt(i);
}
// 输出: Node.js
console.log(bufUnsafe.toString('ascii'));


/* 输出: ½ + ¼ = ¾: 9 个字符, 12 个字节 */
const bufOther3 = '\u00bd + \u00bc = \u00be';
console.log(Buffer.byteLength(bufOther3));//11
console.log(Buffer.byteLength(bufOther3,'utf-8'));//11

const bufC1= Buffer.alloc(10,'a');
const bufC2 = Buffer.alloc(14,255);
const bufC3 = Buffer.alloc(18);
const totalLength = bufC1.length + bufC2.length + bufC3.length;
// 输出: 42
console.log(totalLength);
const bufTo = Buffer.concat([bufC1, bufC2, bufC3]);
const bufTo1 = Buffer.concat([bufC1, bufC2, bufC3], totalLength);
const bufTo2 = Buffer.concat([bufC1, bufC2, bufC3],41);
console.log(bufTo);
console.log(bufTo1);//42
console.log(bufTo2);//42
//<Buffer 61 61 61 61 61 61 61 61 61 61 ff ff ff ff ff ff ff ff ff ff ff ff ff ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
//<Buffer 61 61 61 61 61 61 61 61 61 61 ff ff ff ff ff ff ff ff ff ff ff ff ff ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
//<Buffer 61 61 61 61 61 61 61 61 61 61 ff ff ff ff ff ff ff ff ff ff ff ff ff ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>

const bufCopy = Buffer.allocUnsafe(26);
const bufCopy2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0; i < 26; i++) {
  // 97 是 'a' 的十进制 ASCII 值
  bufCopy[i] = i + 97;
}

//拷贝目标，目标开始位，源buffer的开始位，源buffer的结束位
bufCopy.copy(bufCopy2, 8, 16, 20);

// abcdefghijklmnopqrstuvwxy
console.log(bufCopy.toString('ascii', 0, 25));
// 输出: !!!!!!!!qrst!!!!!!!!!!!!!
console.log(bufCopy2.toString('ascii', 0, 25));
