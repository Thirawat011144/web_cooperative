<template>
  <div class="feature-card">
    <div>
      <img src="../../assets/img/8.1.png" alt="Feature image" />

    </div>

  </div>
</template>

<script setup>
import FetherCardVue from "./FetherCard.vue";

</script>

<style scoped>
.feature-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  /* ใช้ 100% ของความกว้างของ viewport */
  /* height: 100vh; */
  /* ใช้ 100% ของความสูงของ viewport */
  overflow: hidden;
  /* ซ่อนส่วนที่เกินขอบคอนเทนเนอร์ */
  box-sizing: border-box;
  /* รวม padding และ border ในความกว้างและความสูง */

}

.feature-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;

  /* ทำให้รูปภาพปรับขนาดให้พอดีคอนเทนเนอร์ */
}
</style>
