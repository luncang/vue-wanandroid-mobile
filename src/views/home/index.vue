<!-- home -->
<template>
  <div class="index-container">
    <SearchBar :hotkeys="hotkeys" @on-search-input-change="onSearchInputChange"></SearchBar>
    <LoopBanner :banners="banners" @on-banner-click="onBannerClick"></LoopBanner>
    <ListView ref="articlelist" :list="articles" @onrefresh="onRefresh" @onload="onLoad" name="article-item"></ListView>
  </div>
</template>

<script>
  import LoopBanner from '@/components/LoopBanner'
  import { getBanners, getHotKey, search, getArticleList } from '@/api/home'
  import { isSuccess } from '@/utils/request'
  import SearchBar from '@/components/SearchBar'
  import ListView from '@/components/ListView'

  export default {
    components: { ListView, SearchBar, LoopBanner },
    data() {
      return {
        banners: [],
        hotkeys: [],
        articles: [],
        page: 0

      }
    },

    computed: {},

    mounted() {
    },

    activated() {
      console.log('index activated')
      this.doGetBanners()
      this.doGetHotKey()
      this.onRefresh()
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
        search(value, 2).then(response => {
          console.log(`${JSON.stringify(response)}`)
        }).catch(exception => {

        })
      },

      doGetArticleList() {
        console.log(` get article list page:${this.page}`)
        getArticleList(this.page,402).then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }
          if (this.page === 0) {
            this.articles = []
          }
          this.$refs.articlelist.onFinish()
          this.articles.push(...response.data.datas)
          if (response.data.over === true) {
            this.$refs.articlelist.onNoMoreData()
            return
          }
          this.page++
          this.$forceUpdate()

        }).catch(exception => {
          this.$toast('获取文章列表异常')
        })
      },

      onRefresh() {
        console.log('onRfresh')
        this.page = 0
        this.doGetArticleList()
      },

      onLoad() {
        console.log('onLoad')
        this.doGetArticleList()
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
