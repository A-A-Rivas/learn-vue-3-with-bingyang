import About from "@/views/About.vue";
import BlogPosts from "@/views/BlogPosts.vue";
import Home from "@/views/Home.vue";
import BlogPost from "@/views/BlogPost.vue";
import { createRouter, createWebHistory } from "vue-router";
import BlogPostGreeting from "@/views/BlogPostGreeting.vue";
import NotFound from "@/views/NotFound.vue";
import Ads from "@/views/Ads.vue";

// create a router instance 
const router = createRouter({

    // provides history implementation to use
    history: createWebHistory(),

    // defines some routes, each route record should map to a component
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/blogPosts',
         name: 'blogPosts',
         component: BlogPosts,
         redirect: {name: 'blogPostsGreeting'},
         children:[
            {path: '', name: 'blogPostsGreeting', component: BlogPostGreeting},
            {path:'/blogPosts/:id(\\d+)', name:'blogPost', components: {
                default: BlogPost,
                sidebar: Ads
            }}

         ]},
        {path: '/about', name: 'about', component: About},
        {path: '/:pathMatch(.*)*',  // matches any path that has not been matched by a previous route
         name: 'notFound',
         component: NotFound}
    ]
})

// exports the router instance
export default router