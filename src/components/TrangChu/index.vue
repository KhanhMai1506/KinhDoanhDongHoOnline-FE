<template>
    <div class="row">
        <div class="col-lg-9">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner rounded-5">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src="https://xwatch.vn/images/slideshow/2024/12/04/original/img_20241204_164504_1733305597.jpg"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="https://www.dangquangwatch.vn/view/pic/dong-ho-dang-quang_1.7.2025.jpg"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="https://xwatch.vn/images/slideshow/2024/10/04/original/thuong-hieu-posedius-1170x400_1728016590.jpg"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="row">
                <div class="col-lg-12">
                    <div class="h-100 rounded-5">
                        <img src="https://file.hstatic.net/1000043302/file/banner_nho_1_1024x1024.jpg"
                            style="height: 192px;" class="img-fluid rounded-5" alt="...">
                    </div>
                </div>
                <div class="col-lg-12 mt-3">
                    <div class="h-100 rounded-5">
                        <img src="https://file.hstatic.net/1000043302/file/web_2_1024x1024.jpg" style="height: 192px;"
                            class="img-fluid rounded-5" alt="...">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="row mt-5">
        <div class="col-lg-12 col-md-12">
            <div class="row ">
                <template v-for="(value, index) in list_danh_muc" :key="index">
                    <div class="col-lg-3 mb-2 d-flex">
                        <div class="card flex-fill">
                            <router-link :to="`/` + value.slug_danh_muc">
                                <div class="card-body">
                                    <div class="text-center d-flex flex-column justify-content-center">
                                        <button type="button" class="btn btn-outline-secondary mx-auto ps-3 mb-2">
                                            <span v-html="value.icon_danh_muc"></span>
                                        </button>
                                        <div class="text-dark">{{ value.ten_danh_muc }}</div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    <!-- List Flash Sale -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h4>
                            <i class="fa-solid fa-bolt text-warning"></i> FLASH SALE
                        </h4>
                        <a href="/flash-sale" class="fs-5">Xem tất cả</a>
                    </div>
                    <hr>
                    <div
                        class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-3 product-grid">
                        <template v-for="(value, index) in list_flash_sale.slice(0,4)" :key="index">
                            <div class="col d-flex">
                                <router-link :to="'/chi-tiet-dong-ho/' + value.id"
                                    class="text-decoration-none text-dark w-100 h-100">
                                    <div class="card h-100 d-flex flex-column">
                                        <img :src="value.hinh_anh" class="card-img-top"
                                            style="height: 230px; object-fit: contain;" alt="...">

                                        <div class="card-body d-flex flex-column justify-content-between">
                                            <h6 class="card-title">{{ value.ten_san_pham }}</h6>

                                            <!-- Giá khuyến mãi -->
                                            <span class="text-danger fw-bold fs-5">
                                                {{ formatCurrency(value.gia_khuyen_mai) }}
                                            </span>

                                            <!-- Giá gốc + % giảm -->
                                            <div class="d-flex align-items-center gap-2">
                                                <span class="text-muted text-decoration-line-through">
                                                    {{ formatCurrency(value.gia_ban) }}
                                                </span>
                                                <span class="text-danger">-{{ value.phan_tram }}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- List Nổi Bật -->
    <div class="row mt-4">
        <div class="col-lg-12">
            <div class="card    ">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h4>
                            <i class="fa-solid fa-fire text-danger"></i> SẢN PHẨM NỔI BẬT
                        </h4>
                        <a href="/noi-bat" class="fs-5">Xem tất cả</a>
                    </div>
                    <hr>
                    <div
                        class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-3 product-grid">
                        <template v-for="(value, index) in list_noi_bat.slice(0,4)" :key="index">
                            <div class="col d-flex">
                                <router-link :to="'/chi-tiet-dong-ho/' + value.id"
                                    class="text-decoration-none text-dark w-100 h-100">
                                    <div class="card h-100 d-flex flex-column">
                                        <img :src="value.hinh_anh" class="card-img-top"
                                            style="height: 230px; object-fit: contain;" alt="...">

                                        <div class="card-body d-flex flex-column justify-content-between">
                                            <h6 class="card-title">{{ value.ten_san_pham }}</h6>
                                            <p class="card-text mb-0">{{ formatCurrency(value.gia_ban) }}</p>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_danh_muc: [],
            list_flash_sale: [],
            list_noi_bat: [],
        }
    },
    mounted() {
        this.loadDataDanhMuc();
        this.loadDataSanPhamFlashSale();
        this.loadDataSanPhamNoiBat();
    },
    methods: {
        loadDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/danh-muc/data-open")
                .then((res) => {
                    this.list_danh_muc = res.data.data;
                });
        },
        loadDataSanPhamNoiBat() {
            axios
                .get("http://127.0.0.1:8000/api/san-pham/data-noi-bat")
                .then((res) => {
                    this.list_noi_bat = res.data.data;
                });
        },
        loadDataSanPhamFlashSale() {
            axios
                .get("http://127.0.0.1:8000/api/san-pham/data-flash-sale")
                .then((res) => {
                    this.list_flash_sale = res.data.data;
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        }
    },
}
</script>
<style></style>