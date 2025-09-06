<template>
    <div class="container my-4">
        <h3><b>Thanh Toán</b></h3>

        <!-- Thông tin đơn hàng -->
        <div class="card my-3">
            <div class="card-header">
                <h6><b>Thông Tin Đơn Hàng</b></h6>
            </div>
            <div class="card-body p-3">
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th class="text-center">Số lượng</th>
                                <th class="text-end">Giá</th>
                                <th class="text-end">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="san_phams.length === 0">
                                <td colspan="4" class="text-center text-muted">Giỏ hàng trống</td>
                            </tr>
                            <tr v-for="(sp, index) in san_phams" :key="index">
                                <td class="text-wrap align-middle">
                                    <div class="d-flex align-items-center">
                                        <img :src="sp.hinh_anh" alt="Ảnh sản phẩm"
                                            style="width: 60px; height: 60px; object-fit: contain;" class="me-2" />
                                        <span>{{ sp.ten_san_pham }}</span>
                                    </div>
                                </td>
                                <td class="text-center align-middle">{{ sp.so_luong }}</td>
                                <td class="text-end  align-middle">{{ formatCurrency(sp.gia_ban) }}</td>
                                <td class="text-end  align-middle fw-bold">
                                    {{ formatCurrency(sp.so_luong * sp.gia_ban) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-8 d-flex align-items-center text-nowrap gap-2">
                        <label class="me-2" style="font-size: 16px;"><b>Địa Chỉ: </b></label>
                        <select v-model="id_dia_chi" class="form-select w-100">
                            <template v-for="(value, index) in list_dia_chi" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_nguoi_nhan }} - {{ value.so_dien_thoai }} -
                                    {{ value.dia_chi }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="col-lg-4 d-flex flex-row align-items-center text-nowrap">
                        <label class="me-2"><i class="fa-xl fa-solid fa-ticket text-danger me-2"></i><b>Voucher:
                            </b></label>
                        <div class="input-group">
                            <input v-model="code" type="text" class="form-control" placeholder="Nhập mã giảm giá">
                            <button v-on:click="apDungCode()" class="btn btn-outline-secondary" type="button"
                                id="button-addon2">Áp Dụng</button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row mt-4">
                    <div class="col-6">
                        <div class="ms-auto">
                            <p><b>Tổng tiền sản phẩm:</b> {{ formatCurrency(tinhTong()) }}</p>
                            <p><b>Số tiền giảm:</b> {{ formatCurrency(tien_giam) }}</p>
                            <p class="fw-bold"><b>Tổng thanh toán: </b>
                                <span class="text-danger">{{ formatCurrency(tinhTong() - tien_giam) }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-6 text-start text-nowrap d-flex align-items-end">
                        <div class="ms-auto">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="MOMO" v-model="phuong_thuc"
                                    id="momo" />
                                <label class="form-check-label" for="momo">Thanh toán bằng Ví MoMo</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="COD" v-model="phuong_thuc"
                                    id="cod" />
                                <label class="form-check-label" for="cod">Thanh toán khi nhận hàng</label>
                            </div>
                            <div class="text-end">
                                <button class="btn btn-primary" @click="xacNhanThanhToan">
                                    <i class="fa-solid fa-credit-card"></i> Thanh Toán
                                </button>
                            </div>
                        </div>
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
            san_phams: [],
            phuong_thuc: "COD",
            isMuaNgay: false,
            list_dia_chi: [],
            id_dia_chi: null,
            code: "",
            tien_giam: 0,
        };
    },
    mounted() {
        if (this.$route.query.mode === "mua-ngay") {
            this.isMuaNgay = true;
            const sp = JSON.parse(localStorage.getItem("mua_ngay"));
            if (sp) {
                this.san_phams = [sp];
            }
        } else {
            this.isMuaNgay = false;
            this.layGioHang();
        }
        this.layDiaChi();
    },
    methods: {
        layDiaChi() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/dia-chi/data", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then(res => {
                this.list_dia_chi = res.data.data;
            });
        },
        apDungCode() {
            axios.post("http://127.0.0.1:8000/api/ma-giam-gia/kiem-tra", { code: this.code })
                .then(res => {
                    if (res.data.status) {
                        const coupon = res.data.coupon;
                        if (this.tinhTong() >= coupon.don_hang_toi_thieu) {
                            this.tien_giam = coupon.loai_giam_gia == 1
                                ? coupon.so_giam_gia
                                : Math.min(coupon.so_giam_gia * this.tinhTong() / 100, coupon.so_tien_toi_da);
                            this.$toast.success("Áp dụng mã giảm giá thành công!");
                        } else {
                            this.$toast.warning("Đơn hàng chưa đủ điều kiện!");
                            this.tien_giam = 0;
                        }
                    } else {
                        this.$toast.error(res.data.message);
                        this.tien_giam = 0;
                    }
                });
        },
        layGioHang() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/gio-hang/data", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        this.san_phams = res.data.data;
                    }
                });
        },
        tinhTong() {
            return this.san_phams.reduce(
                (sum, sp) => sum + sp.so_luong * sp.gia_ban,
                0
            );
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
        async xacNhanThanhToan() {
            if (!this.id_dia_chi) {
                this.$toast.error("Vui lòng chọn địa chỉ!");
                return;
            }
            let data = {
                tong_tien: this.tinhTong() - this.tien_giam,
                phuong_thuc: this.phuong_thuc === "MOMO" ? 0 : 1,
                id_dia_chi: this.id_dia_chi,
                is_mua_ngay: this.isMuaNgay,
                ma_code_giam: this.code,
                so_tien_giam: this.tien_giam,
            };

            // Nếu là mua ngay → gửi thêm thông tin sản phẩm
            if (this.isMuaNgay) {
                const sp = this.san_phams[0];
                data.id_san_pham = sp.id;
                data.so_luong = sp.so_luong;
                data.don_gia = sp.gia_ban;
            }

            try {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/khach-hang/thanh-toan",
                    data,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
                        },
                    }
                );

                if (res.data.status) {
                    if (this.phuong_thuc === "MOMO" && res.data.payUrl) {
                        // Chuyển hướng sang MoMo
                        window.location.href = res.data.payUrl;
                    } else {
                        this.$toast.success("Đặt hàng COD thành công!");
                        this.$router.push("/khach-hang/don-hang");
                    }
                }
            } catch (err) {
                this.$toast.error("Có lỗi xảy ra khi đặt hàng!");
            }
        },
    },
};
</script>
