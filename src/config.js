const config = {
  app: 'sip',
  router: {
    '/': {},
    '/login': { sidebar: false, navbar: false },
    '/sapi/run': { sidebar: false, navbar: true },
    '/sapi/preview': { sidebar: false, navbar: true },
    '/sapi/version': { sidebar: false, navbar: true },
    '/sapi/history': { sidebar: false, navbar: true },
    '/sapi/interface': { sidebar: false, navbar: true },
    '/sapi/setting': { sidebar: false, navbar: true },
    '/sapi/members': { sidebar: false, navbar: true },
  },
  redirectPath: {},
  customPath: {
    '/sapi': '/sapi/run',
    '/sapi/project/:projectId/interface/:interfaceId/run': '/sapi/run',
    '/sapi/project/:projectId/interface/:interfaceId/preview': '/sapi/preview',
    '/sapi/project/:projectId/interface/:interfaceId/version': '/sapi/version',
    '/sapi/project/:projectId/interface/:interfaceId/history': '/sapi/history',
    '/sapi/project/:projectId/interface': '/sapi/interface',
    '/sapi/project/:projectId/interface/category/:categoryId': '/sapi/interface',
    '/sapi/project/:projectId/setting': '/sapi/setting',
    '/sapi/project/:projectId/members': '/sapi/members',
  },
};
module.exports = config;
