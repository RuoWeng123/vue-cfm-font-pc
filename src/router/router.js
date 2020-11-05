import Layout from '@/views/layout'

export const appRouter = [
  {
    path: '/',
    component: Layout,
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/login_error',
    name: 'login_error',
    component: () => import('@/views/loginError')
  },
  {
    path: '/customer',
    name: 'customer',
    component: Layout,
    redirect: '/customer/myCustomer',
    label: '客户跟进',
    children: [
      {
        path: '/customer/myCustomer',
        name: 'customer_myCustomer',
        component: () => import('@/views/customer/myCustomer'),
        label: '我的客户'
      },
      {
        path: '/customer/overview',
        name: 'csutomer_overview',
        component: () => import('@/views/customer/overview'),
        label: '客户分析'
      }
    ]
  },
  {
    path: '/company',
    name: 'company',
    component: Layout,
    redirect: '/company/list',
    label: '企微群管',
    children: [
      {
        path: '/company/list',
        name: 'company_list',
        component: () => import('@/views/company/list'),
        label: '群客户列表'
      },{
        path: '/company/analyse',
        name: 'company_analyse',
        component: () => import('@/views/company/analyse'),
        label: '群客户分析'
      }
    ]
  },
  {
    path: '/sale',
    name: 'sake',
    component: Layout,
    redirect: '/sale/performance',
    label: '企微群管',
    children: [
      {
        path: '/sale/performance',
        name: 'sale_performance',
        component: () => import('@/views/sale/performance'),
        label: '绩效管理'
      },{
        path: '/sale/performance',
        name: 'sale_performanceStatistic',
        component: () => import('@/views/sale/performanceStatistic'),
        label: '绩效统计'
      },{
        path: '/sale/chatStatistic',
        name: 'sale_chatStatistic',
        component: () => import('@/views/sale/chatStatistic'),
        label: '聊天统计'
      }
    ]
  },
  {
    path: '/wechatUtils',
    name: 'wechatUtils',
    component: Layout,
    redirect: '/wechatUtils/writeNote',
    label: '企微工具',
    children: [

      {
        path: '/wechatUtils/writeNote',
        name: 'wechatUtils_writeNote',
        component: () => import('@/views/wechatUtils/writeNote'),
        label: '写跟进记录'
      },
      {
        path: '/wechatUtils/quickReply',
        name: 'wechatUtils_quickReply',
        component: () => import('@/views/wechatUtils/quickReply'),
        label: '快速回复'
      },{
        path: '/wechatUtils/qrCode',
        name: 'wechatUtils_qrCode',
        component: () => import('@/views/wechatUtils/qrCode'),
        label: '渠道二维码'
      },{
        path: '/wechatUtils/groupCode',
        name: 'wechatUtils_groupCode',
        component: () => import('@/views/wechatUtils/groupCode'),
        label: '加群活码'
      },{
        path: '/wechatUtils/deleteWarning',
        name: 'wechatUtils_deleteWarning',
        component: () => import('@/views/wechatUtils/deleteWarning'),
        label: '删人提醒'
      },{
        path: '/wechatUtils/looseCustomer',
        name: 'wechatUtils_looseCustomer',
        component: () => import('@/views/wechatUtils/looseCustomer'),
        label: '消失客户'
      },{
        path: '/wechatUtils/momentsCtrl',
        name: 'wechatUtils_momentsCtrl',
        component: () => import('@/views/wechatUtils/momentsCtrl'),
        label: '朋友圈管理'
      },{
        path: '/wechatUtils/chatRecord',
        name: 'wechatUtils_chatRecord',
        component: () => import('@/views/wechatUtils/chatRecord'),
        label: '聊天存档案'
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: Layout,
    redirect: '/setting/memberCtrl',
    label: '设置',
    children: [
      {
        path: '/setting/memberCtrl',
        name: 'setting_memberCtrl',
        component: () => import('@/views/setting/memberCtrl'),
        label: '成员管理'
      }
    ]
  },
  {
    path: '/weChat/customerDetail',
    name: 'weChat_customerDetail',
    component: () => import('@/views/weChat/customerDetail'),
    label: '客户详情'
  },
  {
    path: '/weChat/quickShare',
    name: 'weChat_quickShare',
    component: () => import('@/views/weChat/quickShare'),
    label: '快捷回复'
  }
]

export const routers = appRouter
