/**
 //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 redirect: 'noRedirect'

 //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 //若你想不管路由下面的 children 声明的个数都显示你的根路由
 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 alwaysShow: true

 name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 meta: {
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  cache: true //如果设置为true，则会被 <keep-alive> 缓存(默认 true)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
 */
export const routes = [
    {
        path: '/',
        component: () => import('@/views/layout'),
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard'),
                name: 'Dashboard',
                meta: {title: '主页', icon: 'dashboard', affix: true}
            },
            {
                path: 'profile',
                component: () => import('@/views/profile'),
                name: 'Profile',
                hidden: true,
                meta: {title: '个人中心', icon: 'user', noCache: true}
            }
        ]
    },
    {
        id: 10,
        path: '/sys',
        redirect: 'noRedirect',
        component: () => import('@/views/layout'),
        meta: {icon: 'component', title: '配置管理'},
        alwaysShow: true,
        children: [
            {
                id: 11,
                path: 'role',
                component: () => import('@/views/sys/role'),
                name: 'RoleMng',
                meta: {title: '角色管理', icon: 'user', cache: true}
            }
        ]
    },
    {
        id: 90,
        path: '/tool',
        redirect: 'noRedirect',
        component: () => import('@/views/layout'),
        meta: {icon: 'guide', title: '工具箱'},
        alwaysShow: true,
        children: [
            {
                id: 91,
                path: 'icon',
                component: () => import('@/views/icons'),
                name: 'Icons',
                meta: {title: '图标', icon: 'icon', cache: false}
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404', hidden: true}
]

export default routes