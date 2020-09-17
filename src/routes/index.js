const Router = [
  {
    path: '/',
    handler: require('./RootRoutes'),
  },        
  {
    path: '/users',
    handler: require('./UserRoutes'),
  },
  {
    path: '/faces',
    handler: require('./FaceRoutes'),
  },
  {
    path: '/emails',
    handler: require('./EmailRoutes'),
  },
];

export default Router;