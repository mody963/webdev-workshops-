import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import HomePage from "../pages/HomePage.vue";
const AboutPage = () => import('../pages/AboutPage.vue');
import ProductManagementPage from "../pages/ProductManagementPage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

const routes: RouteRecordRaw[] = [
    {path: '/Home', component: HomePage},
    {path: '/about', component: AboutPage},
    {path: '/products/:id', component: ProductDetailPage},
    {path: '/products', component: ProductManagementPage},
    { path: '/:pathMatch(.*)*', component: NotFoundPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
