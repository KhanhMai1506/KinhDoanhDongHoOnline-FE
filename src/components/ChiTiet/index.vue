<template>
    <div class="container my-4">
        <!-- Breadcrumb -->
        <div class="mb-3 text-muted">
            <small>Trang chủ > Sản phẩm > Chi tiết</small>
        </div>

        <div class="row">
            <!-- Ảnh sản phẩm -->
            <div class="col-md-6">
                <img :src="san_pham.hinh_anh" alt="Ảnh sản phẩm" class="img-fluid border"
                    style="height: 400px; object-fit: contain;" />
            </div>

            <!-- Thông tin sản phẩm -->
            <div class="col-md-6">
                <h4><b>{{ san_pham.ten_san_pham }}</b></h4>
                <h5 class="mt-3 text-danger">
                    <b>{{ formatCurrency(san_pham.gia_ban) }}</b>
                </h5>
                <p class="mt-3 text-muted">{{ san_pham.mo_ta_ngan }}</p>

                <!-- Số lượng -->
                <div class="input-group input-spinner d-flex justify-content-center flex-row"
                    style="flex-wrap: nowrap; width: 120px;">
                    <button @click="tru" class="btn btn-white" type="button">−</button>
                    <input @change="doi" type="text" v-model="san_pham.so_luong" class="form-control text-center" />
                    <button @click="cong" class="btn btn-white" type="button">+</button>
                </div>
                <small class="text-muted">Còn lại: {{ san_pham.so_luong_ton }}</small>

                <!-- Nút hành động -->
                <div class="d-flex gap-3 mt-4">
                    <button @click="muaNgay" class="btn btn-dark flex-fill">
                        Mua Ngay
                    </button>
                    <button @click="themGioHang" class="btn btn-outline-dark flex-fill">
                        Thêm Vào Giỏ Hàng
                    </button>
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
                                <img :src="value.hinh_anh" class="card-img-top"
                                    style="height: 180px; object-fit: contain;" />
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

<script>
import axios from "axios";

export default {
    props: ["id_san_pham"],
    data() {
        return {
            id_san_pham: this.$route.params.id_san_pham,
            san_pham: {},
            san_pham_de_xuat: [],
        };
    },
    beforeRouteUpdate(to, from, next) {
        this.id_san_pham = to.params.id_san_pham;
        this.layThongTinSanPham();
        this.laySanPhamDeXuat();
        next();
    },
    mounted() {
        this.layThongTinSanPham();
        this.laySanPhamDeXuat();
    },
    methods: {
        // Lấy chi tiết sản phẩm
        layThongTinSanPham() {
            axios
                .get("http://127.0.0.1:8000/api/chi-tiet-san-pham/" + this.id_san_pham)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham = res.data.data;
                        this.san_pham.so_luong_ton = this.san_pham.so_luong; // số lượng tồn trong DB
                        this.san_pham.so_luong = 1; // mặc định khi mua
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push("/");
                    }
                });
        },

        // Sản phẩm đề xuất
        laySanPhamDeXuat() {
            axios
                .get("http://127.0.0.1:8000/api/san-pham-de-xuat/" + this.id_san_pham)
                .then((res) => {
                    if (res.data.status) {
                        this.san_pham_de_xuat = res.data.data;
                    }
                });
        },

        // Kiểm tra số lượng nhập
        doi() {
            if (this.san_pham.so_luong < 1) {
                this.$toast.warning("Số lượng tối thiểu là 1");
                this.san_pham.so_luong = 1;
            } else if (this.san_pham.so_luong > this.san_pham.so_luong_ton) {
                this.san_pham.so_luong = this.san_pham.so_luong_ton;
                this.$toast.warning(
                    "Số lượng tối đa: " + this.san_pham.so_luong_ton
                );
            }
        },
        tru() {
            this.san_pham.so_luong--;
            if (this.san_pham.so_luong < 1) {
                this.$toast.warning("Số lượng tối thiểu là 1");
                this.san_pham.so_luong = 1;
            }
        },
        cong() {
            this.san_pham.so_luong++;
            if (this.san_pham.so_luong > this.san_pham.so_luong_ton) {
                this.san_pham.so_luong = this.san_pham.so_luong_ton;
                this.$toast.warning(
                    "Số lượng tối đa: " + this.san_pham.so_luong_ton
                );
            }
        },

        // Thêm vào giỏ hàng
        themGioHang() {
            axios
                .post(
                    "http://127.0.0.1:8000/api/khach-hang/gio-hang/create",
                    {
                        id: this.san_pham.id,
                        so_luong: this.san_pham.so_luong,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token_khach_hang"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        window.dispatchEvent(new Event("gioHangUpdated"));
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push("/khach-hang/dang-nhap");
                    }
                });
        },

        // Mua ngay
        muaNgay() {
            const sp = {
                id: this.san_pham.id,
                ten_san_pham: this.san_pham.ten_san_pham,
                hinh_anh: this.san_pham.hinh_anh,
                gia_ban: this.san_pham.gia_ban,
                so_luong: this.san_pham.so_luong,
            };
            localStorage.setItem("mua_ngay", JSON.stringify(sp));
            this.$router.push({ path: "/khach-hang/thanh-toan", query: { mode: "mua-ngay" } });
        },

        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
        },
    },
};
</script>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
