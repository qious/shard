import services from '@/views/services/index'
import servicesDetail from '@/views/services/detail'
import profile from '@/views/profile'
import profileEdit from '@/views/profile/edit'
import nodes from '@/views/nodes'
import nodesDetail from '@/views/nodes/detail'
import nodesEdit from '@/views/nodes/edit'
import users from '@/views/users'
import usersDetail from '@/views/users/detail'
import usersEdit from '@/views/users/edit'
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
      component: servicesDetail,
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
      component: nodesEdit,
      meta: { title: '添加节点' + title }
    },
    {
      path: '/nodes/:nodeId/detail',
      name: 'node-detail',
      component: nodesDetail,
      meta: { title: '节点详情' + title }
    },
    {
      path: '/nodes/:nodeId/edit',
      name: 'node-edit',
      component: nodesEdit,
      meta: { title: '编辑节点' + title }
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: { title: '用户' + title }
    },
    {
      path: '/users/:userId',
      name: 'user-detail',
      component: usersDetail,
      meta: { title: '用户详情' + title }
    },
    {
      path: '/users/:userId/edit',
      name: 'user-edit',
      component: usersEdit,
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
