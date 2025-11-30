<template>
    <div class="nav-container primary-menu">
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <!-- Trang chủ -->
                <li class="nav-item">
                    <router-link to="/" class="nav-link">
                        <div class="parent-icon"><i class="fa-solid fa-house-chimney-window"></i></div>
                        <div class="menu-title">Trang Chủ</div>
                    </router-link>
                </li>

                <!-- Sản phẩm -->
                <li class="nav-item dropdown">
                    <a href="" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                        data-bs-toggle="dropdown">
                        <div class="parent-icon"><i class="fa-solid fa-store"></i>
                        </div>
                        <div class="menu-title">Sản Phẩm</div>
                    </a>
                    <ul class="dropdown-menu">
                        <template v-for="(value, index) in list_danh_muc" :key="index">
                            <li> 
                                <router-link :to="`/` + value.slug_danh_muc">
                                    <a class="dropdown-item" href="">{{ value.ten_danh_muc }}</a>
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </li>

                <!-- Liên hệ -->
                <li class="nav-item">
                    <router-link to="/lien-he" class="nav-link">
                        <div class="parent-icon"><i class="fa-solid fa-phone"></i></div>
                        <div class="menu-title">Liên Hệ</div>
                    </router-link>
                </li>

                <!-- Tư vấn -->
                <li class="nav-item">
                    <router-link to="/tu-van" class="nav-link">
                        <div class="parent-icon"><i class="fa-brands fa-rocketchat"></i></div>
                        <div class="menu-title">Tư Vấn</div>
                    </router-link>
                </li>

                <!-- Chat -->
                <li class="nav-item">
                    <router-link to="/chat" class="nav-link">
                        <div class="parent-icon"><i class="fa-solid fa-comments"></i></div>
                        <div class="menu-title">Chat</div>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            list_danh_muc: [],
        };
    },
    mounted() {
        this.loadDataDanhMuc();
    },
    methods: {
        async loadDataDanhMuc() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/danh-muc/data-open");
                this.list_danh_muc = res.data.data;
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            }
        },
    },
};
</script>

