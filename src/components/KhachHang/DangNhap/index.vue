<template>
    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
        <div class="col mx-auto">
            <div class="my-4 text-center">
                <img src="/src/assets/images/logo.png" width="200" alt="">
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="border p-4 rounded">
                        <div class="text-center">
                            <h3 class="">Đăng Nhập</h3>
                            <p>Bạn chưa có tài khoản?
                                <router-link to="/khach-hang/dang-ky">
                                    <a href="/khach-hang/dang-ky">Đăng Ký</a>
                                </router-link>
                            </p>
                        </div>
                        <div class="login-separater text-center mb-4">
                            <hr>
                        </div>
                        <div class="form-body">
                            <form class="row g-3">
                                <div class="col-12">
                                    <label class="form-label">Email</label>
                                    <input type="email" v-model="khach_hang.email" class="form-control"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Mật Khẩu</label>
                                    <div class="input-group">
                                        <input type="password" v-model="khach_hang.password" class="form-control"
                                            placeholder="Nhập vào Mật Khẩu">
                                    </div>
                                    <div class="text-end mt-2">
                                        <router-link to="/khach-hang/quen-mat-khau">Quên mật khẩu?</router-link>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="d-grid">
                                        <button type="button" v-on:click="actionDangNhap()" class="btn btn-primary"><i
                                                class="bx bx-user"></i>Đăng Nhập</button>
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
            khach_hang: {}
        }
    },
    mounted() {

    },
    methods: {
        actionDangNhap() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-nhap', this.khach_hang)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.khach_hang = {}
                        // Lưu lại ở trình duyệt
                        localStorage.setItem('token_khach_hang', res.data.token);
                        localStorage.setItem('ten_kh', res.data.ten_kh);
                        this.$router.push('/khach-hang/profile');
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
        }
    },
}
</script>
<style></style>