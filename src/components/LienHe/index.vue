<template>
    <div class="container">
        <h2>Liên hệ hỗ trợ khách hàng</h2>

        <div class="info-grid">
            <div class="info-box">
                <i class="fas fa-map-marker-alt"></i>
                <div class="info-title">Địa chỉ</div>
                K7/25 Quang Trung, Hải Châu, Đà Nẵng
            </div>
            <div class="info-box">
                <i class="fas fa-phone"></i>
                <div class="info-title">Điện thoại</div>
                0934739331
            </div>
            <div class="info-box">
                <i class="fas fa-envelope"></i>
                <div class="info-title">Email</div>
                tmml@gmail.com
            </div>
            <div class="info-box">
                <i class="fas fa-clock"></i>
                <div class="info-title">Thời gian làm việc</div>
                8:00 - 17:00 (Thứ 2 - Thứ 7)
            </div>
        </div>

        <div class="contact-form">
            <h3>Gửi liên hệ</h3>
            <form>
                <label>Họ tên</label>
                <input type="text" placeholder="Nhập họ tên của bạn" />

                <label>Email</label>
                <input type="email" placeholder="Nhập địa chỉ email" />

                <label>Nội dung</label>
                <textarea rows="5" placeholder="Nhập nội dung liên hệ"></textarea>

                <div style="text-align: end;">
                    <button type="button">Gửi liên hệ</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.container {
    max-width: 960px;
    margin-bottom: 50px auto;
    background: #fff;
    color: #333;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

h2 {
    text-align: center;
    color: #003366;
    margin-bottom: 30px;
    font-size: 30px;
}

.info-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 40px;
}

.info-box {
    flex: 1;
    min-width: 220px;
    background: #f2f8ff;
    border-left: 5px solid #003366;
    padding: 20px;
    border-radius: 10px;
    transition: 0.3s;
}

.info-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 51, 102, 0.2);
}

.info-box i {
    font-size: 20px;
    color: #003366;
    margin-right: 10px;
}

.info-title {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 16px;
}

.contact-form label {
    display: block;
    font-weight: bold;
    margin: 15px 0 5px;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
}

.contact-form button {
    margin-top: 20px;
    background: #003366;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.contact-form button:hover {
    background: #0052cc;
}

@media (max-width: 600px) {
    .info-grid {
        flex-direction: column;
    }
}
</style>
