const AdminRoutes = [
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminPanel.vue'),
    meta: { requiresAuth: true, isAdmin: true },
    children: [
      {
        path: '',
        redirect: { name: 'admin.users' }
      },
      {
        path: '/users', 
        name: 'admin.users',
        component: () => import('@/views/admin/partials/ManageUsers.vue')
      },
      {
        path: '/conferences', 
        name: 'admin.conferences',
        component: () => import('@/views/admin/partials/ManageConferences.vue')
      }
    ]
  }
]

export default AdminRoutes