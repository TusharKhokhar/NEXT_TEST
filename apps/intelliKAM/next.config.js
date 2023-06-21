const withTM = require('next-transpile-modules')([
  'ui',
  'auth',
  'fetcher',
  'lib',
  'db'
])

module.exports = withTM({
  reactStrictMode: true,
})
