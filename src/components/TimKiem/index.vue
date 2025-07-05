<template>
    <div class="container py-4">
        <h5>Kết quả tìm kiếm cho từ khóa: "{{ $route.query.tu_khoa }}"</h5>
        <hr>
        <div class="row">
            <div v-for="(sp, index) in ket_qua" :key="index" class="col-lg-4 col-md-6 mb-3">
                <router-link :to="'/chi-tiet-dong-ho/' + sp.id" class="text-decoration-none text-dark">
                    <div class="card h-100">
                        <img :src="sp.hinh_anh" class="card-img-top" style="height: 230px; object-fit: contain;">
                        <div class="card-body">
                            <h6>{{ sp.ten_san_pham }}</h6>
                            <p>{{ formatCurrency(sp.gia_ban) }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-if="ket_qua.length === 0" class="text-center text-muted mt-4">Không tìm thấy sản phẩm nào.</div>
    </div>
</template>

<script>
import { danh_sach_nam, danh_sach_nu, danh_sach_thong_minh, danh_sach_tre_em } from '../../data';

export default {
    data() {
        return {
            tat_ca_san_pham: [],
            ket_qua: [],
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        },
        timKiemSanPham() {
            const keyword = this.$route.query.tu_khoa?.toLowerCase().trim() || '';
            if (keyword === '') {
                this.ket_qua = [];
            } else {
                this.ket_qua = this.tat_ca_san_pham.filter(sp =>
                    sp.ten_san_pham.toLowerCase().includes(keyword)
                );
            }
        }
    },
    mounted() {
        this.tat_ca_san_pham = [
            ...danh_sach_nam,
            ...danh_sach_nu,
            ...danh_sach_tre_em,
            ...danh_sach_thong_minh
        ];
        this.timKiemSanPham();
    },
    watch: {
        '$route.query.tu_khoa'() {
            this.timKiemSanPham();
        }
    }
}
</script>
