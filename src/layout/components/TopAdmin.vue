<template>
	<div class="topbar d-flex align-items-center">
		<nav class="navbar navbar-expand">
			<div class="topbar-logo-header">
				<div class="">
					<img src="/src/assets/images/Remove-bg.ai_1727000743829.png" class="logo-icon"
                                style="width: 200px;" alt="logo icon">
				</div>
				
			</div>
			<div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
			<div class="search-bar flex-grow-1">
				<div class="position-relative search-bar-box">
					<input type="text" class="form-control search-control" placeholder="Tìm Kiếm?">
					<span class="position-absolute top-50 search-show translate-middle-y"><i
							class='bx bx-search'></i></span>
					<span class="position-absolute top-50 search-close translate-middle-y"><i
							class='bx bx-x'></i></span>
				</div>
			</div>
			
			<div class="user-box dropdown">
				<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
					role="button" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://img.freepik.com/premium-vector/premium-high-quality-boy-sticker-part-93_768745-322.jpg" class="user-img rounded-circle p-1 bg-dark" alt="user avatar">
					<div class="user-info ps-3">
						<p class="user-name mb-0">{{ name_admin }}</p>
						<p class="designattion mb-0">Admin</p>
					</div>
				</a>
				<ul class="dropdown-menu dropdown-menu-end">
					<li>
						<router-link to="/admin/profile">
							<a class="dropdown-item" href="/admin/profile"><i class="bx bx-user"></i><span>Profile</span></a>
						</router-link>
					</li>
					<li><a v-on:click="dangXuat()" class="dropdown-item" href="javascript:;"><i
								class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            auth: false,
            name_admin: '',
        }
    },
    mounted() {
        this.checkLogin();
        this.name_admin = localStorage.getItem('ten_admin');
    },
    methods: {
        dangXuat() {
            axios
                .post('http://127.0.0.1:8000/api/nhan-vien/dang-xuat', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/admin/dang-nhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        checkLogin() {
            axios
                .get('http://127.0.0.1:8000/api/kiem-tra-admin', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.auth = true;
                    }
                })
        },
    },
}
</script>
<style></style>