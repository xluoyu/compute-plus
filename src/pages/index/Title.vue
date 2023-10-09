<script setup lang="ts">

</script>

<template>
  <div id="title">
    <svg id="svg-title">
      <symbol id="s-text">
        <text text-anchor="middle" x="120px" y="70px" class="text--title">Corgi</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy" />
        <use xlink:href="#s-text" class="text-copy" />
        <use xlink:href="#s-text" class="text-copy" />
        <use xlink:href="#s-text" class="text-copy" />
      </g>
    </svg>
    <h1 data-text="速算">
      <span>速算</span>
    </h1>
  </div>
</template>

<style lang="scss" scoped>
#title{
  position: relative;
  padding: 40px 0;
  width: 300px;
  margin: 0 auto;
}
#svg-title{
  height: 100px;
}
.text--title {
  font-size: 84px;
}

.text-copy {
  fill: transparent;
  stroke: white;
  stroke-dasharray: 15% 30%;
  stroke-width: 2px;
  animation: stroke-offset 3s ease-in-out forwards;
}
.text-copy:nth-child(1) {
  stroke: #488BF3;
  stroke-dashoffset: 10%;
}
.text-copy:nth-child(2) {
  stroke: #FFDC2F;
  stroke-dashoffset: 20%;
}
.text-copy:nth-child(3) {
  stroke: #F75B40;
  stroke-dashoffset: 30%;
}
.text-copy:nth-child(4) {
  stroke: #66C567;
  stroke-dashoffset: 40%;
}

@keyframes stroke-offset {
  20% {
    stroke-dashoffset: 40%;
    stroke-dasharray: 0% 40%;
  }
}

h1 {
  position: absolute;
  right: 40px;
  margin: auto;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff4ec;
  text-shadow: 0 0 4px #488BF3;
  user-select: none;
  white-space: nowrap;
  filter: blur(0.007em);
  animation: shake 2.5s linear forwards;
}

h1 span {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  clip-path: polygon(10% 0%, 44% 0%, 70% 100%, 55% 100%);
}

h1::before,
h1::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
}

h1::before {
    animation: crack1 2.5s linear forwards;
    clip-path: polygon(0% 0%, 10% 0%, 55% 100%, 0% 100%);
}

h1::after {
    animation: crack2 2.5s linear forwards;
    clip-path: polygon(44% 0%, 100% 0%, 100% 100%, 70% 100%);
}

@keyframes shake {
    5%,
    15%,
    25%,
    35%,
    55%,
    65%,
    75%,
    95% {
        filter: blur(0.018em);
        transform: translateY(0.05em) rotate(0deg);
    }

    10%,
    30%,
    40%,
    50%,
    70%,
    80%,
    90% {
        filter: blur(0.01em);
        transform: translateY(-0.05em) rotate(0deg);
    }

    20%,
    60% {
        filter: blur(0.03em);
        transform: translate(-0.05em, 0.05em) rotate(0deg);
    }

    45%,
    85% {
        filter: blur(0.03em);
        transform: translate(0.05em, -0.05em) rotate(0deg);
    }

    100% {
        filter: blur(0.007em);
        transform: translate(0) rotate(-0.5deg);
    }
}

@keyframes crack1 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-53%, -46%);
    }
}

@keyframes crack2 {
    0%,
    95% {
        transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-48%, -56%);
    }
}
</style>
