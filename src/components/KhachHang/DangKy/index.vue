<<<<<<< HEAD
<template>
    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
        <div class="col mx-auto">
            <div class="my-4 text-center">
                <img src="../../../assets/images/image.png" width="180" alt="">
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="border p-4 rounded">
                        <div class="text-center">
                            <h3 class="">Đăng Ký Tài Khoản</h3>
                            <p>Bạn đã có tài khoản?
                                <router-link to="/khach-hang/dang-nhap">
                                    <a href="/khach-hang/dang-nhap">Đăng Nhập</a>
                                </router-link>
                            </p>
                        </div>
                        <div class="login-separater text-center mb-4">
                            <hr>
                        </div>
                        <div class="form-body">
                            <form class="row g-3">
                                <div class="col-sm-12">
                                    <label class="form-label">Họ Và Tên</label>
                                    <input type="email" v-model="khach_hang_create.ho_va_ten" class="form-control"
                                        placeholder="Nhập vào họ và tên">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="khach_hang_create.email" class="form-control"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Số Điện Thoại</label>
                                    <input type="email" v-model="khach_hang_create.so_dien_thoai" class="form-control"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang_create.password" class="form-control"
                                            placeholder="Nhập vào Mật Khẩu">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Nhập Lại Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang_create.re_password"
                                            class="form-control" placeholder="Nhập lại Mật Khẩu">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="button" v-on:click="actionDangKy()" class="btn btn-primary"><i
                                                class="bx bx-user"></i>Đăng Kí</button>
                                    </div>
                                </div>
                            </form>
                        </div>
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
            khach_hang_create: {}
        }
    },
    mounted() {

    },
    methods: {
        actionDangKy() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-ky', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.khach_hang_create = {};
                        this.$router.push('/khach-hang/dang-nhap');
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },


    },
}
</script>
=======
<template>
    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
        <div class="col mx-auto">
            <div class="my-4 text-center">
                <img src="/src/assets/images/Remove-bg.ai_1727000743829.png" width="180" alt="">
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="border p-4 rounded">
                        <div class="text-center">
                            <h3 class="">Đăng Ký Tài Khoản</h3>
                            <p>Bạn đã có tài khoản?
                                <router-link to="/khach-hang/dang-nhap">
                                    <a href="/khach-hang/dang-nhap">Đăng Nhập</a>
                                </router-link>
                            </p>
                        </div>
                        <div class="login-separater text-center mb-4">
                            <hr>
                        </div>
                        <div class="form-body">
                            <form class="row g-3">
                                <div class="col-sm-12">
                                    <label class="form-label">Họ Và Tên</label>
                                    <input type="email" v-model="khach_hang_create.ho_va_ten" class="form-control"
                                        placeholder="Nhập vào họ và tên">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="khach_hang_create.email" class="form-control"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Số Điện Thoại</label>
                                    <input type="email" v-model="khach_hang_create.so_dien_thoai" class="form-control"
                                        placeholder="Nhập vào số điện thoại">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang_create.password" class="form-control"
                                            placeholder="Nhập vào Mật Khẩu">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Nhập Lại Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang_create.re_password"
                                            class="form-control" placeholder="Nhập lại Mật Khẩu">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="button" v-on:click="actionDangKy()" class="btn btn-primary"><i
                                                class="bx bx-user"></i>Đăng Kí</button>
                                    </div>
                                </div>
                            </form>
                        </div>
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
            khach_hang_create: {}
        }
    },
    mounted() {

    },
    methods: {
        actionDangKy() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-ky', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.khach_hang_create = {};
                        this.$router.push('/khach-hang/dang-nhap');
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },


    },
}
</script>
>>>>>>> bb7e0d4cd30f01c2216798ba2807069a72459bac
<style></style>