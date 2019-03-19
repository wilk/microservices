const caller = require("grpc-caller")
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const path = require("path")

console.log(path.resolve(__filename, "./schema.proto"))

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

const clientFactory = host =>
  caller(host, path.resolve(__filename, "./schema.proto"))

module.exports = {
  clientFactory,
  schema
}
