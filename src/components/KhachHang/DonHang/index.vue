<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <h4>Lịch Sử Đơn Hàng</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Mã Đơn Hàng</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Tên Người Nhận</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Tổng Tiền Thanh Toán</th>
                                <th>Phương Thức</th>
                                <th>Thanh Toán</th>
                                <th>Tình Trạng Đơn Hàng</th>
                                <th>In Bill</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <th>1</th>
                                <td class="text-center">DH01</td>
                                <td>Honda Air Blade</td>
                                <td>Hoàng Long</td>
                                <td class="text-center">0478279346</td>
                                <td>382 Hùng Vương</td>
                                <td class="text-end">48.500.000 VND</td>
                                <td class="text-center">
                                    <button class="btn btn-success w-100">Thanh Toán Online</button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-primary w-100">Đã Thanh Toán</button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-warning w-100">Đã Giao</button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-secondary"><i
                                            class="fa-solid fa-file-invoice-dollar"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style></style>