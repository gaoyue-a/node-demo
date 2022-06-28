const http = require("http")
const hostname = "192.168.166.178"
const port = 8080
http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" }),
        response.end("Happy Ending")
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
