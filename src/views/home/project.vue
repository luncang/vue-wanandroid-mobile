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
        <ListView :ref="`item:${index}`" :list="articles" @onrefresh="onRefresh" @onload="onLoad"
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
        articles: []
        // page: 0

      }
    },
    methods: {

      onTabClick() {

        console.log('active:' + this.active + ',loading:' + this.$refs[`item:${this.active}`])
        let refs = this.$refs[`item:${this.active}`]
        if (!refs || refs.length <= 0 || !refs[0].datas || refs[0].datas.length <= 0) {
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
        let components = this.$refs[`item:${this.active}`]
        let page
        if (!components || components.length <= 0 || !components[0].page) {
          page = 0
        } else {
          page = components[0].page
        }

        console.log('doGetArticleList:page:' + page)

        getArticleList(page, this.articleTree[this.active].id).then(response => {
          if (!isSuccess(response.errorCode)) {
            this.$toast(response.errorMsg)
            return
          }

          console.log('doGetArticleList finished....')


          if (page === 0) {
            if (!components || components.length <= 0) {
              this.articles = []
            } else {
              components[0].datas = []
            }
          }


          if (components && components.length > 0) {
            components[0].onFinish()
          }

          if (!components || components.length <= 0 || !components[0].datas) {
            this.articles.push(...response.data.datas)
          } else {
            components[0].datas.push(...response.data.datas)
          }
          if (response.data.over === true && components && components.length > 0) {
            components[0].onNoMoreData()
            return
          }


          this.$forceUpdate()

        }).catch(exception => {
          console.log(`exception:${exception}`)
          this.$toast('获取文章列表异常')
        })

      },

      onRefresh() {
        console.log('onRefresh')
        this.doGetArticleList()
      },

      onLoad() {
        console.log('onLoad')
        this.$refs[`item:${this.active}`][0].page++
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
