const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const server = new grpc.Server()
const SERVER_ADDRESS = "0.0.0.0:80"

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("common/schema.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const authenticate = (call, callback) => {
  console.log("Auth::authenticate")
  setTimeout(() => {
    callback(null, { authenticated: true })
  }, 500)
}

// Define server with the methods and start it
server.addService(proto.prototype.Auth.service, { authenticate })

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure())

server.start()
