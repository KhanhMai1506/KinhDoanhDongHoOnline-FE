<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
               <div class="card-header ">
                  <div class="d-flex justify-content-between align-items-center">
                     <h5><b>DANH SÁCH KHÁCH HÀNG</b></h5>
                  </div>
                  <div class="input-group mt-3 w-100">
                     <input type="text" class="form-control search-control border border-2 border-secondary" placeholder="Search..."> 
                     <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i class="bx bx-search"></i></span>
                     <button class="btn btn-outline-secondary" type="button" id="button-addon2">Tìm Kiếm</button>
                  </div>
               </div>
                <div class="card-body">
                    <table class="table table-bordered mb-0">
                        <thead>
                            <tr class="text-center">
                                <th>#</th>
                                <th>Họ Và Tên</th>
                                <th>Email</th>
                                <th>Số Điện Thoại</th>
                                <th>Tình Trạng</th>
                                <th>Kích Hoạt</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr class="align-middle">
                                    <th class="text-center">1</th>
                                    <td class="text-center">Nguyễn Đức Mạnh</td>
                                    <td class="text-center">manh3010@gmail.com</td>
                                    <td class="text-center">0905350707</td>
                                    <td class="text-center">
                                        <button class="btn btn-success me-1">
                                            Hoạt Động
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-primary me-1">
                                            Đã Kích Hoạt
                                        </button>
                                    </td>
                                    <td class="text-center">
                                        <i data-bs-toggle="modal" data-bs-target="#xoaKhachhangModal" class="fa-solid fa-trash fa-2xl me-4" style="color: red;"></i>
                                        <i data-bs-toggle="modal" data-bs-target="#capNhatKhachhangModal" class="fa-solid fa-pen fa-2xl" style="color: blue;"></i>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="capNhatKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Cập Nhật Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Họ và Tên</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control">
                    </div>
                    <div class="col-md-12 mb-2">
                        <label class="form-label">Số Điện Thoại</label>
                        <input type="text" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="xoaKhachhangModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Xóa Khách Hàng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc chắn xóa tài khoản này không?</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác Nhận</button>
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