import type { RouteRecordRaw } from 'vue-router';

// import { BasicLayout } from '#/layouts';
// import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    name: 'Hulua-store',
    path: '/hulua-store',
    component: () => import('#/views/huluaStore/index.vue')
  },
];

export default routes;
