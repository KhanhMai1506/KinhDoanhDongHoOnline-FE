<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item">
                    <router-link :to="'/'">
                        <a class="nav-link" :href="'/'">
                            <div class="parent-icon"><i class='bx bx-home-circle'></i>
                            </div>
                            <div class="menu-title">Trang Chủ</div>
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="'/san-pham-dong-ho'">
                        <a class="nav-link" :href="'/san-pham-dong-ho'">
                            <div class="parent-icon"><i class="fa-solid fa-store"></i>
                            </div>
                            <div class="menu-title">sản phẩm</div>
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>

</script>
<style></style>