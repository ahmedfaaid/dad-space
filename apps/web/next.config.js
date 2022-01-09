const withTM = require('next-transpile-modules')(['ui', 'dad-gql']);

module.exports = withTM({
  reactStrictMode: true
});
