import { createRouter, createWebHistory } from "vue-router";
import kiemTraKhachHang from "./kiemTraKhachHang";

const routes = [
    {
        path: '/',
        component: () => import('../components/TrangChu/index.vue'),
        meta: { layout: 'cdio' }
    },

    {
        path: '/:slug_danh_muc',
        component: () => import('../components/DanhSach/index.vue'),
        meta: { layout: 'cdio' },
        name: 'DanhSach',
        props: true
    },

    {
        path: '/chi-tiet-dong-ho/:id_san_pham',
        component: () => import('../components/ChiTiet/index.vue'),
        meta: { layout: 'cdio' },
        props: true
    },
    
    {
        path: '/tim-kiem/:thong_tin',
        component: () => import('../components/TimKiem/index.vue'),
        meta: { layout: 'cdio' },
        name: 'name_tim_kiem',
        props: true
    },

    {
        path: '/khach-hang/dang-nhap',
        component: () => import('../components/KhachHang/DangNhap/index.vue'),
        meta: { layout: 'blank' }
    },

    {
        path: '/khach-hang/quen-mat-khau',
        component: () => import('../components/KhachHang/QuenMatKhau/index.vue'),
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

    {
        path: '/khach-hang/gio-hang',
        component: () => import('../components/KhachHang/GioHang/index.vue'),
        meta: { layout: 'cdio' },
        beforeEnter: kiemTraKhachHang
    },

    {
        path: '/khach-hang/don-hang',
        component: () => import('../components/KhachHang/DonHang/index.vue'),
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router