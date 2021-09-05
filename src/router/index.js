import { createRouter, createWebHistory } from 'vue-router';
import Game from '../views/Game.vue';
import Home from '../views/Home.vue';

const routes = [
    {
        path: '/',
        component: Game,
    },
    {
        path: '/home',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
