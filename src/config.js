const config = {
  app: 'sip',
  router: {
    '/': {},
    '/login': { target: '/login', sidebar: false, navbar: false },
    '/menu': {},
    '/user': {},
    '/user-template': {},
  },
};
export default config;
