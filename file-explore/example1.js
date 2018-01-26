
console.log(process.argv.slice(2))
console.log(__dirname)
console.log(process.cwd())
process.chdir('../')
console.log(__dirname)
console.log(process.cwd())