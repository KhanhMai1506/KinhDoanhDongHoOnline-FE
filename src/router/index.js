import { createRouter, createWebHistory } from "vue-router"; 
import kiemTraKhachHang from "./kiemTraKhachHang";

const routes = [
    {
        path: '/khach-hang/dang-nhap',
        component: () => import('../components/KhachHang/DangNhap/index.vue'),
        meta: { layout: 'blank' }
    },
    {
        path: '/khach-hang/dang-ky',
        component: () => import('../components/KhachHang/DangKy/index.vue'),
        meta: { layout: 'blank' }
    },
    {
        path: '/khach-hang/profile',
        component: () => import('../components/KhachHang/Profile/index.vue'),
        meta: { layout: 'cdio' },
        beforeEnter: kiemTraKhachHang,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router