<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-lg-7">
                            <h5><b>DANH SÁCH QUYỀN</b></h5>
                        </div>
                        <div class="col-lg-5 text-end">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themMoiModal">Thêm
                                Quyền</button>
                        </div>
                        <div class="col-lg-12">
                            <div class="input-group mt-3 w-100">
                                <input type="text" class="form-control search-control border border-2 border-secondary"
                                    placeholder="Search...">
                                <span class="position-absolute top-50 search-show translate-middle-y"
                                    style="left: 15px;"><i class="bx bx-search"></i></span>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Tìm
                                    Kiếm</button>
                            </div>
                        </div>
                        <div class="modal fade" id="themMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Quyền</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="col-12 mb-2">
                                            <label class="form-label">Tên Quyền</label>
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Tạo
                                            Mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="text-center align-middle">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Quyền</th>
                                    <th>Cấp Quyền</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="align-middle">
                                    <th class="text-center">1</th>
                                    <td>Admin</td>
                                    <td class="text-center">
                                        <button class="btn btn-info text-white">Phân
                                            Quyền</button>
                                    </td>
                                    <td class="text-center">
                                        <i class="fa-solid fa-square-pen fa-3x text-primary me-2" data-bs-toggle="modal"
                                            data-bs-target="#updateModal"></i>
                                        <i class="fa-solid fa-trash fa-3x text-danger" data-bs-toggle="modal"
                                            data-bs-target="#xoaModal"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Quyền</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="col-12 mb-2">
                                        <label class="form-label">Tên Quyền</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
                                        Nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Quyền</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div
                                        class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                        <div class="d-flex align-items-center">
                                            <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                            </div>
                                            <div class="ms-3">
                                                <h6 class="mb-0 text-dark">Warning</h6>
                                                <div class="text-dark">
                                                    <p>Bạn có muốn xóa quyền này
                                                        không?
                                                    </p>
                                                    <p>
                                                        <b>Lưu ý:</b> Điều này không thể hoàn tác!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h5><b>DANH SÁCH CHỨC NĂNG</b></h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center text-nowrap align-middle">
                                        <th>#</th>
                                        <th>Tên Chức Năng</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="align-middle">
                                        <th class="text-center">1</th>
                                        <td class="text-wrap">Lấy Danh Sách Danh Mục</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <th class="text-center">2</th>
                                        <td class="text-wrap">Thêm Mới Danh Mục</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <th class="text-center">3</th>
                                        <td class="text-wrap">Lấy Danh Sách Sản Phẩm</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <th class="text-center">4</th>
                                        <td class="text-wrap">Tạo Mới Sản Phẩm</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <th class="text-center">5</th>
                                        <td class="text-wrap">Tạo Mới Nhân Viên</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <th class="text-center">6</th>
                                        <td class="text-wrap">Xoá Nhân Viên</td>
                                        <td class="text-center">
                                            <button class="btn btn-primary">Cấp Quyền</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="card">
                <div class="card-header">
                    <h5><b>ĐANG PHÂN QUYỀN CHO <b class="text-danger"> Admin </b></b></h5>

                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center text-nowrap align-middle">
                                        <th>Tên Chức Năng</th>
                                        <th>Tên Quyền</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="align-middle">
                                        <td class="text-wrap">Lấy Danh Sách Danh Mục</td>
                                        <td>Admin</td>
                                        <td class="text-center">
                                            <button class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#delPerModal">Xóa</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <td class="text-wrap">Thêm Mới Danh Mục</td>
                                        <td>Admin</td>
                                        <td class="text-center">
                                            <button class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#delPerModal">Xóa</button>
                                        </td>
                                    </tr>

                                    <tr class="align-middle">
                                        <td class="text-wrap">Tạo Mới Nhân Viên</td>
                                        <td>Admin</td>
                                        <td class="text-center">
                                            <button class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#delPerModal">Xóa</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal fade" id="delPerModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Nhân Viên</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="alert alert-danger" role="alert">
                                            Bạn có chắc muốn xóa cấp quyền này không?
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác
                                            nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
