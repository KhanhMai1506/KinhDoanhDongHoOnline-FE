<template>
    <div class="row">
        <!-- Bộ lọc -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="input-group">
                                    <span class="input-group-text">Từ ngày</span>
                                    <input v-model="x.tu_ngay" type="date" class="form-control" />
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="input-group">
                                    <span class="input-group-text">Đến ngày</span>
                                    <input v-model="x.den_ngay" type="date" class="form-control" />
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <button v-on:click="sendBE()" class="btn btn-primary w-100">
                                    Thống Kê
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Thống kê Danh mục -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">THỐNG KÊ DANH MỤC</h5>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Tên Danh Mục</th>
                                <th class="text-center">Số Lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v, k) in listDanhMuc" :key="k">
                                <th class="text-center">{{ k + 1 }}</th>
                                <td>{{ v.ten_danh_muc }}</td>
                                <td>{{ v.so_luong }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Bar v-if="isLoadDanhMuc" :data="chartDataDanhMuc" :options="chartOptions" />
                </div>
            </div>
        </div>

        <!-- Thống kê Đã bán -->
        <div class="col-lg-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">THỐNG KÊ ĐÃ BÁN</h5>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Tên Danh Mục</th>
                                <th class="text-center">Số Lượng Bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(v, k) in listDaBan" :key="k">
                                <th class="text-center">{{ k + 1 }}</th>
                                <td>{{ v.ten_danh_muc }}</td>
                                <td>{{ v.so_luong }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Bar v-if="isLoadDaBan" :data="chartDataDaBan" :options="chartOptions" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: "ThongKe",
    components: { Bar },
    data() {
        return {
            x: {},
            // Danh mục
            listDanhMuc: [],
            isLoadDanhMuc: false,
            chartDataDanhMuc: { labels: [], datasets: [{ label: "Danh mục", backgroundColor: ["#2980B9"], data: [] }] },

            // Đã bán
            listDaBan: [],
            isLoadDaBan: false,
            chartDataDaBan: { labels: [], datasets: [{ label: "Đã bán", backgroundColor: ["#27AE60"], data: [] }] },

            chartOptions: { responsive: true },
        };
    },
    methods: {
        sendBE() {
            // ✅ Reset dữ liệu trước mỗi lần nhấn
            this.listDanhMuc = [];
            this.listDaBan = [];
            this.isLoadDanhMuc = false;
            this.isLoadDaBan = false;

            // ✅ Kiểm tra nhập đủ ngày
            if (!this.x.tu_ngay || !this.x.den_ngay) {
                this.$toast.warning("Vui lòng chọn đủ từ ngày và đến ngày!");
                return;
            }

            const tu = new Date(this.x.tu_ngay);
            const den = new Date(this.x.den_ngay);

            if (tu > den) {
                this.$toast.error("Từ ngày không được lớn hơn đến ngày!");
                return;
            }

            // ✅ Nếu hợp lệ thì gọi API
            axios.post("http://127.0.0.1:8000/api/admin/thong-ke-1", this.x, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_admin") },
            }).then((res) => {
                this.listDanhMuc = res.data.data;
                this.chartDataDanhMuc.labels = res.data.array_ten_danh_muc;
                this.chartDataDanhMuc.datasets[0].data = res.data.array_tong_so_luong;
                this.isLoadDanhMuc = true;
            });

            axios.post("http://127.0.0.1:8000/api/admin/thong-ke-da-ban", this.x, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_admin") },
            }).then((res) => {
                this.listDaBan = res.data.data;
                this.chartDataDaBan.labels = res.data.array_ten_danh_muc;
                this.chartDataDaBan.datasets[0].data = res.data.array_so_luong_ban;
                this.isLoadDaBan = true;
            });
        }
    }


};
</script>
