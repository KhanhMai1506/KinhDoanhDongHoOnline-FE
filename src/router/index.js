import { createRouter, createWebHistory } from "vue-router"; 

const routes = [  
    {
        path: '/tu-van',
        component: () => import('../components/Chatbot/index.vue'),
        meta: { layout: 'blank' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router