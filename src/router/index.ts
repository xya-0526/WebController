import {
    TokenSrivce,
    userService
} from '@/uilts'
import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () =>
                import(
                    '@/view/login/index.vue'
                ),
            meta: {
                requiresAuth: false
            }
        },
        {
            name: 'home',
            path: '/home',
            component: () =>
                import(
                    '@view/home/index.vue'
                ),
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    name: 'homePage',
                    path: 'homePage',
                    component: () =>
                        import(
                            '@view/homepage/index.vue'
                        )
                },
                {
                    name: 'artical',
                    path: 'artical',
                    component: () =>
                        import(
                            '@view/articalPage/index.vue'
                        ),
                    children: [
                        {
                            name: 'articalPage_2',
                            path: 'articalPage_2',
                            component:
                                () =>
                                    import(
                                        '@view/articalPage/view/articalpage_2/index.vue'
                                    )
                        },
                        {
                            name: 'articalPage_1',
                            path: 'articalPage_1/:id?',
                            component:
                                () =>
                                    import(
                                        '@view/articalPage/view/articalPage_1/index.vue'
                                    )
                        }
                    ]
                },
                {
                    path: 'product',
                    name: 'product',
                    component: () =>
                        import(
                            '@view/productPgae/index.vue'
                        ),
                    children: [
                        {
                            path: 'productPage_1/:id?',
                            name: 'productPage_1',
                            component:
                                () =>
                                    import(
                                        '@view/productPgae/view/productPage_1/index.vue'
                                    )
                        },
                        {
                            path: 'productPage_2',
                            name: 'productPage_2',
                            component:
                                () =>
                                    import(
                                        '@view/productPgae/view/productPage_2/index.vue'
                                    )
                        }
                    ]
                },
                {
                    path: 'settingPage',
                    name: 'settingPage',
                    component: () =>
                        import(
                            '@view/SetingPage/index.vue'
                        )
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*', // 404路由
            redirect: '/login'
        }
    ]
})
router.beforeEach(
    async (to, from, next) => {
        const tokenService =
            new TokenSrivce()
        const token =
            tokenService.GetToken()
        // 需要鉴权的路由
        if (to.meta.requiresAuth) {
            if (!token) {
                return next('/login')
            }
            try {
                const isValid =
                    await tokenService.VerifyToken(
                        token
                    )
                if (!isValid) {
                    return next(
                        '/login'
                    )
                }
            } catch (error) {
                new TokenSrivce().ClearToken()
                new userService().ClearUserInof()
                console.log('token无效')
                return next('/login')
            }
        }
        // 已登录用户访问登录页 → 重定向
        if (
            token &&
            to.path === '/login'
        ) {
            return next(
                '/home/homePage'
            )
        }
        // 默认放行
        next()
    }
)
