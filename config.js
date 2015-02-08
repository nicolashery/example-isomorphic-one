module.exports = {
  API_HOST: process.env.API_HOST || 'http://localhost:3000/api',
  DISABLE_ISOMORPHISM: Boolean(process.env.DISABLE_ISOMORPHISM) || false
};
