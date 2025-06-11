const AdminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: { name: 'admin.users' }
      },
      {
        path: '/users', 
        name: 'admin.users',
        component: () => import('@/views/admin/ManageUsers.vue')
      },
      {
        path: '/conferences', 
        name: 'admin.conferences',
        component: () => import('@/views/admin/ManageConferences.vue')
      }
    ]
  }
]

export default AdminRoutes