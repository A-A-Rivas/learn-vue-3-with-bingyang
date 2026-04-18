import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from "@/apis/auth";

// no need to import the components here, they are lazy-loaded

// create a router instance 
const router = createRouter({

    // provides history implementation to use
    history: createWebHistory(),

    scrollBehavior(to, from, savedPosition) {

        const scrollBehaviorOptions = {
            top: 0,
            behavior: 'smooth'
        }

        // if the route has a meta field with a scrollToElement property, scroll to that element
        if (to.meta.scrollToElement) {
            scrollBehaviorOptions.el = to.meta.scrollToElement
        }

        // if the route has a savedPosition, return it, otherwise return the scrollBehaviorOptions 
        return savedPosition ?? scrollBehaviorOptions
    },

    // defines some routes, each route record should map to a component
    routes: [
        {path:'/',
         name:'mainLayout',
         component: () => import('@/views/MainLayout.vue'),
         redirect: {name: 'home'},
         children: [
            {path: '/home',
             name: 'home',
             component: () => import('@/views/Home.vue'),
             meta: {requiresAuth: false}
            },
            {path: '/blogPosts',
            name: 'blogPosts',
            component: () => import('@/views/BlogPosts.vue'),
            meta: {
                enterAnimation: 'animate__animated animate__bounceIn',
                leaveAnimation: 'animate__animated animate__bounceOut'
            },
            redirect: {name: 'blogPostsGreeting'},
            children:[
                {path: '',
                 name: 'blogPostsGreeting',
                 component: () => import('@/views/BlogPostGreeting.vue'),
                 meta: {requiresAuth: false}
                },
                {path:'/blogPosts/:id(\\d+)', name:'blogPost', components: {
                    default: () => import('@/views/BlogPost.vue'),
                    sidebar: () => import('@/views/Ads.vue')
                },
                meta: {requiresAuth: true, scrollToElement:'.blog-posts-layout'}}
            ]},
            {path: '/about',
             name: 'about',
             component: () => import('@/views/About.vue'),
             meta: {requiresAuth: false}
            },
        ]},
        {path:'/login',
         name:'login',
         component: () => import('@/views/Login.vue'),
         meta: {requiresAuth: false}
        },
        {path: '/:pathMatch(.*)*',  // matches any path that has not been matched by a previous route
         name: 'notFound',
         component: () => import('@/views/NotFound.vue'),
         meta: {requiresAuth: false}}
    ]
})


router.beforeEach((to, from) => {
    console.log(from.name, '->', to.name)
    if (to.meta.requiresAuth && !isAuthenticated.value) {

        // redirects to the login page with the originally requested page as the redirect query parameter
        return {name: 'login', query: {redirect: to.fullPath}}
    }
})


// global after each navigation guard (for cleanup or login)
router.afterEach((to, from)=> {
    console.log(`Successfully navigated to: ${to.fullPath}`)
})

// exports the router instance
export default router