<template>
    <div class="section-authentication-signin d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
                <div class="col mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <div class="p-4 rounded  border">
                                <div class="text-center">
                                    <img src="../../../assets/images/icons/forgot-2.png" width="120" alt="">
                                </div>
                                <div class="text-center">
                                    <h4 class="mt-3 font-weight-bold">Quên Mật Khẩu?</h4>
                                    <p class="text-muted">Nhập Email để lấy lại mật khẩu</p>
                                </div>
                                <div class="my-4">
                                    <input v-model="khach_hang.email" type="text" class="form-control form-control-lg"
                                        placeholder="Nhập vào Email">
                                </div>
                                <div class="d-grid gap-2">
                                    <button v-on:click="gui()" type="button" class="btn btn-primary btn-lg">Gửi</button>
                                    <router-link to="/khach-hang/dang-nhap">
                                        <a class="btn btn-light w-100"><i class="bx bx-arrow-back mr-1"></i>Quay lại trang
                                            đăng nhập</a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            khach_hang : {},
        }
    },
    methods: {
        gui() {
  axios
    .post("http://127.0.0.1:8000/api/khach-hang/quen-mat-khau", this.khach_hang)
    .then((res) => {
      // Xử lý khi API trả về status true/false
      if (res.data.status) {
        this.$toast.success(`<b>Thông báo</b><br>${res.data.message}`);
        this.$router.push('/khach-hang/dang-nhap');
      } else {
        this.$toast.error(`<b>Thông báo</b><br>${res.data.message}`);
      }
    })
    .catch((error) => {
      // 🧠 Xử lý lỗi từ Laravel FormRequest (422)
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        for (const field in errors) {
          this.$toast.error(errors[field][0]); // hiển thị từng lỗi
        }
      } else {
        // Các lỗi khác (500, 404,...)
        this.$toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    });
}
    },
}

</script>
<style></style>