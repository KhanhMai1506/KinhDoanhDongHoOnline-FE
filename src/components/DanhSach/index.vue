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
                    <template v-for="(value, index) in list_san_pham" :key="index">
                        <div class="col-lg-4 col-md-6 mt-3 d-flex">
                            <router-link :to="'/chi-tiet-dong-ho/' + value.id"
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

import axios from 'axios';
export default {
    props: ['slug_danh_muc'],
    data() {
        return {
            id_danh_muc: null,
            list_san_pham: [],
        }
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
            // Gọi API ánh xạ slug → id
            axios.get('http://127.0.0.1:8000/api/slug-to-id/' + slug)
                .then((res) => {
                    if (res.data.status) {
                        this.id_danh_muc = res.data.data.id; // id từ slug
                        return axios.get('http://127.0.0.1:8000/api/san-pham-tu-danh-muc/' + this.id_danh_muc);
                    } else {
                        throw new Error(res.data.message);
                    }
                })
                .then((res) => {
                    this.list_san_pham = res.data.data;
                })
                .catch((err) => {
                    this.$toast.error('Không tìm thấy danh mục.');
                    this.$router.push('/');
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