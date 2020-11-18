<!-- home -->
<template>
  <div class="index-container">
    <SearchBar :hotkeys="hotkeys" @on-search-input-change="onSearchInputChange"></SearchBar>
    <LoopBanner :banners="banners" @on-banner-click="onBannerClick"></LoopBanner>
  </div>
</template>

<script>
  import LoopBanner from '@/components/LoopBanner'
  import { getBanners, getHotKey } from '@/api/home'
  import { isSuccess } from '@/utils/request'
  import SearchBar from '../../components/SearchBar'

  export default {
    components: { SearchBar, LoopBanner },
    data() {
      return {
        banners: [],
        hotkeys: []
      }
    },

    computed: {},

    mounted() {
    },

    activated() {
      console.log('index activated')
      this.doGetBanners()
      this.doGetHotKey()
    },
    deactivated() {
      console.log('index deactivted')
    },

    methods: {

      doGetBanners() {
        getBanners().then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }
          this.banners = response.data
        }).catch(exception => {
          this.$toast('获取首页banner异常')
        })
      },

      onBannerClick(banner) {
        window.open(banner.url, '_blank')
      },

      doGetHotKey() {
        getHotKey().then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }
          this.hotkeys = response.data
        }).catch((exception) => {
          this.$toast('获取热词异常')
        })
      },
      onSearchInputChange(value) {

      }

    }
  }
</script>
<style lang="scss" scoped>
  .index-container {
    display: flex;
    flex-direction: column;
  }
</style>
