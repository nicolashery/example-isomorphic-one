module.exports = {
  index: {
    path: '/',
    method: 'get',
    page: 'contacts'
  },
  contacts: {
    path: '/contacts',
    method: 'get',
    page: 'contacts'
  },
  contact: {
    path: '/contact/:id',
    method: 'get',
    page: 'contact'
  }
};