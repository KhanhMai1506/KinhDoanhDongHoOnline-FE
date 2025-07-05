<template>
    <div class="row">
        <div class="col-lg-12 d-flex">
            <div class="card">
                <div class="row g-0">
                    <div class="col-md-6">
                        <img :src="san_pham.hinh_anh"
                            style="width: 100%; height: 400px; object-fit: contain; vertical-align: middle;"
                            class="img-fluid" alt="...">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body mt-4">
                            <div class="card-title">
                                <h4><b>
                                        {{ san_pham.ten_san_pham }}
                                    </b></h4>
                            </div>
                            <div class="mt-3">
                                <h5><b>
                                        Giá bán: {{ formatCurrency(san_pham.gia_ban) }}
                                    </b></h5>
                            </div>
                            <p class="card-text mt-5 mb-1 fs-6">
                                {{ san_pham.slogan }}
                            </p>
                            <p class="card-text fs-6">
                                {{ san_pham.message }}
                            </p>
                            <div class="d-flex gap-3 mt-4">
                                <button class="btn btn-dark" style="width: 100%;">Mua Ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header mt-2">
                    <h5>SẢN PHẨM ĐỀ XUẤT</h5>
                </div>
                <div class="card-body d-flex">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 product-grid">
                        <template v-for="(v, k) in ds_de_xuat.slice(7, 11)" :key="k">
                            <div class="col d-flex">
                                <router-link :to="'/chi-tiet-oto/' + v.id"
                                    class="text-decoration-none text-dark w-100 h-100">
                                    <div class="card" style="width: 19rem;">
                                        <div class="card-title">
                                            <img v-bind:src="v.hinh_anh" style="width: 300px; height: 185px;"
                                                class="card-img-top" alt="...">
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title">{{ v.ten_san_pham }}</h5>
                                            <p class="card-text">
                                                Giá bán: {{ formatCurrency(v.gia_ban) }}
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
    </div>
</template>
<script>

import { danh_sach_oto } from '../../../data';

export default {
    data() {
        return {
            san_pham: null,
            ds_de_xuat: danh_sach_oto
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
            this.san_pham = this.ds_de_xuat.find(sp => sp.id === id);
        },
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }
    }
}
</script>
<style></style>