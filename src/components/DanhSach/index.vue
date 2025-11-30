<template>
    <div class="container">
        <div class="row mt-3 mb-2">
            <div class="col-lg-12 col-md-12">
                <div class="row">
                    <template v-for="(value, index) in list_danh_muc_con" :key="index">
                        <div class="col-lg-3 mb-2 d-flex">
                            <div class="card flex-fill">
                                <router-link :to="{ name: 'DanhSach', params: { slug_danh_muc: value.slug_danh_muc } }">
                                    <div class="card-body">
                                        <div class="text-center d-flex flex-column justify-content-center">
                                            <div class="text-dark" style="font-size: 20px;">{{ value.ten_danh_muc }}
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <!-- Tìm kiếm, sắp xếp & lọc giá -->
                <div class="row mb-3 align-items-center">
                    <!-- Tìm kiếm -->
                    <div class="col-lg-4 mb-2 mb-lg-0">
                        <div class="position-relative">
                            <input type="text" class="form-control ps-5" placeholder="Tìm kiếm sản phẩm..."
                                v-model="tag_search" />
                            <span class="position-absolute top-50 product-show translate-middle-y">
                                <i class="bx bx-search"></i>
                            </span>
                        </div>
                    </div>

                    <!-- Sắp xếp -->
                    <div class="col-lg-5 text-lg-end">
                        <div class="row row-cols-lg-1 g-2">
                            <div class="col">
                                <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                    @click="sortType = 'moi'">
                                    Mới Nhất
                                </button>
                                <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                    @click="sortType = 'tang'">
                                    Giá Tăng Dần
                                </button>
                                <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                    @click="sortType = 'giam'">
                                    Giá Giảm Dần
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Lọc giá -->
                    <div class="col-lg-3 mb-2 mb-lg-0">
                        <select class="form-select w-auto" v-model="priceFilter">
                            <option value="">Tất cả giá</option>
                            <option value="0-1000000">Dưới 1 triệu</option>
                            <option value="1000000-5000000">1 - 5 triệu</option>
                            <option value="5000000-10000000">5 - 10 triệu</option>
                            <option value="10000000-999999999">Trên 10 triệu</option>
                        </select>
                    </div>
                </div>

                <hr />

                <!-- Grid sản phẩm -->
                <div class="row product-grid">
                    <template v-for="(value, index) in paginatedProducts" :key="index">
                        <div class="col-lg-4 col-md-6 mt-3 d-flex">
                            <router-link :to="'/chi-tiet-dong-ho/' + value.id"
                                class="text-decoration-none text-dark w-100">
                                <div class="card flex-fill h-100">
                                    <img :src="value.hinh_anh" class="card-img-top"
                                        style="width: 100%; height: 230px; object-fit: contain;" alt="..." />
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <h6 class="card-title">{{ value.ten_san_pham }}</h6>
                                        <div class="d-flex align-items-center gap-2 mt-auto">
                                            <div class="d-flex align-items-center gap-2">
                                                <template v-if="value.is_flash_sale == 1 && value.gia_khuyen_mai > 0">
                                                    <span class="text-danger fw-bold fs-5">{{
                                                        formatCurrency(value.gia_khuyen_mai) }}</span>
                                                    <span class="text-muted align-middle text-decoration-line-through">
                                                        {{ formatCurrency(value.gia_ban) }}
                                                    </span>
                                                    <span class="text-danger">-{{ value.phan_tram }}%</span>
                                                </template>
                                                <template v-else>
                                                    <span class="text-danger fw-bold fs-5">{{
                                                        formatCurrency(value.gia_ban) }}</span>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </template>
                </div>

                <!-- Phân trang -->
                <div class="mt-3 d-flex justify-content-center align-items-center">
                    <button class="btn btn-outline-secondary me-2" :disabled="currentPage === 1" @click="currentPage--">
                        &laquo; Trước
                    </button>

                    <button v-for="page in totalPages" :key="page" class="btn me-2"
                        :class="page === currentPage ? 'btn-primary' : 'btn-outline-primary'"
                        @click="currentPage = page">
                        {{ page }}
                    </button>

                    <button class="btn btn-outline-secondary" :disabled="currentPage === totalPages"
                        @click="currentPage++">
                        Tiếp &raquo;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["slug_danh_muc"],
    data() {
        return {
            list_san_pham: [],
            list_danh_muc_con: [],
            tag_search: "",
            sortType: "moi",
            currentPage: 1,
            itemsPerPage: 6,
            priceFilter: "",
        };
    },
    watch: {
        tag_search() { this.currentPage = 1; },
        sortType() { this.currentPage = 1; },
        priceFilter() { this.currentPage = 1; },
        currentPage() { window.scrollTo({ top: 0, behavior: "smooth" }); },
    },
    mounted() {
        this.loadProducts(this.slug_danh_muc);
        this.loadDanhMucCon(this.slug_danh_muc);
    },
    beforeRouteUpdate(to, from, next) {
        // 1. Luôn luôn tải sản phẩm mới theo slug vừa click
        this.loadProducts(to.params.slug_danh_muc);

        // 2. Kiểm tra xem slug mới (to.params) có nằm trong danh sách danh mục đang hiển thị không
        const isClickingChild = this.list_danh_muc_con.some(
            (item) => item.slug_danh_muc === to.params.slug_danh_muc
        );

        // 3. Logic quyết định có tải lại danh sách button hay không:
        if (isClickingChild) {
            // Nếu click vào danh mục con đang hiển thị -> KHÔNG làm gì cả (giữ nguyên list button)
            console.log("Đang xem danh mục con, giữ nguyên menu");
        } else {
            // Nếu chuyển sang một trang hoàn toàn khác -> Tải lại list danh mục
            this.loadDanhMucCon(to.params.slug_danh_muc);
        }

        next();
    },
    methods: {
        loadProducts(slug) {
            axios
                .get(`http://127.0.0.1:8000/api/san-pham-tu-danh-muc/${slug}`)
                .then(res => {
                    if (res.data.status) {
                        this.list_san_pham = res.data.data;
                    } else {
                        throw new Error(res.data.message);
                    }
                })
                .catch(() => {
                    this.$toast.error("Không tìm thấy danh mục.");
                    this.$router.push("/");
                });
        },
        loadDanhMucCon(slug) {
            axios
                .get(`http://127.0.0.1:8000/api/danh-muc-con/${slug}`)
                .then(res => {
                    this.list_danh_muc_con = res.data.data;
                })
                .catch(() => {
                    this.list_danh_muc_con = []; // Không có danh mục con
                });
        },

        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        },
        getFinalPrice(sp) {
            return sp.is_flash_sale == 1 && sp.gia_khuyen_mai > 0 ? sp.gia_khuyen_mai : sp.gia_ban;
        },
    },
    computed: {
        filteredProducts() {
            return this.list_san_pham
                .filter(sp => {
                    const matchesSearch = this.tag_search === "" || sp.ten_san_pham.toLowerCase().includes(this.tag_search.toLowerCase());
                    let matchesPrice = true;
                    if (this.priceFilter) {
                        const [min, max] = this.priceFilter.split("-").map(Number);
                        matchesPrice = this.getFinalPrice(sp) >= min && this.getFinalPrice(sp) <= max;
                    }
                    return matchesSearch && matchesPrice;
                })
                .sort((a, b) => {
                    if (this.sortType === "moi") return b.id - a.id;
                    if (this.sortType === "tang") return this.getFinalPrice(a) - this.getFinalPrice(b);
                    if (this.sortType === "giam") return this.getFinalPrice(b) - this.getFinalPrice(a);
                    return 0;
                });
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredProducts.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },
    },
};
</script>
