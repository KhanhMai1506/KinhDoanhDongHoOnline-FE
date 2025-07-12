<template>
    <div class="nav-container primary-menu">
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item">
                    <router-link :to="'/'">
                        <a class="nav-link" :href="'/'">
                            <div class="parent-icon"><i class="fa-solid fa-house-chimney-window"></i>
                            </div>
                            <div class="menu-title">Trang Chủ</div>
                        </a>
                    </router-link>
                </li>
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
                <li class="nav-item">
                    <router-link :to="'/lien-he'">
                        <a class="nav-link" href="">
                            <div class="parent-icon"><i class="fa-solid fa-phone"></i>
                            </div>
                            <div class="menu-title">Liên Hệ</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/tu-van'">
                        <a class="nav-link" :href="'/tu-van'">
                            <div class="parent-icon"><i class="fa-brands fa-rocketchat"></i>
                            </div>
                            <div class="menu-title">Tư Vấn</div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_danh_muc: [],
        }
    },
    mounted() {
        this.loadDataDanhMuc();
    },
    methods: {
        loadDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/danh-muc/data")
                .then((res) => {
                    this.list_danh_muc = res.data.data;
                });
        },
    },
}
</script>
<style></style>