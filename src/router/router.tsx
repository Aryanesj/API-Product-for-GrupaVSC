import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getRoutePath, routeList } from './routeList';
import { RedirectExecutor } from './RedirectExecutor';

export const Router: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={'/'}
          element={<Navigate to={getRoutePath('PostListPage')} />}
        />
        {routeList.map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.component />}
          />
        ))}
      </Routes>
      <RedirectExecutor />
    </>
  );
};