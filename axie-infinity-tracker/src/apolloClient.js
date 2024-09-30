// src/apolloClient.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({

  uri: 'https://api.studio.thegraph.com/query/89420/axie-infinity-players/version/latest',
  cache: new InMemoryCache(),
});

// Reset the cache
client.cache.reset();

export default client;
