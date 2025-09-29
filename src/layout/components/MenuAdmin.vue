<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <img
          src="../../assets/images/logo-icon.png"
          class="logo-icon"
          alt="logo icon"
        />
      </div>
      <div>
        <h4 class="logo-text">Rukada</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item">
          <a class="nav-link" href="/admin/danh-muc">
            <div class="parent-icon">
              <i class="fa-solid fa-rectangle-list"></i>
            </div>
            <div class="menu-title">Danh Mục</div>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/admin/san-pham">
            <a class="nav-link" href="/admin/san-pham">
              <div class="parent-icon">
                <i class="fa-solid fa-boxes-stacked"></i>
              </div>
              <div class="menu-title">Sản Phẩm</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/khach-hang">
            <a class="nav-link" href="/admin/khach-hang">
              <div class="parent-icon"><i class="fa-solid fa-users"></i></div>
              <div class="menu-title">Khách Hàng</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/don-hang">
            <a class="nav-link" href="/admin/don-hang">
              <div class="parent-icon">
                <i class="fa-solid fa-box-archive"></i>
              </div>
              <div class="menu-title">Đơn Hàng</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/ma-giam-gia">
            <a class="nav-link" href="/admin/ma-giam-gia">
              <div class="parent-icon"><i class="fa-solid fa-ticket"></i></div>
              <div class="menu-title">Mã Giảm Giá</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/danh-gia'">
            <a class="nav-link" :href="'/'">
              <div class="parent-icon">
                <i class="fa-brands fa-rocketchat"></i>
              </div>
              <div class="menu-title">Đánh Giá</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="'/admin/chat'">
            <a class="nav-link" :href="'/'">
              <div class="parent-icon">
                <i class="fa-solid fa-comments"></i>
              </div>
              <div class="menu-title">Chat</div>
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      list_danh_muc: [],
    };
  },
  mounted() {
    this.layDataDanhMuc();
  },
  methods: {
    layDataDanhMuc() {
      axios.get("http://127.0.0.1:8000/api/danh-muc").then((res) => {
        this.list_danh_muc = res.data.data;
      });
    },
  },
};
</script>
<style></style>
