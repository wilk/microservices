const caller = require("grpc-caller")
const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const path = require("path")

// Load protobuf
const schema = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.resolve(__dirname, "./schema.proto"), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const clientFactory = (host, sub) =>
  caller(host, path.resolve(__dirname, "./schema.proto"), sub)

module.exports = {
  clientFactory,
  schema
}
