<template>
  <div>
    <NuxtLoadingIndicator/>
    <HomeHeader class="header" />
    <SvgPortfolio />
    <HomeNavigation class="navigation" />
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap';

onMounted(() => {
  gsap.timeline()
    .to({}, {delay: 2})
    .to('.header', {opacity: 1, duration: 0.5})
    .to('.navigation', {opacity: 1, duration: 0.5})
})
</script>

<style scoped lang="css">
.header, .navigation {
  opacity: 0;
}
</style>
