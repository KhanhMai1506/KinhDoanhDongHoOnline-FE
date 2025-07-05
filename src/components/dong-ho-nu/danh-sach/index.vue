<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="row align-items-center">
                            <div class="col-lg-3">
                                <div class="position-relative">
                                    <input type="text" class="form-control ps-5" placeholder="Tìm kiếm sản phẩm..."
                                        v-model="tu_khoa" @input="timKiemSanPham"> <span
                                        class="position-absolute top-50 product-show translate-middle-y"><i
                                            class="bx bx-search"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-9 col-xl-9">
                                <div class="float-lg-end">
                                    <div class="row row-cols-lg-2 row-cols-xl-auto g-2">
                                        <div class="col">
                                            <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                                @click="sapXep('moi')">
                                                Mới Nhất
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                                @click="sapXep('tang')">
                                                Giá Tăng Dần
                                            </button>
                                            <button type="button" class="btn btn-outline-secondary me-2 px-3 radius-30"
                                                @click="sapXep('giam')">
                                                Giá Giảm Dần
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row product-grid">
                    <template v-for="(value, index) in danh_sach_dong_ho" :key="index">
                        <div class="col-lg-4 col-md-6 mt-3 d-flex">
                            <router-link :to="'/chi-tiet-dong-ho-nu/' + value.id"
                                class="text-decoration-none text-dark w-100">
                                <div class="card flex-fill">
                                    <img v-bind:src="value.hinh_anh" class="card-img-top "
                                        style="    width: 100%; height: 230px; object-fit: contain; vertical-align: middle;"
                                        alt="...">
                                    <div class="card-body d-flex flex-column">
                                        <h6 class="card-title cursor-pointer">
                                            {{ value.ten_san_pham }}
                                        </h6>
                                        <p class="card-text">
                                            {{ formatCurrency(value.gia_ban) }}
                                        </p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { danh_sach_nu } from '../../../data';

export default {
    data() {
        return {
            danh_sach_dong_ho: danh_sach_nu,
            danh_sach_goc: danh_sach_nu
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        },
        timKiemSanPham() {
            const keyword = this.tu_khoa.toLowerCase().trim();
            if (keyword === '') {
                this.danh_sach_dong_ho = this.danh_sach_goc;
            } else {
                this.danh_sach_dong_ho = this.danh_sach_goc.filter(sp =>
                    sp.ten_san_pham.toLowerCase().includes(keyword)
                );
            }
        },
        sapXep(kieu) {
            if (kieu === "tang") {
                this.danh_sach_dong_ho.sort((a, b) => a.gia_ban - b.gia_ban);
            } else if (kieu === "giam") {
                this.danh_sach_dong_ho.sort((a, b) => b.gia_ban - a.gia_ban);
            } else if (kieu === "moi") {
                this.danh_sach_dong_ho = [...this.danh_sach_goc]; // Giữ nguyên thứ tự ban đầu
            }
        },
    }
}
</script>
<style></style>