<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5><b>DANH SÁCH KHÁCH HÀNG</b></h5>
                    </div>
                    <div class="input-group mt-3 w-100">
                        <input v-model="tim_kiem.noi_dung_tim" @keyup.enter="timKiem" type="text"
                            class="form-control search-control border border-2 border-secondary"
                            placeholder="Search...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                class="bx bx-search"></i></span>
                        <button class="btn btn-outline-secondary" style="border-color: dimgray;" type="button"
                            id="button-addon2" v-on:click="timKiem()">Tìm Kiếm</button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Họ Và Tên</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Tình Trạng</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_khach_hang" :key="index">
                                <tr class="align-middle">
                                    <th class="text-center">{{ index + 1 }}</th>
                                    <td class="text-center">{{ value.ho_va_ten }}</td>
                                    <td class="text-center">{{ value.email }}</td>
                                    <td class="text-center">{{ value.so_dien_thoai }}</td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="changeTrangThai(value)" v-if="value.is_block == 0"
                                            class="btn btn-success">Hoạt Động</button>
                                        <button v-on:click="changeTrangThai(value)" v-else class="btn btn-danger">Tạm
                                            Dừng</button>
                                    </td>
                                    <td class="text-center">
                                        <i data-bs-toggle="modal" data-bs-target="#delModal" v-on:click="delete_khach_hang = value"
                                            class="fa-solid fa-trash fa-2xl" style="color: red;"></i>
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
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn xóa tài khoản này không?</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaTaiKhoan()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
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
            list_khach_hang: [],
            delete_khach_hang: {},
            tim_kiem: {},
        }
    },
    mounted() {
        this.loadKhachHang();
    },
    methods: {
        loadKhachHang() {
            axios.get('http://127.0.0.1:8000/api/admin/khach-hang/data', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_khach_hang = res.data.data;
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

        xoaTaiKhoan() {
            axios
                .post('http://127.0.0.1:8000/api/admin/khach-hang/delete', this.delete_khach_hang, {
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
        timKiem() {
            axios
                .post("http://127.0.0.1:8000/api/admin/khach-hang/tim-kiem", this.tim_kiem, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status == false) {
                        toaster.error(res.data.message)
                    }
                    this.list_khach_hang = res.data.data;
                });
        },
    }
}
</script>
<style></style>