<template>
    <div class="container py-4">
        <h4><b>Danh Sách Sản Phẩm Nổi Bật</b></h4>
        <hr>
        <div class="row">
            <div v-for="(value, index) in list_noi_bat" :key="index" class="col-lg-4 col-md-6 mb-3">
                <router-link :to="'/chi-tiet-dong-ho/' + value.id" class="text-decoration-none text-dark">
                    <div class="card h-100 d-flex flex-column">
                        <img :src="value.hinh_anh" class="card-img-top" style="height: 230px; object-fit: contain;"
                            alt="...">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <h6 class="card-title">{{ value.ten_san_pham }}</h6>
                            <p class="card-text text-danger mb-0 fs-5 fw-bold">{{ formatCurrency(value.gia_ban) }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_noi_bat: [],
        }
    },
    mounted() {
        this.loadDataSanPhamNoiBat();
    },
    methods: {
        loadDataSanPhamNoiBat() {
            axios
                .get("http://127.0.0.1:8000/api/san-pham/data-noi-bat")
                .then((res) => {
                    this.list_noi_bat = res.data.data;
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        }
    }
}
</script>