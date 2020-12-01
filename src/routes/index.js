import RootRoutes from './RootRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import EmailRoutes from './EmailRoutes';
import SessionRoutes from './SessionRoutes';
import CustomerRoutes from './CustomerRoutes';
import SessionTaskRoutes from './SessionTaskRoutes';
import RoleRoutes from './RoleRoutes';
import CounterRoutes from './CounterRoutes';
import QueueRoutes from './QueueRoutes'
import CategoryRoutes from './CategoryRoutes';
import ShiftRoutes from './ShiftRoutes';
// import ManagerRoutes from './ManagerRoutes';
import VideoRoutes from './VideoRoutes';
import ShiftTypeRoutes from './ShiftTypeRoutes';
import ConfigRoutes from './ConfigRoutes';
import TaskRoutes from './TaskRoutes';
import ReportRoutes from './ReportRoutes';

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
    path: '/emails',
    handler: EmailRoutes,
  },
  {
    path: '/sessions',
    handler: SessionRoutes,
  },
  {
    path: '/session-tasks',
    handler: SessionTaskRoutes,
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
    path: '/categories',
    handler: CategoryRoutes
  },
  {
    path: '/shifts',
    handler: ShiftRoutes
  },
  {
    path: '/shifttypes',
    handler: ShiftTypeRoutes
  },
  // {
  //   path: '/managers',
  //   handler: ManagerRoutes
  // },
  {
    path: '/videos',
    handler: VideoRoutes
  },
  {
    path: '/configs',
    handler: ConfigRoutes
  },
  {
    path: '/tasks',
    handler: TaskRoutes
  },
  {
    path: '/reports',
    handler: ReportRoutes
  },
];

export default Router;
