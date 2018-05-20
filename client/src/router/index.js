import services from '@/views/services/index'
import serviceDetail from '@/views/services/detail'
import profile from '@/views/profile'
import profileEdit from '@/views/profile/edit'
import nodes from '@/views/nodes'
import nodeDetail from '@/views/nodes/detail'
import nodeEdit from '@/views/nodes/edit'
import users from '@/views/users'
import userAdd from '@/views/users/add'
import userDetail from '@/views/users/detail'
import userEdit from '@/views/users/edit'
import trafficStat from '@/views/traffic/stat'

const NotFound = {
  template: '<p>Page Not Found</p>'
}

let title = ' - 科学上网'

export default {
  routes: [
    {
      path: '/',
      redirect: { name: 'services' }
    },
    {
      path: '/services',
      name: 'services',
      component: services,
      meta: { title: '服务' + title }
    },
    {
      path: '/services/:serviceId',
      name: 'service-detail',
      component: serviceDetail,
      meta: { title: '服务详情' + title }
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      meta: { title: '我' + title }
    },
    {
      path: '/profile/edit',
      name: 'profile-edit',
      component: profileEdit,
      meta: { title: '修改资料' + title }
    },
    {
      path: '/nodes',
      name: 'nodes',
      component: nodes,
      meta: { title: '节点' + title }
    },
    {
      path: '/nodes/add',
      name: 'node-add',
      component: nodeEdit,
      meta: { title: '添加节点' + title }
    },
    {
      path: '/nodes/:nodeId/detail',
      name: 'node-detail',
      component: nodeDetail,
      meta: { title: '节点详情' + title }
    },
    {
      path: '/nodes/:nodeId/edit',
      name: 'node-edit',
      component: nodeEdit,
      meta: { title: '编辑节点' + title }
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { title: '用户' + title }
    },
    {
      path: '/users/add',
      name: 'user-add',
      component: userAdd,
      meta: { title: '添加用户' + title }
    },
    {
      path: '/users/:userId',
      name: 'user-detail',
      component: userDetail,
      meta: { title: '用户详情' + title }
    },
    {
      path: '/users/:userId/edit',
      name: 'user-edit',
      component: userEdit,
      meta: { title: '编辑用户' + title }
    },
    {
      path: '/traffic/stat',
      name: 'traffic-stat',
      component: trafficStat,
      meta: { title: '流量详情' + title }
    },
    {
      path: '*',
      component: NotFound,
      meta: { title: '页面未找到' }
    }
  ]
}
