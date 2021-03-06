import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Welcome from '../components/Welcome.vue';
import Users from '../components/users/Users.vue';
import AddUsers from '../components/users/AddUsers.vue';

Vue.use(VueRouter);
const routes = [
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                component: Welcome,
            },
            {
                path: '/users',
                component: Users,
            },
            {
                path: '/addusers',
                component: AddUsers,
            },
        ],
    },
];

const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes
});
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        return next();
    }
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
        return next('/login');
    }
    next();
});
export default router;
