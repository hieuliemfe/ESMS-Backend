import RootRoutes from './RootRoutes';
import UserRoutes from './UserRoutes';
import FaceRoutes from './FaceRoutes';
import EmailRoutes from './EmailRoutes';
import SessionRoutes from './SessionRoutes';
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
  {
    path: '/sessions',
    handler: SessionRoutes,
  },
];

export default Router;