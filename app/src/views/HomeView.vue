<template>
  <div>
    <Navbar />
    <mainbar />
    <!-- <FetherCardVue /> -->
    <Footer />
  </div>
</template>

<script setup>

import Navbar from '../components/HomeView/Navbar.vue';
import Footer from '../components/HomeView/Footer.vue';
import Mainbar from '../components/HomeView/Mainbar.vue';

import FetherCardVue from '../components/HomeView/FetherCard.vue';

</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
}
</style>
