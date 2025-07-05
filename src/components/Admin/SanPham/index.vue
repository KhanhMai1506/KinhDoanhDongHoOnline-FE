<template>     
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5><b>DANH SÁCH SẢN PHẨM</b></h5>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themSP">Thêm mới sản phẩm</button>
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
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Hình Ảnh</th>
                                <th class="text-center align-middle">Tên Sản Phẩm</th>
                                <th class="text-center align-middle">Số Lượng</th>
                                <th class="text-center align-middle">Giá Bán</th>
                                <th class="text-center align-middle">Slogan</th>
                                <th class="text-center align-middle">Thông Điệp</th>
                                <th class="text-center align-middle">Tình Trạng</th>
                                <th class="text-center align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th class="align-middle">1</th>
                                <th class="align-middle text-center">
                                    <img style="max-height: 200px;" src="https://cdn.honda.com.vn/automobiles/June2022/YEUJcVw0k18hv7iJEUEh.png" class="img-fluid" alt="">
                                </th>
                                <td class="align-middle text-wrap">Honda HR-V</td>
                                <td class="align-middle">12</td>
                                <td class="align-middle text-end">699.000.000 VND</td>
                                <td class="align-middle text-truncate">Thiết kế Thanh Lịch - Định Hình Phong Cách</td>
                                <td class="align-middle text-center">
                                    <i class="fa-solid fa-newspaper fa-2xl" data-bs-toggle="modal"
                                    data-bs-target="#sp1"></i>
                                </td>
                                <td class="align-middle text-wrap">
                                    <button class="btn btn-success text-nowrap mb-2 mt-2">Đang Bán</button>
                                </td>
                                <td class="align-middle">
                                    <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#suaSP">Cập nhật</button>
                                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delSP">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle">2</th>
                                <th class="align-middle text-center">
                                    <img style="max-height: 200px;" src="https://cdn.honda.com.vn/automobiles/July2023/y7gDmu9NFnawre66iwKx.png" class="img-fluid" alt="">
                                </th>
                                <td class="align-middle text-wrap">Honda BR-V</td>
                                <td class="align-middle">22</td>
                                <td class="align-middle text-end">661.000.000 VND</td>
                                <td class="align-middle text-truncate">TRỌNG CHUYẾN ĐI - TRÒN CẢM XÚC</td>
                                <td class="align-middle text-center">
                                    <i class="fa-solid fa-newspaper fa-2xl" data-bs-toggle="modal"
                                    data-bs-target="#sp2"></i>
                                </td>
                                <td class="align-middle text-wrap">
                                    <button class="btn btn-success text-nowrap mb-2 mt-2">Đang Bán</button>
                                </td>
                                <td class="align-middle">
                                    <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#suaSP">Cập nhật</button>
                                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delSP">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <th class="align-middle">3</th>
                                <th class="align-middle text-center">
                                    <img style="max-height: 200px;" src="https://cdn.honda.com.vn/automobiles/October2024/RCDX9yV7FbUP7JI16lKB.png" class="img-fluid" alt="">
                                </th>
                                <td class="align-middle text-wrap">Honda Civic Type R</td>
                                <td class="align-middle">2</td>
                                <td class="align-middle text-end">2.399.000.000 VND</td>
                                <td class="align-middle text-truncate">BỨT TỐC VƯỢT ĐỈNH</td>
                                <td class="align-middle text-center">
                                    <i class="fa-solid fa-newspaper fa-2xl" data-bs-toggle="modal"
                                    data-bs-target="#sp3"></i>
                                </td>
                                <td class="align-middle text-wrap">
                                    <button class="btn btn-success text-nowrap mb-2 mt-2">Đang Bán</button>
                                </td>
                                <td class="align-middle">
                                    <button class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#suaSP">Cập nhật</button>
                                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delSP">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="themSP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tên Sản Phẩm</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Số Lượng</label>
                                    <input type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Giá bán</label>
                                    <input type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Hình ảnh</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tình trạng</label>
                                    <select class="form-control mt-2">
                                        <option value="1">Còn hàng</option>
                                        <option value="0">Hết hàng</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label>Slogan</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Thông Điệp</label>
                                    <textarea class="form-control mt-2" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-if="is_them_moi == 0" type="button" class="btn btn-danger" disabled>Thêm mới</button>
                        <button v-else v-on:click="themMoiSanPham()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Thêm mới</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="suaSP" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Thông Tin Sản Phẩm</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tên Sản Phẩm</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Số Lượng</label>
                                    <input type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Giá bán</label>
                                    <input type="number" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Hình ảnh</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-2">
                                    <label>Tình trạng</label>
                                    <select class="form-control mt-2">
                                        <option value="1">Còn hàng</option>
                                        <option value="0">Hết hàng</option>
                                    </select>
                                </div>
                                <div class="mb-2">
                                    <label>Slogan</label>
                                    <input type="text" class="form-control mt-2">
                                </div>
                                <div class="mb-2">
                                    <label>Thông Điệp</label>
                                    <textarea class="form-control mt-2" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delSP" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Xóa Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
                        <div class="d-flex align-items-center">
                            <div class="font-35 text-white"><i class="bx bxs-message-square-x"></i>
                            </div>
                            <div class="ms-3">
                                <h6 class="mb-0 text-white">Cảnh Báo!</h6>
                                <div class="text-white">Bạn có chắc muốn xóa sản phẩm này không?</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="sp1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Điệp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Honda HR-V chinh phục mọi ánh nhìn với thiết kế ngoại thất 'TINH TẾ trong từng CHUYỂN ĐỘNG', từng chi tiết được trau chuốt tỉ mỉ, tạo nên tổng thể sang trọng và đậm chất riêng
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="sp2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Điệp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Với nội thất rộng rãi, tiện nghi cùng khả năng vận hành êm ái, Honda BR-V mang đến cho cả gia đình những giây phút thoải mái, an toàn trên mọi cung đường như một chiếc chuyên cơ đích thực
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="sp3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thông Điệp</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Dù đã ở đỉnh cao, chủ nhân Honda Civic Type R vẫn không ngừng tăng tốc để chinh phục đỉnh mới, vinh quang mới và trở thành phiên bản thành công hơn của chính mình.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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