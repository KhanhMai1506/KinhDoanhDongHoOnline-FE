import { createRouter, createWebHistory } from "vue-router";
import kiemTraAdmin from "./kiemTraAdmin";
import kiemTraKhachHang from "./kiemTraKhachHang";

const routes = [
    {
        path: '/',
        component: () => import('../components/TrangChu/index.vue'),
        meta: { layout: 'cdio' }
    },

    {
        path: '/chi-tiet-dong-ho/:id_san_pham',
        component: () => import('../components/dong-ho/ChiTiet/index.vue'),
        meta: { layout: 'cdio' }
    },
    {
        path: '/chi-tiet-dong-ho-nu/:id_san_pham',
        component: () => import('../components/dong-ho-nu/chi-tiet/index.vue'),
        meta: { layout: 'cdio' }
    },
    {
        path: '/chi-tiet-dong-ho-tre-em/:id_san_pham',
        component: () => import('../components/dong-ho-tre-em/chi-tiet/index.vue'),
        meta: { layout: 'cdio' }
    },
    {
        path: '/chi-tiet-dong-ho-thong-minh/:id_san_pham',
        component: () => import('../components/dong-ho-thong-minh/chi-tiet/index.vue'),
        meta: { layout: 'cdio' }
    },
    {
        path: '/san-pham-dong-ho',
        component: () => import('../components/dong-ho/DanhSach/index.vue'),
        meta: { layout: 'cdio' },
    },
    {
        path: '/san-pham-dong-ho-nu',
        component: () => import('../components/dong-ho-nu/danh-sach/index.vue'),
        meta: { layout: 'cdio' },
    },
    {
        path: '/san-pham-dong-ho-tre-em',
        component: () => import('../components/dong-ho-tre-em/danh-sach/index.vue'),
        meta: { layout: 'cdio' },
    },
    {
        path: '/san-pham-dong-ho-thong-minh',
        component: () => import('../components/dong-ho-thong-minh/danh-sach/index.vue'),
        meta: { layout: 'cdio' },
    },
    {
        path: '/tim-kiem',
        component: () => import('../components/TimKiem/index.vue'),
        meta: { layout: 'cdio' },
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
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang,
    },

    {
        path: '/khach-hang/gio-hang',
        component: () => import('../components/KhachHang/GioHang/index.vue'),
        meta: { layout: 'client' },
        name: 'gioHang',
        beforeEnter: kiemTraKhachHang
    },

    {
        path: '/khach-hang/don-hang',
        component: () => import('../components/KhachHang/DonHang/index.vue'),
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang
    },

    {
        path: '/admin/dang-nhap',
        component: () => import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'blank' }
    },

    {
        path: '/admin/danh-muc',
        component: () => import('../components/Admin/DanhMuc/index.vue'),
    },

    {
        path: '/admin/nhan-vien',
        component: () => import('../components/Admin/NhanVien/index.vue'),
    },

    {
        path: '/admin/khach-hang',
        component: () => import('../components/Admin/KhachHang/index.vue'),
    },

    {
        path: '/admin/don-hang',
        component: () => import('../components/Admin/DonHang/index.vue'),
    },

    {
        path: '/admin/phan-quyen',
        component: () => import('../components/Admin/PhanQuyen/index.vue'),
    },

    {
        path: '/admin/san-pham',
        component: () => import('../components/Admin/SanPham/index.vue'),
    },

    {
        path: '/admin/profile',
        component: () => import('../components/Admin/Profile/index.vue'),
        beforeEnter: kiemTraAdmin,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router