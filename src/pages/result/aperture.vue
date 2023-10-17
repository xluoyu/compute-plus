<script>
/**
 * 参考
 *
 * https://www.cnblogs.com/coco1s/p/17753942.html
 *
 */
export default {

}
</script>

<template>
  <div class="aperture-container">
    <div class="g-circle g-circle1" />
    <div class="g-circle g-circle2" />
    <!-- <div class="g-circle g-circle3" /> -->
    <!-- <div class="g-circle g-circle4" /> -->
    <div class="g-circle g-mask" />
  </div>
</template>

<style lang="scss" scoped>
.aperture-container {
    width: 130%;
    aspect-ratio: 1/1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .g-circle {
        position: absolute;
        inset: 0;
        border-radius: 50%;
    }

    .g-circle1 {
        background:
            repeating-conic-gradient(
                from 0deg at 50% 50%,
                transparent 0%,
                rgba(255, 230, 8, 0.69) 1%,
                transparent 6%
        );
        animation: 13s linear rotate infinite reverse;
    }

    .g-circle2 {
        background:
            repeating-conic-gradient(
                from 19deg at 50% 50%,
                transparent 0%,
                rgba(250, 240, 20, 0.78) 1.2%,
                rgba(250, 240, 20, 0.78),
                transparent 4.8%,
                transparent 7.6%
        );
        animation: 9s linear -2s rotate infinite;
    }

    .g-circle3 {
        background:
            repeating-conic-gradient(
                from 37deg at 50% 50%,
                transparent 0%,
                rgba(250, 240, 20, 0.78) 4%,
                transparent 7.9%,
                transparent 12%
        );
        animation: 17s linear rotate infinite reverse;
    }

    .g-circle4 {
        background:
            repeating-conic-gradient(
                from 103deg at 50% 50%,
                transparent 0%,
                rgba(250, 240, 20, 0.5) 5%,
                rgba(250, 240, 20, 0.27) 7%,
                transparent 12%
        );
        animation: 7s linear rotate infinite;
    }

    .g-mask {
      position: absolute;
      inset: -280px;
      background:
      radial-gradient(
            rgba(250, 240, 20, 0.2) 0,
            rgba(255, 255, 255, .8) calc(30%),
            transparent calc(70%),
            transparent 100%
        );
  }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
}

</style>
