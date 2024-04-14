import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from '@apollo/client'
import {createClient} from 'graphql-ws'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'

import './index.css'

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new GraphQLWsLink(
  createClient(
    {
      url: "ws://localhost:4000/subscriptions"
    }
  )
)

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return(
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App onLayoutChange={console.log("hi")} />
    </ApolloProvider>
  </React.StrictMode>,
)
