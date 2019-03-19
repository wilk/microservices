;(async () => {
  const caller = require("grpc-caller")
  const PROTO_PATH = "common/schema.proto"
  const Auth = caller("auth-service:80", PROTO_PATH, "Auth")
  const Order = caller("orders-service:80", PROTO_PATH, "Order")
  const Product = caller("products-service:80", PROTO_PATH, "Product")
  const { ApolloServer, gql } = require("apollo-server")

  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server.
  const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.
    type Product {
      id: Int
      name: String
    }

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
      products: [Product]
    }
  `

  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.
  const resolvers = {
    Query: {
      products: async () => {
        let products = []

        try {
          console.log("API::products authenticating", "http://auth-service")
          const res = await Auth.authenticate({
            username: "username",
            password: "password"
          })
          if (!res.authenticated) return []

          console.log("API::products fetching products")

          const res2 = await Product.getProductList()
          console.log("API::products result", res2.products)
          products = res2.products
        } catch (err) {
          console.error(err)
        }

        return products
      }
    }
  }

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers })

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  const srv = await server.listen({ port: 80 })
  console.log(`🚀  Server ready at ${srv.url}`)
  /*console.log("API::authenticating")
  const res = await Auth.authenticate({
    username: "username",
    password: "password"
  })
  console.log(res)
  console.log("API::ordering")
  const res2 = await Order.makeOrder({
    username: "username",
    password: "password"
  })
  console.log(res2)*/
})()
