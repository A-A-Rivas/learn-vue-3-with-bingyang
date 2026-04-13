import About from "@/views/About.vue";
import BlogPosts from "@/views/BlogPosts.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

// create a router instance 
const router = createRouter({

    // provides history implementation to use
    history: createWebHistory(),

    // defines some routes, each route record should map to a component
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/blogPosts', name: 'blogPosts', component: BlogPosts},
        {path: '/about', name: 'about', component: About}
    ]
})

// exports the router instance
export default router