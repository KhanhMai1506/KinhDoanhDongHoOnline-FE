<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <h4>Lịch Sử Đơn Hàng</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Mã Đơn Hàng</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Tên Người Nhận</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Tổng Tiền Thanh Toán</th>
                                <th>Phương Thức</th>
                                <th>Thanh Toán</th>
                                <th>Tình Trạng Đơn Hàng</th>
                                <th>Hủy Đơn Hàng</th>
                                <th>Xác Nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v, k) in list" :key="k" class="align-middle">
                                <th>{{ k + 1 }}</th>
                                <td class="text-center">{{ v.ma_don_hang }}</td>
                                <td>{{ v.ten_san_pham }}</td>
                                <td>{{ v.ten_nguoi_nhan }}</td>
                                <td>{{ v.so_dien_thoai }}</td>
                                <td class="text-center">{{ v.dia_chi }}</td>
                                <td class="text-end">{{ formatVND(v.thanh_tien) }}</td>
                                <td class="text-center">
                                    <button v-if="v.phuong_thuc == 0" class="btn btn-success w-100">Thanh Toán
                                        Online</button>
                                    <button v-else class="btn btn-info w-100">Thanh Toán COD</button>
                                </td>
                                <td class="text-center">
                                    <!-- Đã thanh toán -->
                                    <button v-if="v.is_thanh_toan == 1" class="btn btn-success w-100">
                                        Đã Thanh Toán
                                    </button>

                                    <!-- Chưa thanh toán + MoMo => cho phép bấm để thanh toán lại -->
                                    <button v-else class="btn btn-danger w-100">
                                        Chưa Thanh Toán
                                    </button>
                                </td>
                                <td class="text-center">
                                    <button v-if="v.tinh_trang == 0" class="btn btn-warning w-100">Chờ Xử Lý</button>
                                    <button v-else-if="v.tinh_trang == 1" class="btn btn-success w-100">Đã Xác
                                        Nhận</button>
                                    <button v-else-if="v.tinh_trang == 2" class="btn btn-info w-100">Đang Vận
                                        Chuyển</button>
                                    <button v-else-if="v.tinh_trang == 3" class="btn btn-primary w-100">Đã Giao</button>
                                    <button v-else class="btn btn-danger w-100">Đã Hủy</button>
                                </td>
                                <td class="text-center">
                                    <i :data-bs-toggle="v.tinh_trang != 3 ? 'modal' : null"
                                        :data-bs-target="v.tinh_trang != 3 ? '#delModal' : null"
                                        @click="v.tinh_trang != 3 ? (delete_don_hang = v) : null"
                                        class="fa-solid fa-trash fa-2xl"
                                        :style="{ color: v.tinh_trang != 3 ? 'red' : 'gray', cursor: v.tinh_trang != 3 ? 'pointer' : 'not-allowed' }">
                                    </i>
                                </td>

                                <td class="text-center">
                                    <button v-if="v.tinh_trang != 2" disabled class="btn btn-outline-primary w-100">Xác
                                        nhận đã giao</button>
                                    <button v-else v-on:click="xacNhanDaGiao(v)"
                                        class="btn btn-outline-primary w-100">Xác nhận đã giao</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Hủy Đơn Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn hủy đơn hàng này không?</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="huyDonHang()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            list: [],
            delete_don_hang: {},
        }
    },
    mounted() {
        this.layData();
    },
    methods: {
        layData() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/lich-su-don-hang", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list = res.data.data;
                })
        },
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        huyDonHang() {
            axios.put(`http://127.0.0.1:8000/api/khach-hang/huy-don-hang/${this.delete_don_hang.id}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                }
            })
                .then((res) => {
                    this.$toast.success(res.data.message);
                    this.layData(); // load lại danh sách
                })
                .catch((err) => {
                    if (err.response) {
                        this.$toast.error(err.response.data.message);
                    } else {
                        this.$toast.error("Có lỗi xảy ra khi hủy đơn hàng!");
                    }
                });
        },
        xacNhanDaGiao(donHang) {
            axios.put(`http://127.0.0.1:8000/api/khach-hang/xac-nhan-da-giao/${donHang.id}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                }
            })
                .then((res) => {
                    this.$toast.success(res.data.message || "Xác nhận đã giao thành công!");
                    this.layData(); // load lại danh sách
                })
                .catch((err) => {
                    if (err.response) {
                        this.$toast.error(err.response.data.message);
                    } else {
                        this.$toast.error("Có lỗi xảy ra khi xác nhận!");
                    }
                });
        }

    },
}
</script>
<style></style>