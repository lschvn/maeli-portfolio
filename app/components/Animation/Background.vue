<template>
    <div class="bg" />
</template>
<style lang="css" scoped>
div.bg {
  background-image: url('/noise.png');
  opacity: 0.04;
  height: 400vh;
  width: 400vw;
  animation: noise 2s steps(10) infinite;
  position: fixed;
  top: -200vw;
  left: -200vh;
  z-index: 300;
  background-color: var(--background-color);
  pointer-events: none;
}


@keyframes noise {
  0%, 20%, 40%, 60%, 80%, 100% {
    transform: translate(0);
  }
  10% {
      transform: translate(-5%, -10%);
  }
  30% {
      transform: translate(5%, 10%);
  }
  50% {
      transform: translate(-15%, 5%);
  }
  70% {
      transform: translate(10%, -5%);
  }
  90% {
      transform: translate(5%, -10%);
  }
}
</style>
