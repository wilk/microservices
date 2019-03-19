;(async () => {
  const caller = require("grpc-caller")
  const PROTO_PATH = "../common/schema.proto"
  const Product = caller("products-service:80", PROTO_PATH, "Product")
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

  const makeOrder = async (call, callback) => {
    console.log("Order::makeOrder")

    const products = await Product.getProductList()
    console.log(products)

    callback(null, { ordered: true })
  }

  // Define server with the methods and start it
  server.addService(proto.prototype.Order.service, { makeOrder })

  server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure())

  server.start()
})()
