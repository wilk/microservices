const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const server = new grpc.Server()
const SERVER_ADDRESS = "0.0.0.0:80"

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("../common/schema.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const getProductList = async (call, callback) => {
  console.log("Product::getProductList")

  setTimeout(() => {
    callback(null, {
      products: [{ id: 10, name: "product a" }, { id: 20, name: "product b" }]
    })
  }, 500)
}

// Define server with the methods and start it
server.addService(proto.prototype.Product.service, { getProductList })

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure())

server.start()
