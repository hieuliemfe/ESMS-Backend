const Router = [
  {
    path: '/',
    handler: require('./RootRoutes'),
  },
  {
    path: '/users',
    handler: require('./UserRoutes'),
  },
];

export default Router;