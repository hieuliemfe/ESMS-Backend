import RootRoutes from './RootRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import EmailRoutes from './EmailRoutes';
import SessionRoutes from './SessionRoutes';
import CustomerRoutes from './CustomerRoutes';
import SessionServiceRoutes from './SessionServiceRoutes';
import RoleRoutes from './RoleRoutes';
import CounterRoutes from './CounterRoutes';
import WaitingListRoutes from './WaitingListRoutes'
import CategoryRoutes from './CategoryRoutes';
import EmployeeShiftRoutes from './EmployeeShiftRoutes';
// import ManagerRoutes from './ManagerRoutes';
import VideoRoutes from './VideoRoutes';
import ShiftRoutes from './ShiftRoutes';
import ConfigRoutes from './ConfigRoutes';
import ServiceRoutes from './ServiceRoutes';
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
    path: '/session-services',
    handler: SessionServiceRoutes,
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
    path: '/waiting-list',
    handler: WaitingListRoutes
  },
  {
    path: '/categories',
    handler: CategoryRoutes
  },
  {
    path: '/employee-shifts',
    handler: EmployeeShiftRoutes
  },
  {
    path: '/shifts',
    handler: ShiftRoutes
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
    path: '/services',
    handler: ServiceRoutes
  },
  {
    path: '/reports',
    handler: ReportRoutes
  },
];

export default Router;
