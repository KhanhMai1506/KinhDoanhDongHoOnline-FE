<template>
    <div class="wrapper">
        <div class="header-wrapper">
            <TopCDIO></TopCDIO>
            <MenuCDIO></MenuCDIO>
        </div>

        <div class="page-wrapper">
            <div class="page-content">
                <router-view></router-view>
            </div>
        </div>

        <BotCDIO></BotCDIO>
    </div>
</template>

<script>
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66509a589a809f19fb34a5ef/1huldlr9g';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

import BotCDIO from "../components/BotCDIO.vue";
import MenuCDIO from "../components/MenuCDIO.vue";
import TopCDIO from "../components/TopCDIO.vue";

import "../../assets/js/bootstrap.bundle.min.js";
import "../../assets/js/jquery.min.js";
import "../../assets/plugins/simplebar/js/simplebar.min.js";
import "../../assets/plugins/metismenu/js/metisMenu.min.js";
import "../../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js";
import "../../assets/js/index.js";
import "../../assets/js/app.js";
import "../../assets/js/pace.min.js";

export default {
    name: "app",
    components: {
        BotCDIO, MenuCDIO, TopCDIO
    }
}
</script>

<style>
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/bootstrap-extended.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
@import "../../assets/css/dark-theme.css";
@import "../../assets/css/semi-dark.css";
@import "../../assets/css/header-colors.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.page-wrapper {
  flex: 1;
}

.page-content {
  padding: 20px;
}

footer, .BotCDIO {
  margin-top: auto;
  width: 100%;
}
</style>
