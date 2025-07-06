<template>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="d-lg-flex align-items-center mb-4 gap-3">
                            <div class="position-relative">
                                <input type="text" class="form-control ps-5 radius-30 border border-1 border-secondary"
                                    placeholder="Search Order"> <span
                                    class="position-absolute top-50 product-show translate-middle-y"><i
                                        class="bx bx-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <input class="form-check-input me-3" type="checkbox" value="" v-on:change="doiCheck()" aria-label="..."><b>Chọn Tất
                                Cả</b>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>
                                </th>
                                <th class="text-center text-nowrap">#</th>
                                <th class="text-center text-nowrap">Hình Ảnh</th>
                                <th class="text-nowrap">Sản Phẩm</th>
                                <th class="text-center text-nowrap">Đơn Giá</th>
                                <th class="text-center text-nowrap">Số Lượng</th>
                                <th class="text-center text-nowrap">Thành Tiền</th>
                                <th class="text-center text-nowrap">Ghi Chú</th>
                                <th class="text-center text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in list_gio_hang" :key="index">
                                <td class="align-middle text-center">
                                    <input v-model="value.dang_chon" @change="tinhTongTien()"
                                        v-on:click="doiDangChon(value)" class="form-check-input me-3"
                                        :checked="value.dang_chon" type="checkbox" aria-label="...">
                                </td>
                                <td class="align-middle">
                                    <h6 class="mb-0 font-14">{{ index + 1 }}</h6>
                                </td>
                                <td class="text-wrap text-center align-middle">
                                    <img v-bind:src="value.hinh_anh" style="width: 50px; height: auto;" alt="">
                                </td>
                                <td class="text-wrap align-middle">{{ value.ten_san_pham }}</td>
                                <td class="text-end align-middle">{{ formatCurrency(value.don_gia) }}</td>
                                <td style="width: 140px;" class="align-middle">
                                    <div class="input-group input-spinner d-flex justify-content-center flex-row"
                                        style="flex-wrap: nowrap;">
                                        <button v-on:click="tru(value)" class="btn btn-white" type="button">−</button>
                                        <input v-on:change="capNhat(value)" type="text" v-model="value.so_luong"
                                            class="form-control text-center">
                                        <button v-on:click="cong(value)" class="btn btn-white" type="button">+</button>
                                    </div>
                                </td>
                                <td class="text-end align-middle">{{ formatCurrency(value.thanh_tien) }}</td>
                                <td class="text-center align-middle">
                                    <input v-on:change="capNhat(value)" v-model="value.ghi_chu" type="text"
                                        class="form-control">
                                </td>
                                <td class="text-center align-middle">
                                    <button v-on:click="xoaGioHang(value)" class="btn"><i
                                            class="fa-solid fa-trash text-danger"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <div class="row mt-3">
                    <div class="col-lg-8 d-flex align-items-center text-nowrap gap-2">
                        <label class="me-2" style="font-size: 16px;"><b>Địa Chỉ: </b></label>
                        <select v-model="id_dia_chi" class="form-select w-100">
                            <template v-for="(value, index) in list_dia_chi" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_nguoi_nhan }} - {{ value.so_dien_thoai }} -
                                    {{ value.dia_chi }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="col-lg-4 d-flex align-items-center text-nowrap">
                        <div style="font-size: 16px;">
                            <i class="fa-solid fa-money-bill-transfer fa-xl me-2"></i><b>Tổng Tiền Thanh Toán:</b>
                            {{ formatCurrency(tong_tien) }}
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row mt-4">
                    <div class="col-12 text-nowrap d-flex align-items-end">
                        <div class="ms-auto">
                            <a class="btn btn-danger radius-30 mt-2 mt-lg-0"><i
                                    class="fa-solid fa-cart-shopping"></i>Mua Hàng</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            list_gio_hang: [],
            list_dia_chi: [],
            tong_tien: 0,
            id_dia_chi: null,
            checked: 0,
        }
    },
    mounted() {
        this.layDataGioHang();
        this.layDiaChi();
    },
    methods: {
        doiCheck() {
            if (this.checked) {
                this.checked = 0
                this.list_gio_hang.forEach((value) => {
                    value.dang_chon = 0;
                });
            } else {
                this.checked = 1
                this.list_gio_hang.forEach((value) => {
                    value.dang_chon = 1;
                });
            }
            this.tinhTongTien();
        },
        doiDangChon(payload) {
            this.list_gio_hang.forEach((value, key) => {
                if (value.id == payload.id) {
                    value.dang_chon = !value.dang_chon;
                }
            });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },
        tinhTongTien() {
            var tong = 0;
            this.list_gio_hang.forEach((value, key) => {
                if (value.dang_chon == 1) {
                    tong += value.thanh_tien;
                }
            });
            this.tong_tien = tong;
        },
        layDataGioHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/gio-hang/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list_gio_hang = res.data.data;
                    // this.list_gio_hang.forEach((value) => {
                    //     value.dang_chon = 0;
                    // });
                    this.list_gio_hang.forEach((value, key) => {
                        if (value.id == this.$route.params.id_chi_tiet) {
                            value.dang_chon = 1;
                        }
                    });
                    this.list_gio_hang = [...this.list_gio_hang];
                    this.tinhTongTien();
                })
        },
        layDiaChi() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list_dia_chi = res.data.data;
                });
        },
        xoaGioHang(payload) {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/delete", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataGioHang();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        capNhat(payload) {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/gio-hang/update", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataGioHang();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        tru(value) {
            value.so_luong = value.so_luong * 1 - 1;
            if (value.so_luong < 1) {
                var message = "Số lượng mua tối thiểu phải là 1 sản phẩm."
                var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + message + '<span>';
                this.$toast.warning(thong_bao);
                value.so_luong = 1;
                this.capNhat(value)
            } else {
                value.thanh_tien = value.so_luong * value.don_gia;
                this.capNhat(value);
                this.tinhTongTien();
            }
        },
        cong(value) {
            value.so_luong = value.so_luong * 1 + 1;
            value.thanh_tien = value.so_luong * value.don_gia;
            this.capNhat(value);
            this.tinhTongTien();
        },
    },
}
</script>

<style></style>
