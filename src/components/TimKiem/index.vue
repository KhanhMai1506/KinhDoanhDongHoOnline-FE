<template>
    <div class="container py-4">
        <h5>Kết quả tìm kiếm cho từ khóa: "{{ thong_tin }}"</h5>
        <hr>
        <div class="row">
            <div v-for="(value, index) in list_san_pham" :key="index" class="col-lg-4 col-md-6 mb-3">
                <router-link :to="'/chi-tiet-dong-ho/' + value.id" class="text-decoration-none text-dark">
                    <div class="card h-100">
                        <img :src="value.hinh_anh" class="card-img-top" style="height: 230px; object-fit: contain;">
                        <div class="card-body">
                            <h6>{{ value.ten_san_pham }}</h6>
                            <p>{{ formatCurrency(value.gia_ban) }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-if="list_san_pham.length === 0" class="text-center text-muted mt-4">Không tìm thấy sản phẩm nào.</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['thong_tin'],
    beforeRouteUpdate(to, from, next) {
        this.thong_tin = to.params.thong_tin;
        this.loadDataSanPham();
        next();
    },
    data() {
        return {
            thong_tin: this.$route.params.thong_tin,
            list_san_pham: [],
        }
    },
    mounted() {
        this.loadDataSanPham();
    },
    methods: {
        loadDataSanPham() {
            var payload = {
                'noi_dung_tim': this.thong_tin
            };
            axios
                .post("http://127.0.0.1:8000/api/san-pham/tim-kiem", payload)
                .then((res) => {
                    this.list_san_pham = res.data.data;
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },
    },
}
</script>
