<template>
  <div
:style="{
    '--star-offset-x': `${starOffsets.x}px`,
    '--star-offset-y': `${starOffsets.y}px`
  }">
    <h1>
      {{ props.text }}
    </h1>
    <svg class="folder" width="270" height="226" viewBox="0 0 270 226" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M110.94 24.2571C106.359 20.0381 99.6492 14.7343 90.6588 10.1939C82.4519 6.0452 74.908 3.82521 69.132 2.58965C44.1596 1.555 25.124 1.95681 16.3747 3.21245C13.8533 3.57408 9.72475 4.34756 6.71119 7.57207C3.1552 11.3792 3.01456 15.8794 3.00452 16.9141C2.67303 81.4042 2.33149 145.894 2 210.384C2.28127 211.881 3.29583 216.251 7.21345 219.917C10.8197 223.302 14.8277 224.166 16.3646 224.417C95.4504 224.528 174.526 224.638 253.612 224.749C255.098 224.548 260.111 223.694 264.059 219.335C266.691 216.432 267.625 213.307 267.986 211.71L266.319 33.9407C265.947 32.6448 264.923 29.7619 262.19 27.2707C258.775 24.1667 254.898 23.6845 253.622 23.5841C206.058 23.8051 158.504 24.0261 110.94 24.2571Z" fill="#D9D9D9" stroke="#2D2D2D" stroke-width="2.14" stroke-miterlimit="10"/>
      <path d="M3.10547 51.1782C3.67804 49.7116 4.87342 47.2304 7.29431 44.9401C10.6896 41.7357 14.4766 40.8216 16.0939 40.5303C94.1952 40.4098 172.307 40.2892 250.408 40.1787C252.015 40.249 256.465 40.6408 260.694 43.9256C264.351 46.7583 265.908 50.254 266.49 51.7909" fill="#D9D9D9"/>
      <path d="M3.10547 51.1782C3.67804 49.7116 4.87342 47.2304 7.29431 44.9401C10.6896 41.7357 14.4766 40.8216 16.0939 40.5303C94.1952 40.4098 172.307 40.2892 250.408 40.1787C252.015 40.249 256.465 40.6408 260.694 43.9256C264.351 46.7583 265.908 50.254 266.49 51.7909" stroke="#2D2D2D" stroke-width="2.14" stroke-miterlimit="10"/>
    </svg>
    <svg class="stars" width="216" height="211" viewBox="0 0 216 211" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M184.482 200.664L114.178 157.363L51.3272 210.882L70.7201 130.597L0.416073 87.2959L82.712 80.9817L102.105 0.696598L133.571 77.0778L215.867 70.7636L153.016 124.283L184.482 200.664Z" fill="#9EA8AF"/>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  text: String,
  starVariant: {
    type: String,
    default: 'top-left'
  }
})

const starOffsets = computed(() => {
  switch (props.starVariant) {
    case 'top-right':
      return { x: 80, y: -60 };
    case 'bottom-left':
      return { x: -70, y: 90 };
    case 'top-left':
    default:
      return { x: -90, y: -50 };
  }
});
</script>
<style lang="css" scoped>
div {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
}

.folder {
  z-index: 10;
}

.stars {
  position: absolute;
  transform: translate(var(--star-offset-x), var(--star-offset-y));
  z-index: 5;
}

div h1 {
  position: absolute;
  font-family: var(--title-font);
  font-size: 1.5em;
  z-index: 15;
}

/* --- Responsive Styles --- */

/* Tablet breakpoint (e.g., <= 992px) */
@media (max-width: 992px) {
  .folder {
    width: 220px; /* Slightly smaller folder */
    height: auto; /* Maintain aspect ratio */
  }

  .stars {
    width: 180px; /* Slightly smaller star */
    height: auto; /* Maintain aspect ratio */
    /* Adjust star offsets slightly if needed */
    transform: translate(calc(var(--star-offset-x) * 0.8), calc(var(--star-offset-y) * 0.8));
  }

  div h1 {
    font-size: 1em; /* Slightly smaller text */
  }
}

/* Mobile breakpoint (e.g., <= 768px) */
@media (max-width: 768px) {
  /* On mobile, the folder is stacked vertically in projets.vue */
  /* We might want it slightly larger relative to the container */
  .folder {
    width: 180px; /* Smaller folder for mobile */
  }

  .stars {
    width: 140px; /* Smaller star */
     /* Further adjust star offsets */
    transform: translate(calc(var(--star-offset-x) * 0.6), calc(var(--star-offset-y) * 0.6));
  }

  div h1 {
    font-size: 0.9em; /* Smaller text */
  }
}

/* Smaller Mobile breakpoint (e.g., <= 480px) */
@media (max-width: 480px) {
  .folder {
    width: 150px; /* Even smaller folder */
  }

  .stars {
    width: 110px; /* Even smaller star */
     /* Even smaller offsets */
    transform: translate(calc(var(--star-offset-x) * 0.5), calc(var(--star-offset-y) * 0.5));
  }

  div h1 {
    font-size: 0.8em; /* Smallest text */
  }
}
</style>
