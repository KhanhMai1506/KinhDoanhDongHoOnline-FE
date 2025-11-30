<template>
    <div class="row">
        <div class="col-lg-5">
            <div class="card">
                <div class="card-header">
                    <h5><b class="align-middle">THÊM MỚI DANH MỤC</b></h5>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>Tên Danh Mục</label>
                        <input v-on:blur="checkSlug()" v-model="create_danh_muc.ten_danh_muc" v-on:input="taoSlugDM()"
                            type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Slug Danh Mục</label>
                        <input v-model="create_danh_muc.slug_danh_muc" type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Icon Danh Mục</label>
                        <input v-model="create_danh_muc.icon_danh_muc" @input="checkFormValid()" type="text"
                            class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Danh Mục Cha</label>
                        <select v-model="create_danh_muc.id_cha" @change="checkFormValid()" class="form-control mt-2">
                            <option v-for="(value, index) in list_danh_muc_cha" :key="index" :value="value.id">
                                {{ value.ten_danh_muc }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Tình trạng</label>
                        <select v-model="create_danh_muc.tinh_trang" @change="checkFormValid()"
                            class="form-control mt-2">
                            <option value="0">Tạm Tắt</option>
                            <option value="1">Hiển Thị</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button v-if="is_them_moi == 0" class="btn btn-danger" disabled>Thêm Mới</button>
                    <button v-else v-on:click="themMoiDanhMuc()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="card">
                <div class="card-header">
                    <h5><b class="align-middle">DANH SÁCH DANH MỤC</b></h5>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Tên Danh Mục</th>
                                <th class="text-center">Slug Danh Mục</th>
                                <th class="text-center">Icon</th>
                                <th class="text-center">Tình Trạng</th>
                                <th class="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_danh_muc" :key="index">
                                <tr>
                                    <th class="align-middle text-center">{{ index + 1 }}</th>
                                    <td class="align-middle">{{ value.ten_danh_muc }}</td>
                                    <td class="align-middle">{{ value.slug_danh_muc }}</td>
                                    <td class="align-middle text-center">
                                        <span class="fa-xl" v-html="value.icon_danh_muc"></span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                            class="btn btn-success">Hiển thị</button>
                                        <button v-on:click="changeTrangThai(value)" v-else class="btn btn-danger">Tạm
                                            tắt</button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <i data-bs-toggle="modal" data-bs-target="#delModal"
                                            class="fa-solid fa-trash fa-2xl me-4" v-on:click="del_danh_muc = value"
                                            style="color: red;"></i>
                                        <i data-bs-toggle="modal" data-bs-target="#capnhatDM"
                                            v-on:click="Object.assign(edit_danh_muc, value)"
                                            class="fa-solid fa-pen fa-2xl" style="color: blue;"></i>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Danh Mục</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc muốn xóa danh mục <b class="text-danger">{{ del_danh_muc.ten_danh_muc
                            }}</b> này
                            không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="xoaDanhMuc()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Xác
                            nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhatDM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Danh Mục</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Tên Danh Mục</label>
                            <input v-model="edit_danh_muc.ten_danh_muc" v-on:input="taoSlugEdit()" type="text"
                                class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Slug Danh Mục</label>
                            <input v-model="edit_danh_muc.slug_danh_muc" type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Icon Danh Mục</label>
                            <input v-model="edit_danh_muc.icon_danh_muc" type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Danh Mục Cha</label>
                            <select v-model="edit_danh_muc.id_cha" class="form-control mt-2">
                                <option v-for="(value, index) in list_danh_muc_cha" :key="index" :value="value.id">
                                    {{ value.ten_danh_muc }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label>Tình trạng</label>
                            <select class="form-control mt-2" v-model="edit_danh_muc.tinh_trang">
                                <option value="0">Tạm Tắt</option>
                                <option value="1">Hiển Thị</option>
                            </select>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="capnhatDanhMuc()" type="button" class="btn btn-primary">Cập
                            nhật</button>
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
            list_danh_muc: [],
            list_danh_muc_cha: [],
            create_danh_muc: {
                "ten_danh_muc": "",
                "slug_danh_muc": "",
                "icon_danh_muc": "",
                "tinh_trang": "",
            },
            del_danh_muc: {
                "ten_danh_muc": ""
            },
            edit_danh_muc: {
                "ten_danh_muc": "",
                "slug_danh_muc": "",
                "icon_danh_muc": "",
                "tinh_trang": "",
            },
            is_them_moi: 0,
            is_ten_hop_le: false,
        }
    },
    mounted() {
        this.loadDanhMuc();
    },
    methods: {
        loadDanhMuc() {
            axios.get('http://127.0.0.1:8000/api/danh-muc', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        this.list_danh_muc = res.data.data;
                        this.list_danh_muc_cha = res.data.danhmuccha;
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
                .post("http://127.0.0.1:8000/api/admin/danh-muc/doi-trang-thai", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        checkFormValid() {
            const dm = this.create_danh_muc;
            if (
                this.is_ten_hop_le &&
                dm.ten_danh_muc.trim() !== "" &&
                dm.slug_danh_muc.trim() !== "" &&
                dm.tinh_trang !== ""
            ) {
                this.is_them_moi = 1; // ✅ bật nút thêm
            } else {
                this.is_them_moi = 0; // ❌ tắt nút thêm
            }
        },
        themMoiDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/create", this.create_danh_muc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadDanhMuc();

                        this.create_danh_muc = {
                            ten_danh_muc: "",
                            slug_danh_muc: "",
                            icon_danh_muc: "",
                            id_cha: "",
                            tinh_trang: "",
                        };

                        // ✅ Reset lại trạng thái form
                        this.is_them_moi = 0;
                        this.is_ten_hop_le = false;
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        checkSlug() {
            // Chỉ kiểm tra nếu người dùng đã nhập tên
            if (!this.create_danh_muc.ten_danh_muc.trim()) {
                this.$toast.warning("Vui lòng nhập tên danh mục trước!");
                this.is_ten_hop_le = false;
                this.is_them_moi = 0;
                return;
            }

            axios.post("http://127.0.0.1:8000/api/admin/danh-muc/checkSlug", this.create_danh_muc, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    if (res.data.status) {
                        // ✅ Tên có thể sử dụng
                        this.$toast.success("Tên danh mục có thể sử dụng!");
                        this.is_ten_hop_le = true;
                    } else {
                        // ❌ Tên bị trùng
                        this.$toast.error("Tên danh mục đã tồn tại!");
                        this.is_ten_hop_le = false;
                    }

                    // ✅ Kiểm tra xem đủ điều kiện bật nút Thêm chưa
                    this.checkFormValid();
                })
                .catch(() => {
                    this.$toast.error("Không thể kiểm tra slug!");
                    this.is_ten_hop_le = false;
                    this.is_them_moi = 0;
                });
        },
        taoSlugEdit() {
            this.edit_danh_muc.slug_danh_muc = this.toSluggg(this.edit_danh_muc.ten_danh_muc);
        },
        taoSlugDM() {
            this.create_danh_muc.slug_danh_muc = this.toSluggg(this.create_danh_muc.ten_danh_muc)
            this.edit_danh_muc.slug_danh_muc = this.toSluggg(this.edit_danh_muc.ten_danh_muc)
        },
        toSluggg(title) {
            var slug = title.toLowerCase();
            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            //Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
        },
        capnhatDanhMuc() {
            // Kiểm tra rỗng trước khi gửi
            const dm = this.edit_danh_muc;

            if (
                !dm.ten_danh_muc || dm.ten_danh_muc.trim() === "" ||
                !dm.slug_danh_muc || dm.slug_danh_muc.trim() === "" ||
                dm.tinh_trang === "" || dm.tinh_trang === null || dm.tinh_trang === undefined
            ) {
                this.$toast.warning("Vui lòng nhập đầy đủ thông tin trước khi cập nhật!");
                return;
            }

            // Nếu dữ liệu hợp lệ thì gửi request
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/update", dm, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                    if (res.data.status) {
                        this.$toast.success(thong_bao);
                        this.loadDanhMuc();
                    } else {
                        this.$toast.error(thong_bao);
                    }
                    const modal = bootstrap.Modal.getInstance(document.getElementById('capnhatDM'));
                    if (modal) modal.hide();
                })
                .catch(() => {
                    this.$toast.error("Không thể kết nối tới server!");
                });
        },

        xoaDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/admin/danh-muc/delete", this.del_danh_muc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.loadDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
    },
}
</script>
<style></style>