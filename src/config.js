const config = {
  app: 'sip',
  router: {
    '/': {},
    '/login': { target: '/login', sidebar: false, navbar: false },
    '/menu': {},
    '/user': {},
    '/base/user-template': {},
  },
};
export default config;
