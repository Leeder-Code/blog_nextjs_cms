import { GraphQLClient } from 'graphql-request'

if(!process.env.REACT_APP_GQL_ENDPOINT){
  throw new Error("Env variable REACT_APP_GQL_ENDPOINT does not exist")
}

const endpoint = process.env.REACT_APP_GQL_ENDPOINT

export default new GraphQLClient(endpoint)
