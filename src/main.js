import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'

const app = createApp(App)

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/favorites',
        component: About,
        name: 'Favorites'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
