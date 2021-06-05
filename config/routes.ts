export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: '@/pages/user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/create-invoice',
    name: 'create-invoice',
    icon: 'smile',
    component: '@/pages/CreateInvoice/MainForm',

    // routes: [
    //   {
    //     path: '/create-invoicecreate',
    //     name: 'create',
    //     icon: 'smile',
    //     component: './CreateInvoice/CreateInvoice',
    //   },
    // ],
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'setting',
    routes: [
      {
        path: '/settings/add-options',
        name: 'add-options',
        icon: 'smile',
        component: '@/pages/FormSettings/FormSettings',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './extras/Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './extras/Welcome',
  //     },
  //   ],
  // },

  {
    path: '/',
    redirect: '/create-invoice',
  },
  {
    component: './404',
  },
];
