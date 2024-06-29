import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import React from 'react';
import App from './App';
import './index.css'
// import {WebSocketLink} from "@apollo/client/link/ws"
import {split,HttpLink, InMemoryCache} from "@apollo/client"
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient } from '@apollo/client';
// import { InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { BrowserRouter } from 'react-router-dom';

const httpLink = new HttpLink({
  uri: 'https://s46-guruvedhanth-capstone-techbuddy.onrender.com/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://s46-guruvedhanth-capstone-techbuddy.onrender.com/subscriptions',
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client=new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache()
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RecoilRoot> 
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  </ApolloProvider>
  
)
