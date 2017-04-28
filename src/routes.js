export default [
    {
        path: '/login',
        component: require('./views/auth/login.vue')
    },
    {
        path: '/register',
        component: require('./views/auth/register.vue')
    },
    {
        path: '/dashboard',
        component: require('./views/dashboard.vue')
    },
    {
        path: '/carriage/detail/:id',
        component: require('./views/carriageDetail.vue')
    },
    {
        path: '/carriage/add',
        component: require('./views/carriageAdd.vue')
    },
	// {
	// 	path: '/about/',
	// 	component: require('./assets/vue/pages/about.vue')
	// },
	// {
	// 	path: '/form/',
	// 	component: require('./assets/vue/pages/form.vue')
	// },
	// {
	// 	path: '/dynamic-route/blog/:blogId/post/:postId/',
	// 	component: require('./assets/vue/pages/dynamic-route.vue')
	// }
]
