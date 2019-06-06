import Layout from '@/views/layout/index'

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        meta: {title: 'Login'},
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: '主页', icon: 'dashboard', affix: true}
            },
            {
                path: 'profile',
                component: () => import('@/views/profile/index'),
                name: 'Profile',
                hidden: true,
                meta: {title: '个人中心', icon: 'user', noCache: true}
            }
        ]
    },
    {
        path: '/tool',
        redirect: 'noRedirect',
        component: Layout,
        meta: {icon: 'guide', title: '工具箱'},
        alwaysShow: true,
        children: [
            {
                path: 'icon',
                component: () => import('@/views/icons'),
                name: 'Icons',
                meta: {id: 91, title: '图标', icon: 'icon', cache: false}
            }
        ]
    },

]
export default routes