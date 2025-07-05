<template>
    <div class="row">
        <div class="card">
            <div class="card-header">
                <h5><b>DANH SÁCH ĐƠN HÀNG</b></h5>
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
                                <th>Thanh Toán</th>
                                <th>Tình Trạng Đơn Hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <th>1</th>
                                <td class="text-center">DH01</td>
                                <td>Air Blade 125 2022</td>
                                <td>Nguyễn Đức Mạnh</td>
                                <td class="text-center">0905350808</td>
                                <td>Điện Bàn, Quảng Nam</td>
                                <td class="text-end">42.000.000 ₫</td>
                                <td class="text-center">
                                    <button class="btn btn-success w-100">Đã Thanh Toán</button>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-info w-100">Đang Vận
                                        Chuyển</button>
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
export default {
    
}
</script>
<style></style>