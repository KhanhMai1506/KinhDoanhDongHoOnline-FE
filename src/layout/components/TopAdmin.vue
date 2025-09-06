<template>
    <div class="topbar d-flex align-items-center">
        <nav class="navbar navbar-expand">
            <div class="topbar-logo-header">
                <div class="">
                    <img src="/src/assets/images/logo.png" class="logo-icon" style="width: 130px;" alt="logo icon">
                </div>
            </div>
            <div class="search-bar flex-grow-1">
                <div class="position-relative search-bar-box w-100">
                    <input type="text" class="form-control search-control rounded-pill" style="border: 1px solid gray;"
                        placeholder="Type to search..." v-model="tu_khoa" v-on:keyup.enter="timKiem()">
                    <span class="position-absolute top-50 search-show translate-middle-y">
                        <i class="bx bx-search"></i>
                    </span>
                    <button class="position-absolute top-50 end-0 translate-middle-y btn rounded-pill" type="button"
                        style="z-index: 1; outline: none; box-shadow: none;" v-on:click="timKiem()">Tìm Kiếm
                    </button>
                </div>
            </div>

            <div class="user-box dropdown">
                <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="avatar_admin || defaultAvatar" class="user-img rounded-circle p-1 bg-dark"
                        alt="user avatar">
                    <div class="user-info ps-3">
                        <p class="user-name mb-0">{{ name_admin }}</p>
                        <p class="designattion mb-0">Admin</p>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <router-link to="/admin/profile">
                            <a class="dropdown-item" href="/admin/profile"><i
                                    class="bx bx-user"></i><span>Profile</span></a>
                        </router-link>
                    </li>
                    <li><a v-on:click="dangXuat()" class="dropdown-item" href="javascript:;"><i
                                class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            auth: false,
            name_admin: '',
            avatar_admin: '',
            defaultAvatar: 'https://i.pinimg.com/736x/fa/7e/a6/fa7ea6ce4e90b794eef88dde93522dd6.jpg'
        }
    },
    mounted() {
        this.checkLogin();
        const admin = JSON.parse(localStorage.getItem('admin'));
        if (admin) {
            this.name_admin = admin.ho_va_ten;
            this.avatar_admin = admin.hinh_anh;
        }

        // Lắng nghe sự kiện đổi avatar
        window.addEventListener("avatarUpdated", () => {
            const updatedAdmin = JSON.parse(localStorage.getItem('admin'));
            if (updatedAdmin) {
                this.avatar_admin = updatedAdmin.hinh_anh;
                this.name_admin = updatedAdmin.ho_va_ten;
            }
        });
    },
    methods: {
        dangXuat() {
            axios
                .post('http://127.0.0.1:8000/api/admin/dang-xuat', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/admin/dang-nhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        checkLogin() {
            axios
                .get('http://127.0.0.1:8000/api/kiem-tra-admin', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.auth = true;
                    }
                })
        },
    },
}
</script>
<style></style>