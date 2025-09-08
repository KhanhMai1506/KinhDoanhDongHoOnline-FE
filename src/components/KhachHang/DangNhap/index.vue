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
              <h3>Đăng Nhập</h3>
              <p>Bạn chưa có tài khoản?
                <router-link to="/khach-hang/dang-ky">Đăng Ký</router-link>
              </p>
            </div>
            <div class="login-separater text-center mb-4"><hr></div>
            <div class="form-body">
              <form class="row g-3">
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input type="email" v-model="khach_hang.email" class="form-control" placeholder="Nhập vào Email">
                </div>
                <div class="col-12">
                  <label class="form-label">Mật Khẩu</label>
                  <div class="input-group">
                    <input type="password" v-model="khach_hang.password" v-on:keyup.enter="actionDangNhap()" class="form-control" placeholder="Nhập vào Mật Khẩu">
                  </div>
                  <div class="text-end mt-2">
                    <router-link to="/khach-hang/quen-mat-khau">Quên mật khẩu?</router-link>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button type="button" @click="actionDangNhap" class="btn btn-primary">
                      <i class="bx bx-user"></i>Đăng Nhập
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-grid">
                    <button type="button" @click="loginWithGoogle" class="btn btn-white">
                      <i class="fa-brands fa-google" style="font-size: 20px; color: #DB4437;"></i>Đăng nhập bằng Google
                    </button>
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

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export default {
  data() {
    return {
      khach_hang: {}
    }
  },
  methods: {
    actionDangNhap() {
      if (!this.khach_hang.email || !this.khach_hang.password) {
        this.$toast?.error('Vui lòng nhập đầy đủ thông tin!');
        return;
      }

      axios.post(`${API_BASE}/api/khach-hang/dang-nhap`, this.khach_hang)
        .then((res) => {
          if (res.data.status) {
            localStorage.setItem('token_khach_hang', res.data.token);
            localStorage.setItem('ten_kh', res.data.ten_kh);
            window.dispatchEvent(new Event('loginSuccess'));
            this.$toast?.success("Đăng nhập thành công!");
            this.$router.replace('/khach-hang/profile');
          } else {
            this.$toast?.error(res.data.message);
          }
        })
        .catch((errors) => {
          if (errors.response?.data?.errors) {
            Object.values(errors.response.data.errors).forEach((value) => {
              this.$toast?.error(Array.isArray(value) ? value[0] : value);
            });
          } else {
            this.$toast?.error('Có lỗi xảy ra. Vui lòng thử lại!');
          }
        });
    },

    async loginWithGoogle() {
    try {
        const width = 500, height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);

        const popup = window.open(
            `${API_BASE}/api/auth/google/redirect`,
            'GoogleLogin',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        if (!popup) {
            this.$toast?.error("Không thể mở popup. Vui lòng cho phép popup!");
            return;
        }

        const self = this;
        window.addEventListener('message', function handler(event) {
            const { token, user } = event.data || {};

            if (token && user) {
                localStorage.setItem('token_khach_hang', token);
                localStorage.setItem('ten_kh', user.ho_va_ten);
                window.dispatchEvent(new Event('loginSuccess'));

                self.$toast?.success("Đăng nhập Google thành công!");
                self.$router.replace('/khach-hang/profile');

                popup.close();
                window.removeEventListener('message', handler);
            }
        });
    } catch (err) {
        console.error(err);
        this.$toast?.error('Đăng nhập Google thất bại!');
    }
}
  }
}
</script>
