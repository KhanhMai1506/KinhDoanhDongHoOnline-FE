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
                <!-- Giá sản phẩm -->
                <!-- Giá sản phẩm -->
                <div class="mt-3">
                    <template v-if="san_pham.is_flash_sale == 1">
                        <div class="d-flex align-items-baseline gap-2">
                            <!-- Giá khuyến mãi -->
                            <h4 class="text-danger fw-bold mb-0">
                                {{ formatCurrency(san_pham.gia_khuyen_mai) }}
                            </h4>
                            <!-- Giá gốc -->
                            <span class="text-muted text-decoration-line-through">
                                {{ formatCurrency(san_pham.gia_ban) }}
                            </span>
                            <!-- % giảm -->
                            <span class="badge bg-danger">-{{ san_pham.phan_tram }}%</span>
                        </div>
                    </template>

                    <template v-else>
                        <!-- Chỉ có giá gốc -->
                        <h4 class="text-danger fw-bold">
                            {{ formatCurrency(san_pham.gia_ban) }}
                        </h4>
                    </template>
                </div>


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

        <div class="row">
            <div class="col-lg-6">
                <div class="card p-3 mb-3 mt-5">
                    <p>
                        ⭐ <b style="font-size: 20px;">{{ thong_ke_danh_gia.trung_binh }}</b> / 5
                        ({{ thong_ke_danh_gia.tong }} lượt đánh giá)
                    </p>

                    <div v-for="sao in [5, 4, 3, 2, 1]" :key="sao" class="d-flex align-items-center mb-1">
                        <span class="me-2">{{ sao }} ⭐</span>
                        <div class="progress flex-grow-1 me-2" style="height: 10px;">
                            <div class="progress-bar bg-warning" role="progressbar"
                                :style="{ width: ((thong_ke_danh_gia.theo_sao[sao] || 0) / thong_ke_danh_gia.tong * 100) + '%' }">
                            </div>
                        </div>
                        <small>{{ thong_ke_danh_gia.theo_sao[sao] || 0 }}</small>
                    </div>
                    <div class="text-center" v-if="co_quyen_danh_gia">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#rateModal">
                            Đánh Giá
                        </button>
                    </div>
                    <div v-else class="text-muted text-center">
                        Chỉ khách hàng đã mua sản phẩm mới có thể đánh giá.
                    </div>
                    <hr>
                    <div class="mt-2">
                        <h5>DANH SÁCH ĐÁNH GIÁ</h5>
                        <!-- Danh sách đánh giá -->
                        <div v-if="danh_sach_danh_gia.length" style="font-size: 16px;">
                            <div v-for="(dg, index) in danh_sach_danh_gia" :key="index" class="border-bottom py-2">
                                <small class="text-muted text-middle">{{ dg.khach_hang?.ho_va_ten }} | {{
                                    formatDate(dg.created_at)
                                }}</small>
                                <div class="d-flex align-items-center">
                                    <div class="text-warning">
                                        <span v-for="i in dg.so_sao" :key="i">★</span>
                                        <span v-for="i in (5 - dg.so_sao)" :key="'x' + i">☆</span>
                                    </div>
                                </div>
                                <p class="mb-1">{{ dg.noi_dung }}</p>
                                <div v-if="dg.phan_hoi" class="bg-light p-2 rounded border mt-2">
                                    <small class="text-muted"><b>Phản hồi từ Admin:</b></small>
                                    <p class="mb-0">{{ dg.phan_hoi }}</p>
                                    <small class="text-muted">{{ formatDate(dg.phan_hoi_at) }}</small>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-muted">Chưa có đánh giá nào cho sản phẩm này.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="rateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Viết Đánh Giá</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2 d-flex align-items-center">
                            <label class="me-2 mb-0" style="font-size: 16px;">Số sao:</label>
                            <select v-model="danh_gia.so_sao" class="form-select w-auto">
                                <option v-for="i in 5" :key="i" :value="i">{{ i }} sao</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <textarea v-model="danh_gia.noi_dung" rows="3" class="form-control"
                                placeholder="Nhập nội dung đánh giá..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button @click="guiDanhGia" class="btn btn-info" data-bs-dismiss="modal">Gửi đánh giá</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id_san_pham'],
    data() {
        return {
            id_san_pham: this.$route.params.id_san_pham,
            san_pham: {},
            san_pham_de_xuat: [],
            danh_sach_danh_gia: [],
            danh_gia: {
                so_sao: 5,
                noi_dung: ""
            },
            thong_ke_danh_gia: {
                tong: 0,
                trung_binh: 0,
                theo_sao: {}
            },
            co_quyen_danh_gia: false,
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.id_san_pham = to.params.id_san_pham;
        this.layThongTinSanPham();
        this.laySanPhamDeXuat();
        this.layDanhGia();
        this.layThongKeDanhGia();
        this.checkQuyenDanhGia();
        next();
    },
    mounted() {
        this.layThongTinSanPham();
        this.laySanPhamDeXuat(this.id_san_pham);
        this.layDanhGia();
        this.layThongKeDanhGia();
        this.checkQuyenDanhGia();
    },
    methods: {
        layThongKeDanhGia() {
            axios.get("http://127.0.0.1:8000/api/danh-gia/thong-ke/" + this.id_san_pham)
                .then(res => {
                    if (res.data.status) {
                        this.thong_ke_danh_gia = res.data;
                    }
                });
        },
        checkQuyenDanhGia() {
            axios.get("http://127.0.0.1:8000/api/danh-gia/kiem-tra/" + this.id_san_pham, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                }
            })
                .then(res => {
                    this.co_quyen_danh_gia = res.data.status;
                })
                .catch(() => {
                    this.co_quyen_danh_gia = false;
                });
        },
        formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        },
        layDanhGia() {
            axios.get("http://127.0.0.1:8000/api/danh-gia/" + this.id_san_pham)
                .then(res => {
                    if (res.data.status) {
                        this.danh_sach_danh_gia = res.data.data;
                    }
                });
        },
        guiDanhGia() {
            axios.post("http://127.0.0.1:8000/api/danh-gia/create", {
                id_san_pham: this.id_san_pham,
                ten_san_pham: this.san_pham.ten_san_pham,
                so_sao: this.danh_gia.so_sao,
                noi_dung: this.danh_gia.noi_dung
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                }
            })
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success("Gửi đánh giá thành công!");
                        this.danh_gia.noi_dung = "";
                        this.layDanhGia();
                        this.layThongKeDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },
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
            const donGia = this.san_pham.is_flash_sale == 1
                ? this.san_pham.gia_khuyen_mai
                : this.san_pham.gia_ban;

            const sp = {
                id: this.san_pham.id,
                ten_san_pham: this.san_pham.ten_san_pham,
                hinh_anh: this.san_pham.hinh_anh,
                don_gia: donGia,   // 👉 luôn có don_gia
                so_luong: this.san_pham.so_luong,
            };
            localStorage.setItem("mua_ngay", JSON.stringify(sp));
            this.$router.push({ path: "/khach-hang/thanh-toan", query: { mode: "mua-ngay" } });
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
<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
