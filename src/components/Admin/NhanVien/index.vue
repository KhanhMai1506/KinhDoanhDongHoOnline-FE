<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5><b>DANH SÁCH NHÂN VIÊN</b></h5>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm Mới Nhân Viên</button>
                    </div>
                    <div class="input-group mt-3 w-100">
                        <input type="text" class="form-control search-control border border-2 border-secondary" placeholder="Search..."> 
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i class="bx bx-search"></i></span>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Tìm Kiếm</button>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Họ Và Tên</th>
                                <th class="text-center">Email</th>
                                <th class="text-center">Số Điện Thoại</th>
                                <th class="text-center">Địa Chỉ</th>
                                <th class="text-center">Tình Trạng</th>
                                <th class="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <th class="align-middle text-center">1</th>
                                    <td class="align-middle text-center">Nguyễn Đức Trí</td>
                                    <td class="align-middle text-center">ductri@gmail.com</td>
                                    <td class="align-middle text-center">0905350808</td>
                                    <td class="align-middle text-center">Điện An, Điện Bàn, Quảng Nam</td>
                                    <td class="align-middle text-center">
                                        <button class="btn btn-success w-100">Hoạt Động</button>
                                    </td>
                                    <td class="align-middle text-center">
                                        <i data-bs-toggle="modal" data-bs-target="#delModal" class="fa-solid fa-trash fa-2xl me-4" style="color: red;"></i>
                                        <i data-bs-toggle="modal" data-bs-target="#capnhatDM" class="fa-solid fa-pen fa-2xl" style="color: blue;"></i>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Họ Và Tên</label>
                            <input type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Email</label>
                            <input type="email"
                                class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Password</label>
                            <input type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Số Điện Thoại</label>
                            <input type="tel" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Địa Chỉ</label>
                            <input type="text" class="form-control mt-2">
                        </div>
                        
                        <div class="mb-2">
                            <label>Tình trạng</label>
                            <select class="form-control mt-2">
                                <option value="1">Hoạt Động</option>
                                <option value="0">Dừng Hoạt Động</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary">Thêm Mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc muốn xóa nhân viên này không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhatDM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Nhân Viên</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Họ Và Tên</label>
                            <input type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Email</label>
                            <input type="email"
                                class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Số Điện Thoại</label>
                            <input type="tel" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Địa Chỉ</label>
                            <input type="text" class="form-control mt-2">
                        </div>
                        <div class="mb-2">
                            <label>Tình trạng</label>
                            <select class="form-control mt-2">
                                <option value="1">Hoạt Động</option>
                                <option value="0">Dừng Hoạt Động</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Cập nhật</button>
                    </div>
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