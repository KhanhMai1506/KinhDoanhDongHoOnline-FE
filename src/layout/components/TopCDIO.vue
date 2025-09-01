<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand"> <router-link :to="'/'"> <a class="dropdown-item" :href="'/'">
                        <div class="topbar-logo-header d-flex align-items-center"> <img
                                src="/src/assets/images/logo.png" class="logo-icon" style="width: 120px;"
                                alt="logo icon"> </div>
                    </a> </router-link>
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
                <div class="search-bar flex-grow-1">
                    <div class="position-relative search-bar-box w-100"> <input type="text"
                            class="form-control search-control rounded-pill" style="border: 1px solid gray;"
                            placeholder="Type to search..." v-model="tu_khoa" v-on:keyup.enter="timKiem()"> <span
                            class="position-absolute top-50 search-show translate-middle-y"> <i
                                class="bx bx-search"></i> </span>
                        <button class="position-absolute top-50 end-0 translate-middle-y btn rounded-pill" type="button"
                            style="z-index: 1; outline: none; box-shadow: none;" v-on:click="timKiem()">Tìm Kiếm
                        </button>
                    </div>
                </div>
                <template v-if="auth">
                    <div class="top-menu ms-3">
                        <ul class="navbar-nav align-items-center">
                            <li class="nav-item mobile-search-icon"> <a class="nav-link" href="#"> <i
                                        class='bx bx-search'></i> </a>
                            </li>
                            <li class="nav-item dropdown dropdown-large"> <router-link to="/khach-hang/gio-hang"> <a
                                        class="nav-link position-relative"> <span class="alert-count">{{ gio_hang_count
                                            }}</span> <i class='bx bx-cart-alt'></i> </a> </router-link> </li>
                        </ul>
                    </div>
                    <div class="user-box dropdown">
                        <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <!-- 👇 dùng avatar động thay vì ảnh cứng -->
                            <img :src="avatar" class="user-img rounded-circle p-1 bg-dark" alt="user avatar" />
                            <div class="user-info ps-3">
                                <p class="user-name mb-0">{{ name_kh }}</p>
                                <p class="designattion mb-0">Khách Hàng</p>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <router-link to="/khach-hang/profile">
                                    <a class="dropdown-item" href="/khach-hang/profile">
                                        <i class="bx bx-user"></i><span>Profile</span>
                                    </a>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/khach-hang/don-hang">
                                    <a class="dropdown-item" href="/khach-hang/don-hang">
                                        <i class="fa-solid fa-box-archive"></i><span>Đơn Hàng</span>
                                    </a>
                                </router-link>
                            </li>
                            <li>
                                <div class="dropdown-divider mb-0"></div>
                            </li>
                            <li>
                                <a v-on:click="dangXuat()" class="dropdown-item">
                                    <i class='bx bx-log-out-circle'></i><span>Đăng Xuất</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </template>
                <template v-else>
                    <div class="user-box dropdown"> <router-link to="/khach-hang/dang-nhap"> <button type="button"
                                class="btn btn-outline-dark px-5 radius-30 me-2 d-flex align-items-center"><i
                                    class="fa-regular fa-user me-2"></i>Đăng Nhập</button> </router-link> <router-link
                            to="/khach-hang/dang-ky"> <button type="button"
                                class="btn btn-dark px-5 radius-30 d-flex align-items-center"><i
                                    class="fa-solid fa-arrow-right-to-bracket me-2"></i>Đăng Ký</button> </router-link>
                    </div>
                </template>
            </nav>
        </div>
    </header>
</template>

<script>
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default {
    data() {
        return {
            auth: false,
            name_kh: "",
            avatar: "https://i.pravatar.cc/50",
            tu_khoa: "",
            user: null,
            gio_hang_count: 0
        };
    },
    mounted() {
        this.loadUserFromStorage();
        this.laySoLuongGioHang();
        window.addEventListener("loginSuccess", this.handleLoginSuccess);
        window.addEventListener("avatarUpdated", this.updateAvatarFromStorage);
        window.addEventListener("gioHangUpdated", this.laySoLuongGioHang);
        window.addEventListener("gioHangUpdated", this.laySoLuongGioHang); 
    },
    beforeUnmount() {
        window.removeEventListener("loginSuccess", this.handleLoginSuccess);
        window.removeEventListener("avatarUpdated", this.updateAvatarFromStorage);
        window.removeEventListener("gioHangUpdated", this.laySoLuongGioHang);
        window.removeEventListener("gioHangUpdated", this.laySoLuongGioHang);
    },
    methods: {
        handleLoginSuccess(event) {
            const token = event?.detail?.token;
            if (!token) return;

            this.clearAuth(); // Xóa token cũ
            localStorage.setItem("token_khach_hang", token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            this.fetchUser();
        },

        loadUserFromStorage() {
            const token = localStorage.getItem("token_khach_hang");
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.fetchUser();
            }
        },

        async fetchUser() {
            const token = localStorage.getItem("token_khach_hang");
            if (!token) {
                this.clearAuth();
                return;
            }
            try {
                const res = await axios.get(`${API_BASE}/api/khach-hang/profile/data`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const user = res.data.data;
                if (user) {
                    this.auth = true;
                    this.user = user;
                    this.name_kh = user.ho_va_ten;
                    this.avatar = user.hinh_anh || "https://i.pravatar.cc/50";
                    localStorage.setItem("khach_hang", JSON.stringify(user));
                } else this.clearAuth();
            } catch {
                this.clearAuth();
            }
        },

        clearAuth() {
            this.auth = false;
            this.user = null;
            this.name_kh = "";
            this.avatar = "https://i.pravatar.cc/50";
            localStorage.removeItem("token_khach_hang");
            localStorage.removeItem("khach_hang");
            delete axios.defaults.headers.common['Authorization'];
        },

        dangXuat() {
            const token = localStorage.getItem("token_khach_hang");
            axios.post(`${API_BASE}/api/khach-hang/dang-xuat`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).finally(() => {
                this.clearAuth();
                this.$router.push("/khach-hang/dang-nhap");
            });
        },

        timKiem() {
            this.$router.push({ name: "name_tim_kiem", params: { thong_tin: this.tu_khoa } });
        },
        laySoLuongGioHang() {
            axios
                .get('http://127.0.0.1:8000/api/gio-hang/dem', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.gio_hang_count = res.data.so_luong;
                        console.log(res.data.so_luong);
                    }
                });
        },
        updateAvatarFromStorage() {
            const user = JSON.parse(localStorage.getItem("khach_hang"));
            if (user) {
                this.avatar = user.hinh_anh || "https://i.pinimg.com/736x/fa/7e/a6/fa7ea6ce4e90b794eef88dde93522dd6.jpg";
                this.name_kh = user.ho_va_ten;
            }
        },
    }
};
</script>
<style></style>
