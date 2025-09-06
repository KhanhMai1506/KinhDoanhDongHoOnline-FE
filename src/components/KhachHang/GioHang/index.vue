<template>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="d-lg-flex align-items-center mb-4 gap-3">
                            <div class="position-relative">
                                <input v-model="tu_khoa" type="text"
                                    class="form-control ps-5 radius-30 border border-1 border-secondary"
                                    placeholder="Search Order"> <span
                                    class="position-absolute top-50 product-show translate-middle-y"><i
                                        class="bx bx-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <input class="form-check-input me-3" type="checkbox" value="" v-on:change="doiCheck()"
                                aria-label="..."><b>Chọn Tất
                                Cả</b>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="table-light">
                            <tr>
                                <th></th>
                                <th class="text-center text-nowrap">#</th>
                                <th class="text-center text-nowrap">Hình Ảnh</th>
                                <th class="text-nowrap">Sản Phẩm</th>
                                <th class="text-center text-nowrap">Đơn Giá</th>
                                <th class="text-center text-nowrap">Số Lượng</th>
                                <th class="text-center text-nowrap">Thành Tiền</th>
                                <th class="text-center text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in filterGioHang" :key="index">
                                <td class="text-center align-middle">
                                    <input v-model="value.dang_chon" type="checkbox" @change="tinhTongTien"
                                        class="form-check-input" />
                                </td>
                                <td class="text-center align-middle">
                                    <h6 class="mb-0 font-14"><b>{{ index + 1 }}</b></h6>
                                </td>
                                <td class="text-wrap text-center align-middle">
                                    <img :src="value.hinh_anh" style="width: 50px; height: auto;" />
                                </td>
                                <td class="text-wrap align-middle">{{ value.ten_san_pham }}</td>
                                <td class="text-end align-middle">{{ formatCurrency(value.don_gia) }}</td>
                                <td style="width: 140px;" class="align-middle">
                                    <div class="input-group input-spinner">
                                        <button @click="tru(value)" class="btn btn-white" type="button">−</button>
                                        <input v-model="value.so_luong" @change="capNhat(value)" type="text"
                                            class="form-control text-center">
                                        <button @click="cong(value)" class="btn btn-white" type="button">+</button>
                                    </div>
                                </td>
                                <td class="text-end align-middle">{{ formatCurrency(value.thanh_tien) }}</td>
                                <td class="text-center align-middle">
                                    <button @click="xoaGioHang(value)" class="btn">
                                        <i class="fa-solid fa-trash text-danger"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />
                <div class="row">
                    <div class="col-6 d-flex align-items-center">
                        <p><b>Tổng tiền: </b>
                            <span class="text-danger">{{ formatCurrency(tong_tien) }}</span>
                        </p>
                    </div>
                    <div class="col-6 text-end">
                        <a @click="diThanhToan" class="btn btn-danger">
                            <i class="fa-solid fa-cart-shopping"></i> Mua Hàng
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            list_gio_hang: [],
            tong_tien: 0,
            tu_khoa: "",
            checked: false,
        };
    },
    mounted() {
        this.layDataGioHang();
    },
    methods: {
        notifyGioHangUpdated() {
            window.dispatchEvent(new Event("gioHangUpdated"));
        },
        diThanhToan() {
            const spDaChon = this.list_gio_hang.filter(sp => sp.dang_chon);

            if (spDaChon.length === 0) {
                this.$toast.error("Vui lòng chọn sản phẩm cần thanh toán!");
                return;
            }

            localStorage.setItem("sp_thanh_toan", JSON.stringify(spDaChon));
            this.$router.push("/khach-hang/thanh-toan");
        },

        layDataGioHang() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/gio-hang/data", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then((res) => {
                this.list_gio_hang = res.data.data.map(sp => {
                    const so_luong = Number(sp.so_luong) || 0;
                    const don_gia = Number(sp.don_gia) || 0;

                    return {
                        ...sp,
                        so_luong: so_luong,
                        don_gia: don_gia,
                        thanh_tien: so_luong * don_gia,
                        dang_chon: false,
                        so_luong_ton: sp.so_luong_ton
                    };
                });
                this.tinhTongTien();
            });
        },

        tinhTongTien() {
            this.tong_tien = this.list_gio_hang
                .filter(sp => sp.dang_chon)
                .reduce((sum, sp) => sum + (Number(sp.thanh_tien) || 0), 0);
        },

        doiCheck() {
            this.checked = !this.checked;
            this.list_gio_hang.forEach(sp => sp.dang_chon = this.checked);
            this.tinhTongTien();
        },

        xoaGioHang(payload) {
            axios.post("http://127.0.0.1:8000/api/khach-hang/gio-hang/delete", payload, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then((res) => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);
                    this.layDataGioHang();
                    this.notifyGioHangUpdated();
                } else {
                    this.$toast.error(res.data.message);
                }
            });
        },

        capNhat(value) {
            if (value.so_luong > value.so_luong_ton) {
                this.$toast.warning(`Sản phẩm chỉ còn ${value.so_luong_ton} trong kho!`);
                value.so_luong = value.so_luong_ton;
            }

            // Nếu nhập bé hơn 1 thì đưa về 1
            if (value.so_luong < 1) {
                this.$toast.warning("Số lượng tối thiểu là 1!");
                value.so_luong = 1;
            }

            value.thanh_tien = value.so_luong * value.don_gia;

            axios.post("http://127.0.0.1:8000/api/khach-hang/gio-hang/update", {
                id: value.id,
                so_luong: value.so_luong
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then(() => {
                this.layDataGioHang();
                this.notifyGioHangUpdated();
            });
        },

        tru(value) {
            if (value.so_luong > 1) {
                value.so_luong--;
                value.thanh_tien = value.so_luong * value.don_gia;
                this.capNhat(value);
            } else {
                this.$toast.warning("Số lượng tối thiểu là 1!");
            }
        },

        cong(value) {
            if (value.so_luong < value.so_luong_ton) {
                value.so_luong++;
                value.thanh_tien = value.so_luong * value.don_gia;
                this.capNhat(value);
            } else {
                this.$toast.warning("Số lượng đã đạt tối đa tồn kho!");
            }
        },

        formatCurrency(value) {
            if (isNaN(value)) return "0 đ";
            return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
        },

    },
    computed: {
        filterGioHang() {
            if (!this.tu_khoa) return this.list_gio_hang;
            return this.list_gio_hang.filter(sp =>
                sp.ten_san_pham.toLowerCase().includes(this.tu_khoa.toLowerCase())
            );
        },
    },
};
</script>
<style></style>