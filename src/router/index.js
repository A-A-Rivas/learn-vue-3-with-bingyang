import About from "@/views/About.vue";
import BlogPosts from "@/views/BlogPosts.vue";
import Home from "@/views/Home.vue";
import BlogPost from "@/views/BlogPost.vue";
import { createRouter, createWebHistory } from "vue-router";
import BlogPostGreeting from "@/views/BlogPostGreeting.vue";
import NotFound from "@/views/NotFound.vue";
import Ads from "@/views/Ads.vue";
import Login from "@/views/Login.vue";
import MainLayout from "@/views/MainLayout.vue";
import { isAuthenticated } from "@/apis/auth";



// create a router instance 
const router = createRouter({

    // provides history implementation to use
    history: createWebHistory(),

    // defines some routes, each route record should map to a component
    routes: [
        {path:'/',
         name:'mainLayout',
         component: MainLayout,
         redirect: {name: 'home'},
         children: [
            {path: '/home', name: 'home', component: Home, meta: {requiresAuth: false}},
            {path: '/blogPosts',
            name: 'blogPosts',
            component: BlogPosts,
            redirect: {name: 'blogPostsGreeting'},
            children:[
                {path: '', name: 'blogPostsGreeting', component: BlogPostGreeting, meta: {requiresAuth: false}},
                {path:'/blogPosts/:id(\\d+)', name:'blogPost', components: {
                    default: BlogPost,
                    sidebar: Ads
                },
                meta: {requiresAuth: true}}
            ]},
            {path: '/about', name: 'about', component: About, meta: {requiresAuth: false}},
        ]},
        {path:'/login', name:'login', component: Login, meta: {requiresAuth: false}},
        {path: '/:pathMatch(.*)*',  // matches any path that has not been matched by a previous route
         name: 'notFound',
         component: NotFound,
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