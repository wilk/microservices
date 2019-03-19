;(async () => {
  const { schema, clientFactory } = require("wilk-common")
  const Product = clientFactory("products-service:80", "Product")
  const grpc = require("grpc")
  const server = new grpc.Server()
  const SERVER_ADDRESS = "0.0.0.0:80"

  const makeOrder = async (call, callback) => {
    console.log("Order::makeOrder")

    const products = await Product.getProductList()
    console.log(products)

    callback(null, { ordered: true })
  }

  // Define server with the methods and start it
  server.addService(schema.prototype.Order.service, { makeOrder })

  server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure())

  server.start()
})()
