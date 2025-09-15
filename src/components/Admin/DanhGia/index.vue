<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <h5><b>DANH SÁCH ĐÁNH GIÁ</b></h5>
                    </div>
                    <div class="input-group mt-2 w-100">
                        <input v-model="keyword" @keyup.enter="timKiemDanhGia" type="text"
                            class="form-control search-control border border-2 border-secondary"
                            placeholder="Search...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                class="bx bx-search"></i></span>
                        <button @click="timKiemDanhGia" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">Tìm Kiếm</button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Tên Khách Hàng</th>
                                <th>Sao</th>
                                <th>Nội Dung</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_danh_gia" :key="index">
                                <tr class="align-middle">
                                    <th class="text-center">{{ index + 1 }}</th>
                                    <td class="text-center">{{ value.ten_san_pham }}</td>
                                    <td class="text-center">{{ value.khach_hang?.ho_va_ten }}</td>
                                    <td class="text-center">
                                        <span v-for="i in 5" :key="i">
                                            <i
                                                :class="i <= value.so_sao ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'"></i>
                                        </span>
                                    </td>
                                    <td class="text-center">{{ value.noi_dung }}</td>
                                    <td class="text-center">
                                        <i data-bs-toggle="modal" data-bs-target="#delModal"
                                            v-on:click="delete_danh_gia = value" class="fa-solid fa-trash fa-2xl me-4"
                                            style="color: red;"></i>
                                        <i class="fa-solid fa-reply fa-2xl" style="color: green; cursor:pointer"
                                            data-bs-toggle="modal" data-bs-target="#replyModal"
                                            @click="chonDanhGia(value)"></i>

                                    </td>
                                </tr>
                            </template>

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
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Đánh Giá</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn xóa đánh giá này không?</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaDanhGia()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="replyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Phản Hồi Đánh Giá</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <textarea v-model="phanHoi.noi_dung" class="form-control" rows="3"
                        placeholder="Nhập phản hồi..."></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="guiPhanHoi()" data-bs-dismiss="modal">
                        Gửi
                    </button>
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
            list_danh_gia: [],
            delete_danh_gia: {},
            phanHoi: { id: null, noi_dung: '' },
            keyword: "",
        }
    },
    mounted() {
        this.loadDanhGia();
    },
    methods: {
        chonDanhGia(value) {
            this.phanHoi.id = value.id;
            this.phanHoi.noi_dung = value.phan_hoi || '';
        },
        guiPhanHoi() {
            axios.post(`http://127.0.0.1:8000/api/admin/danh-gia/${this.phanHoi.id}/phan-hoi`, {
                phan_hoi: this.phanHoi.noi_dung
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
                .catch(() => {
                    this.$toast.error('Lỗi phản hồi đánh giá');
                });
        },
        timKiemDanhGia() {
            axios.post("http://127.0.0.1:8000/api/admin/danh-gia/tim-kiem", {
                keyword: this.keyword
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_danh_gia = res.data.data;
                    } else {
                        this.$toast.error("Không tìm thấy đánh giá phù hợp");
                    }
                })
                .catch(() => {
                    this.$toast.error("Có lỗi xảy ra khi tìm kiếm");
                });
        },
        loadDanhGia() {
            axios.get('http://127.0.0.1:8000/api/admin/danh-gia/data', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_danh_gia = res.data.data;
                    } else {
                        this.$toast.error(res.data.message);
                        this.$router.push('/');
                    }
                })
                .catch(() => {
                    this.$toast.error('Lỗi kết nối đến server.');
                    this.$router.push('/');
                });
        },
        changeTrangThai(value) {
            axios
                .post('http://127.0.0.1:8000/api/admin/khach-hang/doi-trang-thai', value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadKhachHang();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        xoaDanhGia() {
            axios.post('http://127.0.0.1:8000/api/admin/danh-gia/delete', this.delete_danh_gia, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.loadDanhGia();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                })
        },

    }
}
</script>
<style></style>