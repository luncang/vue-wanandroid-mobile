<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="#07c160"
               :height="200"
    >
      <van-swipe-item v-for="(banner, index) in banners" :key="index" @click="onBannerClick(banner)">
        <img v-lazy="banner.imagePath" class="img"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: 'LoopBanner',
    props: {
      banners: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      onBannerClick(banner) {
        this.$emit('on-banner-click', banner)
      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

</style>
