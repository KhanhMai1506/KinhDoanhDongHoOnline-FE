// middleware/khachhang.js
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function(to, from, next) {
    axios.get(`${API_BASE}/api/kiem-tra-khach-hang`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
    }).then(res => {
        if (res.data.status) {
            next();
        } else {
            toaster.error(res.data.message || "Bạn cần đăng nhập!");
            next("/khach-hang/dang-nhap");
        }
    }).catch(() => {
        toaster.error("Phiên đăng nhập hết hạn!");
        next("/khach-hang/dang-nhap");
    });
}
