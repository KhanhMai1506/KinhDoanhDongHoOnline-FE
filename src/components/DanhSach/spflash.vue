<template>
    <div class="container py-4">
        <h4><b>Danh Sách Sản Phẩm FlashSale</b></h4>
        <hr>
        <div class="row">
            <div v-for="(value, index) in list_flash_sale" :key="index" class="col-lg-4 col-md-6 mb-3">
                <router-link :to="'/chi-tiet-dong-ho/' + value.id" class="text-decoration-none text-dark">
                    <div class="card h-100 d-flex flex-column">
                        <img :src="value.hinh_anh" class="card-img-top" style="height: 230px; object-fit: contain;"
                            alt="...">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <h6 class="card-title">{{ value.ten_san_pham }}</h6>

                            <!-- Giá khuyến mãi -->
                            <span class="text-danger fw-bold fs-5">
                                {{ formatCurrency(value.gia_khuyen_mai) }}
                            </span>

                            <!-- Giá gốc + % giảm -->
                            <div class="d-flex align-items-center gap-2">
                                <span class="text-muted text-decoration-line-through">
                                    {{ formatCurrency(value.gia_ban) }}
                                </span>
                                <span class="text-danger">-{{ value.phan_tram }}%</span>
                            </div>
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
            list_flash_sale: [],
        }
    },
    mounted() {
        this.loadDataSanPhamFlashSale();
    },
    methods: {
        loadDataSanPhamFlashSale() {
            axios
                .get("http://127.0.0.1:8000/api/san-pham/data-flash-sale")
                .then((res) => {
                    this.list_flash_sale = res.data.data;
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