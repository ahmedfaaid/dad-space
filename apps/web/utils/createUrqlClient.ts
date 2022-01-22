import { createClient } from 'urql';

export const createUrqlClient = createClient({
  url: 'http://localhost:5500/v1',
  fetchOptions: {
    credentials: 'include',
  }
})
