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

                <img :src="san_pham.hinh_anh" alt="Ảnh sản phẩm" class="img-fluid border"
                    style="height: 400px; object-fit: contain;">
            </div>

            <!-- Thông tin sản phẩm -->
            <div class="col-md-6">
                <h4><b>{{ san_pham.ten_san_pham }}</b></h4>
                <h5 class="mt-3 text-danger"><b>{{ formatCurrency(san_pham.gia_ban) }}</b></h5>
                <p class="mt-3 text-muted">{{ san_pham.mo_ta_ngan }}</p>

                <!-- Số lượng -->
                <div class="d-flex align-items-center my-3">
                    <span class="me-2">Số lượng:</span>
                    <button v-on:click="tru()" class="btn btn-outline-secondary btn-sm"
                        @click="decreaseQuantity">-</button>
                    <input v-on:change="doi()" type="text" class="form-control text-center mx-2" style="width: 60px;"
                        v-model="san_pham.so_luong_mua" readonly>
                    <button v-on:click="cong()" class="btn btn-outline-secondary btn-sm"
                        @click="increaseQuantity">+</button>
                </div>

                <!-- Nút hành động -->
                <div class="d-flex gap-3 mt-4">
                    <button class="btn btn-dark flex-fill">Mua Ngay</button>
                    <button v-on:click="themGioHang()" class="btn btn-outline-dark flex-fill">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        </div>

        <!-- Sản phẩm đề xuất -->
        <div class="mt-5">
            <h5>SẢN PHẨM ĐỀ XUẤT</h5>
            <div class="row row-cols-2 row-cols-md-4 g-3 mt-2">
                <template v-for="(value, index) in san_pham_de_xuat" :key="index">
                    <div class="col">
                        <router-link :to="'/chi-tiet-dong-ho/' + value.id" class="text-decoration-none text-dark">
                            <div class="card h-100">
                                <img :src="value.hinh_anh" class="card-img-top" style="height: 180px; object-fit: contain;">
                                <div class="card-body">
                                    <h6 class="card-title">{{ value.ten_san_pham }}</h6>
                                    <p class="card-text">{{ formatCurrency(value.gia_ban) }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<style>
</style>

<script>

import axios from 'axios';
export default {
    props: ['id_san_pham'],
    data() {
        return {
            id_san_pham: this.$route.params.id_san_pham,
            san_pham: {},
            san_pham_de_xuat: []
        }
    },
    mounted() {
        this.layThongTinSanPham();
        this.laySanPhamDeXuat(this.id_san_pham);
    },
    methods: {
        layThongTinSanPham() {
            axios
                .get('http://127.0.0.1:8000/api/chi-tiet-san-pham/' + this.id_san_pham)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham = res.data.data;
                        this.san_pham.so_luong_mua = 1;
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/');
                    }
                })
        },
        laySanPhamDeXuat(id_san_pham) {
            axios.get('http://127.0.0.1:8000/api/san-pham-de-xuat/' + this.id_san_pham)
                .then(res => {
                    if (res.data.status) {
                        this.san_pham_de_xuat = res.data.data;
                    }
                });
        },
        doi() {
            if (this.san_pham.so_luong_mua < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
                this.san_pham.so_luong_mua = 1;
            } else if (this.san_pham.so_luong_mua > this.san_pham.so_luong) {
                this.san_pham.so_luong_mua = this.san_pham.so_luong;
                var message = "Số lượng mua tối đa chỉ được " + this.san_pham.so_luong + " sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
            }
        },
        tru() {
            this.san_pham.so_luong_mua = this.san_pham.so_luong_mua * 1 - 1;
            if (this.san_pham.so_luong_mua < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
                this.san_pham.so_luong_mua = 1;
            }
        },
        cong() {
            this.san_pham.so_luong_mua = this.san_pham.so_luong_mua * 1 + 1;
            if (this.san_pham.so_luong_mua > this.san_pham.so_luong) {
                this.san_pham.so_luong_mua = this.san_pham.so_luong;
                var message = "Số lượng mua tối đa chỉ được " + this.san_pham.so_luong + " sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
            }
        },
        themGioHang() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/create", this.san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                })
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