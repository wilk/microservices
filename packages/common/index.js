const caller = require("grpc-caller")
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

// Load protobuf
const schema = grpc.loadPackageDefinition(
  protoLoader.loadSync("./schema.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const clientFactory = host => caller(host, "./schema.proto")

module.exports = {
  clientFactory,
  schema
}
