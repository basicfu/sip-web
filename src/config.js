const config = {
  app: 'sip',
  router: {
    '/': {},
    '/login': { target: '/login', sidebar: false, navbar: false },
    '/menu': {},
    '/sapi': { target: '/sapi', sidebar: false, navbar: true },
    '/base/user-template': {},
  },

};
export default config;
