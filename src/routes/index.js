import RootRoutes from './RootRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import FaceRoutes from './FaceRoutes';
import EmailRoutes from './EmailRoutes';
import SessionRoutes from './SessionRoutes';
import CustomerRoutes from './CustomerRoutes';
import TaskRoutes from './TaskRoutes';
import RoleRoutes from './RoleRoutes';
import CounterRoutes from './CounterRoutes';
import QueueRoutes from './QueueRoutes'
import TaskTypeRoutes from './TaskTypeRoutes';
import CategoryRoutes from './CategoryRoutes';
import ShiftRoutes from './ShiftRoutes';

const Router = [
  {
    path: '/',
    handler: RootRoutes,
  },
  {
    path: '/employees',
    handler: EmployeeRoutes,
  },
  {
    path: '/customers',
    handler: CustomerRoutes
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
  {
    path: '/tasks',
    handler: TaskRoutes,
  },
  {
    path: '/roles',
    handler: RoleRoutes,
  },
  {
    path: '/counters',
    handler: CounterRoutes
  },
  {
    path: '/queues',
    handler: QueueRoutes
  },
  {
    path: '/task-type',
    handler: TaskTypeRoutes
  },
  {
    path: '/categories',
    handler: CategoryRoutes
  },
  {
    path: '/shifts',
    handler: ShiftRoutes
  },
];

export default Router;
