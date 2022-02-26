import { FC } from 'react';
import { generatePath } from 'react-router-dom';
import { Page404 } from '../pages/Page404';
import { PostListPage } from '../pages/PostListPage';
import { PostEditPage } from '../pages/PostEditPage';

interface RouteItem {
  name: Routes;
  path: string;
  component: FC;
}

export type Routes = 'PostListPage' | 'PostEditPage' | 'Page404';

export const routeList: RouteItem[] = [
  {
    name: 'PostListPage',
    path: '/post-list',
    component: PostListPage,
  },

  {
    name: 'PostEditPage',
    path: '/post-edit-page/:id',
    component: PostEditPage,
  },

  {
    name: 'Page404',
    path: '*',
    component: Page404,
  },
];

export const getRoutePath = (
  routeName: Routes,
  id: string | null = null,
): string => {
  const index = routeList.findIndex(
    (routeItems) => routeItems.name === routeName,
  );

  const path = routeList[index].path;

  if (!id) {
    return path;
  }

  return generatePath(path, { id });
};