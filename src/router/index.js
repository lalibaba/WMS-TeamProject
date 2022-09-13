import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '工作台', icon: 'a_gonzuotai' }
    }]
  },

  {
    path: '/baseInfo',
    component: Layout,
    redirect: '/baseInfo/warehouse',
    name: 'baseinfo',
    meta: { title: '基础信息管理', icon: 'b_beseInfo' },
    children: [
      {
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/baseInfo/warehouse/index'),
        meta: { title: '仓库管理' }
      },
      {
        path: 'area',
        name: 'area',
        component: () => import('@/views/baseInfo/area/index'),
        meta: { title: '库区管理' }
      },
      {
        path: 'location',
        name: 'location',
        component: () => import('@/views/baseInfo/location/index'),
        meta: { title: '库位管理' }
      },
      {
        path: 'locationView',
        name: 'locationView',
        component: () => import('@/views/baseInfo/locationView/index'),
        meta: { title: '库位视图' }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/baseInfo/goods/index'),
        meta: { title: '货品管理' }
      },
      {
        hidden: true,
        path: 'goods/details/:id',
        name: 'editGood',
        component: () => import('@/views/baseInfo/goods/editGood.vue'),
        meta: { title: '编辑货品' }
      },
      {
        hidden: true,
        path: 'goods/detail',
        name: 'addGood',
        component: () => import('@/views/baseInfo/goods/addGood.vue'),
        meta: { title: '新增货品' }
      },
      {
        path: 'goodsType',
        name: 'goodsType',
        component: () => import('@/views/baseInfo/goodsType/index'),
        meta: { title: '货品类型管理' }
      }
    ]
  },

  {
    path: '/business',
    name: 'business',
    component: Layout,
    meta: { title: '商务管理', icon: 'c_shanwuguanli' },
    children: [
      {
        path: 'goodsOwner',
        name: 'goodsOwner',
        component: () => import('@/views/business/goodsOwner/index'),
        meta: { title: '货主管理' }
        // children: [
        //   {
        //   }
        // ]
      },
      {
        path: 'taskPicking',
        name: 'taskPicking',
        component: () => import('@/views/business/taskPicking/index'),
        meta: { title: '承运商管理' }
      },
      {
        hidden: true,
        path: 'goodsOwner/details',
        name: 'goodsOwnerdetails',
        component: () => import('@/views/business/newdetails/index.vue'),
        meta: { title: '新增货主' }
      },
      {
        hidden: true,
        path: 'goodsOwner/details/:id',
        name: 'Ownerdetails',
        component: () => import('@/views/business/ownerdetails/index.vue'),
        meta: { title: '货主详情' }
      },
      {
        hidden: true,
        path: 'goodsOwner/detail/:id',
        name: 'editdetail',
        component: () => import('@/views/business/editdetails/index.vue'),
        meta: { title: '编辑货主' }
      }
    ]
  },

  {
    path: '/storage',
    component: Layout,
    redirect: '/storage/list',
    name: 'storage',
    meta: {
      title: '库内管理',
      icon: 'd_kuneiguanli'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/storage/list/index'),
        name: 'list',
        meta: { title: '盘点单' }
      },
      {
        path: 'listTask',
        component: () => import('@/views/storage/listTask/index'),
        name: 'listTask',
        meta: { title: '盘点任务' }
      },
      {
        path: 'storageLoseProfit',
        component: () => import('@/views/storage/storageLoseProfit/index'),
        name: 'storageLoseProfit',
        meta: { title: '库存损益' }
      },
      {
        path: 'latestStorage',
        component: () => import('@/views/storage/latestStorage/index'),
        name: 'latestStorage',
        meta: { title: '实时库存' }
      }
    ]
  },
  {
    path: '/storageIn',
    component: Layout,
    redirect: '/storageIn/storageInList',
    name: 'storageIn',
    meta: {
      title: '入库管理',
      icon: 'e_ruku'
    },
    children: [
      {
        path: 'storageInList',
        component: () => import('@/views/storageIn/storageInList/index'),
        name: 'storageInList',
        meta: { title: '入库单' }
      },
      {
        path: 'taskReceive',
        component: () => import('@/views/storageIn/taskReceive/index'),
        name: 'taskReceive',
        meta: { title: '收货任务' }
      },
      {
        path: 'taskAdd',
        component: () => import('@/views/storageIn/taskAdd/index'),
        name: 'taskAdd',
        meta: { title: '上架任务' }
      }

    ]
  },
  {
    path: '/storageOut',
    component: Layout,
    redirect: '/storageOut/listOut',
    name: 'storageOut',
    meta: {
      title: '出库管理',
      icon: 'f_chuku'
    },
    children: [
      {
        path: 'listOut',
        component: () => import('@/views/storageOut/listOut/index'),
        name: 'listOut',
        meta: { title: '出库单' }
      },
      {
        path: 'taskPick',
        component: () => import('@/views/storageOut/taskPicking/index'),
        name: 'taskPick',
        meta: { title: '拣货任务' }
      },
      {
        path: 'manageTaskTransfer',
        component: () => import('@/views/storageOut/manageTaskTransfer/index'),
        name: 'manageTaskTransfer',
        meta: { title: '交接任务' }
      }

    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
