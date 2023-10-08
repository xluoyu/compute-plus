<script setup lang="ts">

</script>

<template>
  <div>
    <svg>
      <symbol id="s-text">
        <text text-anchor="middle" x="120px" y="35%" class="text--title">Corgi</text>
        <text text-anchor="middle" x="70%" y="70%" class="text--sub-title">速算</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy" />
        <use xlink:href="#s-text" class="text-copy" />
        <use xlink:href="#s-text" class="text-copy" />
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.text--title {
  font-size: 64px;
}
.text--sub-title {
  font-size: 32px;
}

.text-copy {
  fill: transparent;
  stroke: white;
  stroke-dasharray: 10% 20%;
  stroke-width: 2px;
  animation: stroke-offset 5s ease-in-out forwards;
}
.text-copy:nth-child(1) {
  stroke: #360745;
  stroke-dashoffset: 10%;
}
.text-copy:nth-child(2) {
  stroke: #D61C59;
  stroke-dashoffset: 20%;
}
.text-copy:nth-child(3) {
  stroke: #E7D84B;
  stroke-dashoffset: 30%;
}

@keyframes stroke-offset {
  40% {
    stroke-dashoffset: 30%;
    stroke-dasharray: 0% 87.5%;
  }
  80%{
    fill: transparent;
  }
  100% {
    fill: #ff7904;
  }
}
</style>
