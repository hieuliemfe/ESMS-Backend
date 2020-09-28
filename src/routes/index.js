import RootRoutes from './RootRoutes';
import UserRoutes from './UserRoutes';
import FaceRoutes from './FaceRoutes';
import EmailRoutes from './EmailRoutes';

const Router = [
  {
    path: '/',
    handler: RootRoutes,
  },        
  {
    path: '/users',
    handler: UserRoutes,
  },
  {
    path: '/faces',
    handler: FaceRoutes,
  },
  {
    path: '/emails',
    handler: EmailRoutes,
  },
];

export default Router;