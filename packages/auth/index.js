const { schema } = require("wilk-common")
const grpc = require("grpc")
const server = new grpc.Server()
const SERVER_ADDRESS = "0.0.0.0:80"

const authenticate = (call, callback) => {
  console.log("Auth::authenticate")
  setTimeout(() => {
    callback(null, { authenticated: true })
  }, 500)
}

// Define server with the methods and start it
server.addService(schema.prototype.Auth.service, { authenticate })

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure())
server.start()
