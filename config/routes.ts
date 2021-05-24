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
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/create-invoice-pro',
    name: 'create-invoice',
    icon: 'smile',
    routes: [
      {
        path: '/create-invoice-pro/create',
        name: 'create',
        icon: 'smile',
        component: './InvoiceForm/InvoiceForm',
      },
      {
        path: '/create-invoice-pro/settings',
        name: 'settings',
        icon: 'setting',
        component: './InvoiceForm/FormSettings',
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
    redirect: '/create-invoice-pro/create',
  },
  {
    component: './404',
  },
];
