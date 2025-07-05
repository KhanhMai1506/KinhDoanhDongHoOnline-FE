<template>
    <div class="container my-4">
        <!-- Breadcrumb -->
        <div class="mb-3 text-muted">
            <small>Trang chủ > Sản phẩm > Chi tiết</small>
        </div>

        <!-- Chi tiết sản phẩm -->
        <div class="row">
            <!-- Ảnh sản phẩm -->
            <div class="col-md-6">
                <img :src="san_pham.hinh_anh"
                    alt="Ảnh sản phẩm"
                    class="img-fluid border"
                    style="height: 400px; object-fit: contain;">
            </div>

            <!-- Thông tin sản phẩm -->
            <div class="col-md-6">
                <h4><b>{{ san_pham.ten_san_pham }}</b></h4>
                <h5 class="mt-3 text-danger"><b>{{ formatCurrency(san_pham.gia_ban) }}</b></h5>
                <p class="mt-3 text-muted">{{ san_pham.message }}</p>

                <!-- Số lượng -->
                <div class="d-flex align-items-center my-3">
                    <span class="me-2">Số lượng:</span>
                    <button class="btn btn-outline-secondary btn-sm" @click="decreaseQuantity">-</button>
                    <input type="text" class="form-control text-center mx-2" style="width: 60px;" v-model="so_luong" readonly>
                    <button class="btn btn-outline-secondary btn-sm" @click="increaseQuantity">+</button>
                </div>

                <!-- Nút hành động -->
                <div class="d-flex gap-3 mt-4">
                    <button class="btn btn-dark flex-fill">Mua Ngay</button>
                    <button class="btn btn-outline-dark flex-fill">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        </div>

        <!-- Sản phẩm đề xuất -->
        <div class="mt-5">
            <h5>SẢN PHẨM ĐỀ XUẤT</h5>
            <div class="row row-cols-2 row-cols-md-4 g-3 mt-2">
                <template v-for="(v, k) in danh_sach_dong_ho.slice(4, 8)" :key="k">
                    <div class="col">
                        <router-link :to="'/chi-tiet-dong-ho-thong-minh/' + v.id" class="text-decoration-none text-dark">
                            <div class="card h-100">
                                <img :src="v.hinh_anh" class="card-img-top" style="height: 180px; object-fit: contain;">
                                <div class="card-body">
                                    <h6 class="card-title">{{ v.ten_san_pham }}</h6>
                                    <p class="card-text">{{ formatCurrency(v.gia_ban) }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<style scoped>
input[type="text"] {
    pointer-events: none;
    background-color: #f9f9f9;
}
</style>

<script>

import { danh_sach_thong_minh } from '../../../data';

export default {
    data() {
        return {
            san_pham: null,
            danh_sach_dong_ho: danh_sach_thong_minh,
            so_luong: 1
        }
    },
    created() {
        this.loadSanPham();
    },
    watch: {
        '$route.params.id_san_pham': {
            handler() {
                this.loadSanPham();
            },
            immediate: true
        }
    },
    methods: {
        loadSanPham() {
            const id = Number(this.$route.params.id_san_pham);
            this.san_pham = this.danh_sach_dong_ho.find(sp => sp.id === id);
        },
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        },
        increaseQuantity() {
      this.so_luong++;
    },
    decreaseQuantity() {
      if (this.so_luong > 1) {
        this.so_luong--;
      }
    }
    }
}
</script>
<style></style>