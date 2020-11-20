<template>
  <div class="project">
    <van-tabs
      @click="onTabClick"
      v-model="active"
      :border="true"
      swipe-threshold="4"
      swipeable animated sticky
      type="line" color="#07c160"
      title-active-color="#07c160" title-inactive-color="#333333">
      <van-tab v-for="(item,index) in articleTree" :title="item.name" :key="index">
        <ListView ref="item" :list="articles" @onrefresh="onRefresh" @onload="onLoad"
                  name="article-item">

        </ListView>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { getArticleTree, getArticleList } from '@/api/home'
  import ListView from '@/components/ListView'

  import { isSuccess } from '@/utils/request'

  export default {
    name: 'project',
    components: { ListView },
    data() {
      return {
        active: 0,
        articleTree: [],
        articles: [],
        page: 0

      }
    },
    methods: {

      onTabClick() {
        console.log('active:' + this.active + ',loading:' + this.$refs.item[this.active])
        if (!this.$refs.item[this.active] || !this.$refs.item[this.active].list || this.$refs.item[this.active].list.length <= 0) {
          this.page = 0
          this.onRefresh()
        }

      },

      async doMount() {
        await this.doGetArticleTree().then(() => {
          this.onRefresh()
        })
      },

      doGetArticleTree() {
        return getArticleTree().then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }
          this.articleTree = response.data
          console.log('doGetArticleTree finished....')

        }).catch((exception) => {
          console.log('exception:' + exception)
          this.$toast('获取项目分类异常')
        })

      },
      doGetArticleList() {

        getArticleList(this.page, this.articleTree[this.active].id).then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }

          console.log('doGetArticleList finished....')

          if (this.page === 0) {
            this.articles = []
          }

          this.$refs.item[this.active].onFinish()
          this.articles.push(...response.data.datas)
          if (response.data.over === true) {
            this.$refs.item[this.active].onNoMoreData()
            return
          }
          this.page++
          this.$forceUpdate()

        }).catch(exception => {
          console.log(`exception:${exception}`)
          this.$toast('获取文章列表异常')
        })

      },

      onRefresh() {
        console.log('onRefresh')
        this.page = 0
        this.doGetArticleList()
      },

      onLoad() {
        console.log('onLoad')
        this.doGetArticleList()
      }
    },
    mounted() {
      console.log('project mounted')
      this.doMount()

    }
  }
</script>

<style lang="scss" scoped>

</style>
