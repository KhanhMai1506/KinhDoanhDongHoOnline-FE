import { createRouter, createWebHistory } from "vue-router"; 
import kiemTraKhachHang from "./kiemTraKhachHang";

const routes = [
    // {
    //     path: '/',
    //     component: () => import('../components/TrangChu/index.vue'),
    //     meta: { layout: 'cdio' }
    // },
    // {
    //     path: '/chi-tiet-oto/:id_san_pham',
    //     component: () => import('../components/Oto/ChiTiet/index.vue'),
    //     meta: { layout: 'cdio' }
    // },
    // {
    //     path: '/chi-tiet-motor/:id_san_pham',
    //     component: () => import('../components/Motor/ChiTiet/index.vue'),
    //     meta: { layout: 'cdio' }
    // },
    // {
    //     path: '/san-pham-motor',
    //     component: () => import('../components/Motor/DanhSach/index.vue'),
    //     meta: { layout: 'cdio' },
    //     props: true
    // },
    // {
    //     path: '/san-pham-oto',
    //     component: () => import('../components/Oto/DanhSach/index.vue'),
    //     meta: { layout: 'cdio' }
    // },
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
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router