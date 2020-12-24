import * as pages from '../../pages';
import * as paths from './paths';

export const routes = [
  {
    path: paths.HOME,
    component: pages.Home
  },
  {
    path: paths.DASHBOARD,
    component: pages.Dashboard
  },
  {
    path: paths.RESULT,
    component: pages.Result
  },
  {
    path: paths.PAGE_NOT_FOUND,
    component: pages.PageNotFound
  }
];