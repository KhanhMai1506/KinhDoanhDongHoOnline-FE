<template>
    <div class="container">
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

                    <!-- Lọc giá bằng dropdown -->

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
                                        style="width: 100%; height: 230px; object-fit: contain; vertical-align: middle;"
                                        alt="..." />
                                    <div class="card-body d-flex flex-column justify-content-between">
                                        <h6 class="card-title">{{ value.ten_san_pham }}</h6>
                                        <div class="d-flex align-items-center gap-2 mt-auto">
                                            <div class="d-flex align-items-center gap-2">
                                                <!-- Nếu có flash sale -->
                                                <template v-if="value.is_flash_sale == 1 && value.gia_khuyen_mai > 0">
                                                    <span class="text-danger fw-bold fs-5">
                                                        {{ formatCurrency(value.gia_khuyen_mai) }}
                                                    </span>
                                                    <span class="text-muted align-middle text-decoration-line-through">
                                                        {{ formatCurrency(value.gia_ban) }}
                                                    </span>
                                                    <span class="text-danger">-{{ value.phan_tram }}%</span>
                                                </template>

                                                <!-- Nếu không flash sale -->
                                                <template v-else>
                                                    <span class="text-danger fw-bold fs-5">
                                                        {{ formatCurrency(value.gia_ban) }}
                                                    </span>
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
            id_danh_muc: null,
            list_san_pham: [],
            tag_search: "",
            sortType: "moi",
            currentPage: 1,
            itemsPerPage: 6,
            priceFilter: "", // khoảng giá dạng "min-max"
        };
    },
    watch: {
        tag_search() {
            this.currentPage = 1;
        },
        sortType() {
            this.currentPage = 1;
        },
        priceFilter() {
            this.currentPage = 1;
        },
        currentPage() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    },
    beforeRouteUpdate(to, from, next) {
        this.laySanPhamTuDanhMuc(to.params.slug_danh_muc);
        next();
    },
    mounted() {
        this.laySanPhamTuDanhMuc(this.slug_danh_muc);
    },
    methods: {
        laySanPhamTuDanhMuc(slug) {
            axios
                .get("http://127.0.0.1:8000/api/slug-to-id/" + slug)
                .then((res) => {
                    if (res.data.status) {
                        this.id_danh_muc = res.data.data.id;
                        return axios.get(
                            "http://127.0.0.1:8000/api/san-pham-tu-danh-muc/" + this.id_danh_muc
                        );
                    } else {
                        throw new Error(res.data.message);
                    }
                })
                .then((res) => {
                    this.list_san_pham = res.data.data;
                })
                .catch((err) => {
                    this.$toast.error("Không tìm thấy danh mục.");
                    this.$router.push("/");
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
        getFinalPrice(sp) {
            if (sp.is_flash_sale == 1 && sp.gia_khuyen_mai > 0) {
                return sp.gia_khuyen_mai;
            }
            return sp.gia_ban;
        },
    },
    computed: {
        filteredProducts() {
            return this.list_san_pham.filter((value) => {
                const matchesSearch =
                    this.tag_search === "" ||
                    value.ten_san_pham.toLowerCase().includes(this.tag_search.toLowerCase());

                let matchesPrice = true;
                if (this.priceFilter) {
                    const [min, max] = this.priceFilter.split("-").map(Number);
                    matchesPrice = this.getFinalPrice(value) >= min && this.getFinalPrice(value) <= max;
                }

                return matchesSearch && matchesPrice;
            }).sort((a, b) => {
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
