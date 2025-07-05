<template>
    <div class="row">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="d-lg-flex align-items-center mb-4 gap-3">
                            <div class="position-relative">
                                <input type="text" class="form-control ps-5 radius-30" placeholder="Search Order"> <span
                                    class="position-absolute top-50 product-show translate-middle-y"><i
                                        class="bx bx-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <input class="form-check-input me-3" type="checkbox" value="" aria-label="..."><b>Chọn Tất
                                Cả</b>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>
                                </th>
                                <th class="text-center text-nowrap">#</th>
                                <th class="text-center text-nowrap">Hình Ảnh</th>
                                <th class="text-nowrap">Sản Phẩm</th>
                                <th class="text-center text-nowrap">Đơn Giá</th>
                                <th class="text-center text-nowrap">Số Lượng</th>
                                <th class="text-center text-nowrap">Thành Tiền</th>
                                <th class="text-center text-nowrap">Ghi Chú</th>
                                <th class="text-center text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="align-middle text-center">
                                    <input class="form-check-input me-3" type="checkbox" aria-label="...">
                                </td>
                                <td class="align-middle">
                                    <h6 class="mb-0 font-14">1</h6>
                                </td>
                                <td class="text-wrap text-center align-middle">
                                    <img src="https://kiavietnam.com.vn/storage/k5-xam.png" style="width: 50px; height: auto;" alt="">
                                </td>
                                <td class="text-wrap align-middle">Kia K5 2.0 Premium</td>
                                <td class="text-end align-middle">904.000.000 VND</td>
                                <td style="width: 140px;" class="align-middle">
                                    <div class="input-group input-spinner d-flex justify-content-center flex-row"
                                        style="flex-wrap: nowrap;">
                                        <button class="btn btn-white" type="button"
                                            id="button-minus"> −
                                        </button>
                                        <input type="text" class="form-control text-center" value="1">
                                        <button class="btn btn-white" type="button"
                                            id="button-plus"> +
                                        </button>
                                    </div>
                                </td>
                                <td class="text-end align-middle">904.000.000 VND</td>
                                <td class="text-center align-middle">
                                    <input type="text" class="form-control">
                                </td>
                                <td class="text-center align-middle">
                                    <button class="btn"><i class="fa-solid fa-trash text-danger"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="align-middle text-center">
                                    <input class="form-check-input me-3" type="checkbox" aria-label="...">
                                </td>
                                <td class="align-middle">
                                    <h6 class="mb-0 font-14">2</h6>
                                </td>
                                <td class="text-wrap text-center align-middle">
                                    <img src="https://suzuki.com.vn/_next/image?url=https%3A%2F%2Fdoftr40680fkg.cloudfront.net%2Fmodels%2FANC32SH1%2FAYA415XA730001%2Fcolors%2F1-07_1723898538846.jpg&w=640&q=75" style="width: 50px; height: auto;" alt="">
                                </td>
                                <td class="text-wrap align-middle">XL7 HYBRID</td>
                                <td class="text-end align-middle">599.900.000 VND</td>
                                <td style="width: 140px;" class="align-middle">
                                    <div class="input-group input-spinner d-flex justify-content-center flex-row"
                                        style="flex-wrap: nowrap;">
                                        <button class="btn btn-white" type="button"
                                            id="button-minus"> −
                                        </button>
                                        <input type="text" class="form-control text-center" value="1">
                                        <button class="btn btn-white" type="button"
                                            id="button-plus"> +
                                        </button>
                                    </div>
                                </td>
                                <td class="text-end align-middle">599.900.000 VND</td>
                                <td class="text-center align-middle">
                                    <input type="text" class="form-control">
                                </td>
                                <td class="text-center align-middle">
                                    <button class="btn"><i class="fa-solid fa-trash text-danger"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr>
                <div class="row mt-3">
                    <div class="col-lg-8 d-flex flex-row align-items-center text-nowrap">
                        <label class="me-2"><b>Địa Chỉ: </b></label>
                        <select class="form-select">
                            <template v-for="(value, index) in list_dia_chi" :key="index">
                                <option v-bind:value="value.id">{{ value.ten_nguoi_nhan }} - {{ value.so_dien_thoai }} -
                                    {{ value.dia_chi }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="col-lg-4 d-flex flex-row align-items-center text-nowrap">
                        <label class="me-2"><i class="fa-xl fa-solid fa-ticket text-danger me-2"></i><b>Voucher:
                            </b></label>
                        <div class="input-group">
                            <input v-model="code" type="text" class="form-control" placeholder="Nhập mã giảm giá">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Áp Dụng</button>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row mt-4">
                    <div class="col-6">
                        <div class="ms-auto">
                            <p><i class="fa-solid fa-money-bill fa-xl me-2"></i><b>Tổng Tiền Hóa Đơn:</b>
                                904.000.000 VND
                            </p>
                            <p><i class="fa-solid fa-money-bill-trend-up fa-xl me-2"></i><b>Số Tiền Giảm:</b> 
                                0
                            </p>
                            <p><i class="fa-solid fa-money-bill-transfer me-2"></i><b>Tổng tiền thanh toán:</b>
                                1.539.900.000 VND
                            </p>
                        </div>
                    </div>
                    <div class="col-6 text-end text-nowrap d-flex align-items-end">
                        <div class="ms-auto">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-check mb-2">
                                        <input value="0" class="form-check-input" type="radio"
                                            name="flexRadioDefault">
                                        <label class="form-check-label">Thanh Toán Online</label>
                                    </div>
                                    <div class="form-check">
                                        <input value="1" class="form-check-input" type="radio"
                                            name="flexRadioDefault">
                                        <label class="form-check-label">Thanh Toán COD</label>
                                    </div>
                                </div>
                            </div>
                            <a class="btn btn-danger radius-30 mt-2 mt-lg-0"><i
                                    class="fa-solid fa-cart-shopping"></i>Mua Hàng</a>
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
            list_dia_chi: [],
        }
    },
    mounted() {
        this.layDiaChi();
    },
    methods: {
        layDiaChi() {
            axios
                .get("http://127.0.0.1:8000/api/khach-hang/dia-chi/data", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    this.list_dia_chi = res.data.data;
                });
        },
    },
}
</script>
<style></style>
