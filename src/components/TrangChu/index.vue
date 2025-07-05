<template>
    <div class="row">
        <div class="col-lg-9">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner rounded-5">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src="https://www.watchstore.vn/images/slideshow/2024/03/29/compress/2612-bonest-gatti_1711706293.webp"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="https://www.dangquangwatch.vn/view/pic/dong-ho-dang-quang_1.7.2025.jpg"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src="https://curnonwatch.com/wp-content/uploads/2025/07/Banner-1536x1024.webp"
                            class="d-block w-100 rounded-5" style="height: 400px;" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="row">
                <div class="col-lg-12">
                    <div class="h-100 rounded-5">
                        <img src="https://file.hstatic.net/1000043302/file/banner_nho_1_1024x1024.jpg"
                            style="height: 192px;" class="img-fluid rounded-5" alt="...">
                    </div>
                </div>
                <div class="col-lg-12 mt-3">
                    <div class="h-100 rounded-5">
                        <img src="https://file.hstatic.net/1000043302/file/web_2_1024x1024.jpg"
                            style="height: 192px;" class="img-fluid rounded-5" alt="...">
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="row mt-5">
        <div class="col-lg-12 col-md-12">
            <div class="row">
                    <div class="col-lg-3 mb-2 d-flex">
                        <div class="card flex-fill">
                                <div class="card-body">
                                    <div class="text-center d-flex flex-column justify-content-center">
                                        <button type="button" class="btn btn-outline-secondary mx-auto ps-3 mb-2">
                                            <i class="fa-solid fa-person"></i>
                                        </button>
                                        <div class="text-dark">Đồng hồ nam</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 d-flex">
                        <div class="card flex-fill">
                                <div class="card-body">
                                    <div class="text-center d-flex flex-column justify-content-center">
                                        <button type="button" class="btn btn-outline-secondary mx-auto ps-3 mb-2">
                                            <i class="fa-solid fa-person-dress"></i>
                                        </button>
                                        <div class="text-dark">Đồng hồ nữ</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 d-flex">
                        <div class="card flex-fill">
                                <div class="card-body">
                                    <div class="text-center d-flex flex-column justify-content-center">
                                        <button type="button" class="btn btn-outline-secondary mx-auto ps-3 mb-2">
                                            <i class="fa-solid fa-baby"></i>
                                        </button>
                                        <div class="text-dark">Đồng hồ trẻ em</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-3 mb-2 d-flex">
                        <div class="card flex-fill">
                                <div class="card-body">
                                    <div class="text-center d-flex flex-column justify-content-center">
                                        <button type="button" class="btn btn-outline-secondary mx-auto ps-3 mb-2">
                                            <i class="fa-solid fa-clock"></i>
                                        </button>
                                        <div class="text-dark">Đồng hồ thông minh</div>
                                    </div>
                                </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h4>
                            <i class="fa-solid fa-bolt text-warning"></i> FLASH SALE
                        </h4>
                        <a href="" class="fs-5">Xem tất cả</a>
                    </div>
                    <hr>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(value, index) in danh_sach_dong_ho" :key="index">
                            <div class="col d-flex">
                                <div class="card flex-fill">
                                    <img v-bind:src="value.hinh_anh" class="card-img-top "
                                        style="    width: 100%; height: 230px; object-fit: contain; vertical-align: middle;"
                                        alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="badge bg-warning mt-2">Sale</span></div>
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <h6 class="card-title cursor-pointer">
                                                    {{ value.ten_san_pham }}
                                               
                                        </h6>
                                        <div class="mt-auto">
                                            <div class="d-flex align-items-center fs-6">
                                                <div class="cursor-pointer">
                                                        <i class="bx bxs-star text-warning"></i>
                                                </div>
                                                <p class="mb-0 ms-auto">4.2(182)</p>
                                            </div>
                                            <div class="clearfix mt-2">
                                                <p class="mb-0 float-end fw-bold"><span
                                                        class="me-2 text-decoration-line-through text-muted">{{
                                                            value.gia_ban }}</span>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-lg-12">
            <div class="card    ">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h4>
                            <i class="fa-solid fa-fire text-danger"></i> SẢN PHẨM NỔI BẬT
                        </h4>
                        <a href="" class="fs-5">Xem tất cả</a>
                    </div>
                    <hr>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">
                        <template v-for="(value, index) in danh_sach_dong_ho" :key="index">
                            <div class="col d-flex">
                                <div class="card flex-fill">
                                    <img v-bind:src="value.hinh_anh" class="card-img-top "
                                        style="    width: 100%; height: 230px; object-fit: contain; vertical-align: middle;"
                                        alt="...">
                                    <div class="">
                                        <div class="position-absolute top-0 end-0 m-3 product-discount"><span
                                                class="badge bg-danger mt-2">Nổi Bật</span></div>
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <h6 class="card-title cursor-pointer">
                                               
                                                    {{ value.ten_san_pham }}
                                                
                                        </h6>
                                        <div class="mt-auto">
                                            <div class="d-flex align-items-center fs-6">
                                                <div class="cursor-pointer">                                                        <i class="bx bxs-star text-warning"></i>
                                                    
                                                    
                                                        <i class="bx bxs-star text-secondary"></i>
                                                    
                                                </div>
                                                <p class="mb-0 ms-auto">4.2(182)</p>
                                            </div>
                                            <div class="clearfix mt-2">
                                                <p class="mb-0 float-end fw-bold"><span
                                                        class="me-2 text-decoration-line-through text-muted">{{
                                                            value.gia_ban }}</span>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { danh_sach_dong_ho } from '../../data';

export default {
    data() {
        return {
            danh_sach_dong_ho,
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }
    }
}
</script>
<style></style>