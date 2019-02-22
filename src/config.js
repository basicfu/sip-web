const config = {
  app: 'sip',
  router: {
    '/': {},
    '/login': { target: '/login', sidebar: false, navbar: false },
    '/menu': {},
    '/aapi/aapi': { target: '/aapi/aapi',sidebar: false, navbar: true},
    '/base/user-template': {},
  },

};
export default config;
