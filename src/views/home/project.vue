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
        <ListView :ref="`item:${index}`" :list="articles[index]" @onrefresh="onRefresh" @onload="onLoad"
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
        articles: [],//二维数组，内部是各种文章列表[[],[],[]]
        pages: []//页码也是数组

      }
    },
    methods: {

      onTabClick() {

        if (!this.articles[this.active]) {
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
        let page = undefined
        if (!this.pages || !this.pages[this.active]) {
          this.pages[this.active] = 0
        }
        page = this.pages[this.active]



        getArticleList(page, this.articleTree[this.active].id).then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }

          console.log('doGetArticleList finished....page:'+page)


          if (page === 0) {
            this.articles[this.active] = []
          }


          if (this.$refs[`item:${this.active}`]) {
            this.$refs[`item:${this.active}`][0].onFinish()
          }

          this.articles[this.active].push(...response.data.datas)

          if (this.$refs[`item:${this.active}`] && response.data.over === true) {
            this.$refs[`item:${this.active}`][0].onNoMoreData()
          }

          this.$forceUpdate()

        }).catch(exception => {
          console.log(`exception:${exception}`)
          this.$toast('获取文章列表异常')
        })

      },

      onRefresh() {
        console.log('onRefresh')
        this.pages[this.active] = 0
        this.doGetArticleList()
      },

      onLoad(object) {
        console.log('onLoad:'+(object===this.$refs[`item:${this.active}`][0]))

        // if(object===this.$refs[`item:${this.active}`][0]){
        //   this.pages[this.active] = this.pages[this.active]++
        //   this.doGetArticleList()
        // }
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
