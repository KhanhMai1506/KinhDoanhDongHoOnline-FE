<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5><b>DANH SÁCH SẢN PHẨM</b></h5>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themSP">Thêm mới sản
                            phẩm</button>
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
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Hình Ảnh</th>
                                <th class="text-center align-middle">Tên Sản Phẩm</th>
                                <th class="text-center align-middle">Số Lượng</th>
                                <th class="text-center align-middle">Giá Bán</th>
                                <th class="text-center align-middle">Mô Tả</th>
                                <th class="text-center align-middle">Tình Trạng</th>
                                <th class="text-center align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_san_pham" :key="index">
                                <tr>
                                    <th class="align-middle text-center">{{ index + 1 }}</th>
                                    <th class="align-middle text-center">
                                        <img style="max-height: 100px;" v-bind:src="value.hinh_anh" class="img-fluid"
                                            alt="">
                                    </th>
                                    <td class="align-middle text-wrap">{{ value.ten_san_pham }}</td>
                                    <td class="align-middle text-center">{{ value.so_luong }}</td>
                                    <td class="align-middle text-end">{{ formatCurrency(value.gia_ban) }} </td>
                                    <td class="align-middle text-center">
                                        <i v-on:click="mo_ta_ngan = value.mo_ta_ngan"
                                            class="fa-solid fa-newspaper fa-2xl" data-bs-toggle="modal"
                                            data-bs-target="#detail"></i>
                                    </td>
                                    <td class="align-middle text-wrap">
                                        <button v-on:click="chuyenBan(value)" v-if="value.tinh_trang == 1"
                                            class="btn btn-success mb-2 d-block">Đang Bán</button>
                                        <button v-on:click="chuyenBan(value)" v-else
                                            class="btn btn-danger mb-2 d-block">Dừng Bán</button>

                                        <button v-on:click="chuyenNoiBat(value)" v-if="value.is_noi_bat == 1"
                                            class="btn btn-primary mb-2 d-block">SP Nổi Bật</button>
                                        <button v-on:click="chuyenNoiBat(value)" v-else
                                            class="btn btn-danger mb-2 d-block">Bình Thường</button>

                                        <button v-on:click="chuyenFlashSale(value)" v-if="value.is_flash_sale == 1"
                                            class="btn btn-info mb-2 d-block">SP Flash</button>
                                        <button v-on:click="chuyenFlashSale(value)" v-else
                                            class="btn btn-warning mb-2 d-block">Bình Thường</button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="Object.assign(edit_san_pham, value)"
                                            class="btn btn-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#suaSP">Cập nhật</button>
                                        <button v-on:click="del_san_pham = value" class="btn btn-danger"
                                            data-bs-toggle="modal" data-bs-target="#delSP">Xóa</button>
                                    </td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="themSP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tên Sản Phẩm</label>
                                    <input v-model="create_san_pham.ten_san_pham" type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Số Lượng</label>
                                    <input v-model="create_san_pham.so_luong" type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Giá bán</label>
                                    <input v-model="create_san_pham.gia_ban" type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Hình ảnh</label>
                                    <input v-model="create_san_pham.hinh_anh" type="text" class="form-control mt-2">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tình trạng</label>
                                    <select class="form-control mt-2" v-model="create_san_pham.tinh_trang">
                                        <option value="1">Còn hàng</option>
                                        <option value="0">Hết hàng</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label>Danh Mục</label>
                                    <select class="form-control mt-2" v-model="create_san_pham.id_danh_muc">
                                        <option v-for="(value, index) in list_danh_muc" :key="index" :value="value.id">
                                            {{ value.ten_danh_muc }}
                                        </option>
                                    </select>

                                </div>
                                <div class="mb-2">
                                    <label>Mô Tả</label>
                                    <textarea v-model="create_san_pham.mo_ta_ngan" class="form-control mt-2" cols="30"
                                        rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="themMoiSanPham()" type="button" class="btn btn-primary">Thêm Mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="suaSP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tên Sản Phẩm</label>
                                    <input v-model="edit_san_pham.ten_san_pham" type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Số Lượng</label>
                                    <input v-model="edit_san_pham.so_luong" type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Giá bán</label>
                                    <input v-model="edit_san_pham.gia_ban" type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Hình ảnh</label>
                                    <input v-model="edit_san_pham.hinh_anh" type="text" class="form-control mt-2">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tình trạng</label>
                                    <select class="form-control mt-2" v-model="edit_san_pham.tinh_trang">
                                        <option value="1">Còn hàng</option>
                                        <option value="0">Hết hàng</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label>Danh Mục</label>
                                    <select class="form-control mt-2" v-model="edit_san_pham.id_danh_muc">
                                        <option v-for="(value, index) in list_danh_muc" :key="index" :value="value.id">
                                            {{ value.ten_danh_muc }}
                                        </option>
                                    </select>

                                </div>
                                <div class="mb-2">
                                    <label>Mô Tả</label>
                                    <textarea v-model="edit_san_pham.mo_ta_ngan" class="form-control mt-2" cols="30"
                                        rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="suaSanPham()" type="button" class="btn btn-primary">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delSP" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Xóa Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                                </div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                    <div class="text-white">Bạn có chắc muốn xóa sản phẩm này không?</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="xoaSanPham()" type="button" class="btn btn-danger"
                            data-bs-dismiss="modal">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="detail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Mô Tả</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ mo_ta_ngan }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
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
            list_san_pham: [],
            list_danh_muc: [],
            mo_ta_ngan: '',
            create_san_pham: {
                "ten_san_pham": "",
                "so_luong": "",
                "hinh_anh": "",
                "mo_ta_ngan": "",
                "tinh_trang": "",
                "gia_ban": "",
                "id_danh_muc": "",
            },
            edit_san_pham: {
                "ten_san_pham": "",
                "so_luong": "",
                "hinh_anh": "",
                "mo_ta_ngan": "",
                "tinh_trang": "",
                "gia_ban": "",
                "id_danh_muc": "",
            },
            del_san_pham: {
                "ten_san_pham": ""
            },
            tim_kiem: {},
        }
    },
    mounted() {
        this.loadSanPham();
        this.loadDanhMuc();
    },
    methods: {
        loadSanPham() {
            axios.get('http://127.0.0.1:8000/api/san-pham', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_san_pham = res.data.data;
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
        loadDanhMuc() {
            axios.get('http://127.0.0.1:8000/api/danh-muc', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_danh_muc = res.data.data;
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
        chuyenBan(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/chuyen-trang-thai-ban", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();
                    }

                })
        },
        chuyenNoiBat(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/chuyen-noi-bat", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }

                })
        },
        chuyenFlashSale(payload) {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/chuyen-flash-sale", payload, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        timKiem() {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/tim-kiem", this.tim_kiem, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status == false) {
                        toaster.error(res.data.message)
                    }
                    this.list_san_pham = res.data.data;
                });
        },
        themMoiSanPham() {
            const requiredFields = [
                "ten_san_pham",
                "so_luong",
                "hinh_anh",
                "mo_ta_ngan",
                "tinh_trang",
                "gia_ban",
                "id_danh_muc"
            ];

            // Kiểm tra rỗng
            for (const field of requiredFields) {
                if (
                    this.create_san_pham[field] === undefined ||
                    this.create_san_pham[field] === null ||
                    this.create_san_pham[field].toString().trim() === ''
                ) {
                    this.$toast.warning("Vui lòng nhập đầy đủ tất cả các trường bắt buộc!");
                    return;
                }
            }
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/create", this.create_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();

                        const modal = bootstrap.Modal.getInstance(document.getElementById('themSP'));
                        if (modal) modal.hide();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        suaSanPham() {
            const requiredFields = [
                "ten_san_pham",
                "so_luong",
                "hinh_anh",
                "mo_ta_ngan",
                "tinh_trang",
                "gia_ban",
                "id_danh_muc"
            ];

            // Kiểm tra rỗng
            for (const field of requiredFields) {
                if (
                    this.create_san_pham[field] === undefined ||
                    this.create_san_pham[field] === null ||
                    this.create_san_pham[field].toString().trim() === ''
                ) {
                    this.$toast.warning("Vui lòng nhập đầy đủ tất cả các trường bắt buộc!");
                    return;
                }
            }

            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/update", this.edit_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();

                        const modal = bootstrap.Modal.getInstance(document.getElementById('suaSP'));
                        if (modal) modal.hide();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        xoaSanPham() {
            axios
                .post("http://127.0.0.1:8000/api/admin/san-pham/delete", this.del_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },
    }
}
</script>

<style></style>