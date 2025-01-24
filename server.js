const http = require('http');
const server = http.createServer((req,res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type','application/json');
	res.end('{"Welcome"}');
})
server.listen('8080','127.0.0.1',(e)=>{
	console.log(e);
})

