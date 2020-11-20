<template>
  <div>
    <van-tabs v-if="list"
              :border="true"
              swipe-threshold="4"
              swipeable animated sticky
              type="line" color="#07c160"
              title-active-color="#07c160" title-inactive-color="#333333">
      <van-tab v-for="(item,index) in list" :title="item.name" :key="index">
        <ListView ref="articlelist" :list="articles" @onrefresh="onRefresh" @onload="onLoad"
                  name="article-item"></ListView>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import ListView from './ListView'

  export default {
    name: 'ArticleTab',
    components: { ListView },
    props: ['list'],
    data() {
      return {
        articles: [],
        page: 0
      }
    },
    methods: {

      doGetArticleList() {
        console.log(` get article list page:${this.page}`)
        getArticleList(this.page).then(response => {
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

</style>
