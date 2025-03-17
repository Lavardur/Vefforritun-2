import { Hono } from 'hono';

export const collectRoutes = (router: Hono) => {
  const routes: { method: string; path: string }[] = [];

  router.routes.forEach((route) => {
    routes.push({
      method: route.method,
      path: route.path,
    });
  });

  return routes;
};