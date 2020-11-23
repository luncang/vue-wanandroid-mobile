<template>
  <div>

    <van-pull-refresh :disabled="false" v-model="refreshing" @refresh="onRefresh"
                      v-if="list.length>0"
    >

      <van-list

        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        loading-text="加载中...."
        finished-text="没有更多了"
        @load="onLoad">


        <div class="item">
          <component :is="name" v-for="(article,index) in list" :item="article" :key="index">
            动态组件
          </component>

        </div>


      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import ArticleItem from './ArticleItem'


  export default {
    name: 'ListView',
    components: { ArticleItem },
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      },
      name: String
    },
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false

      }
    },
    methods: {
      onRefresh() {
        this.finished = false
        this.loading = true
        console.log('list view on refresh:page:')
        this.$emit('onrefresh')
      },

      onLoad() {
        console.log('list view on load:page:'+this.list[0].title)
        this.$emit('onload',this)
      },

      //刷新或加载结束时调用
      onFinish() {
        if (this.refreshing) {
          this.refreshing = false
        }
        this.loading = false
        console.log(`------onFinish:refreshing:${this.refreshing},loading:${this.loading}`)
      },

      //没有更多数据时调用
      onNoMoreData() {
        this.finished = true
        console.log(`------onNoMoreData:finished:${this.finished},refreshing:${this.refreshing},loading:${this.loading}`)
      },

      getComponent() {

        switch (this.name) {
          case 'article-item':
            import('./ArticleItem')
            break
        }

      }

    },
    mounted() {
      console.log('list view mounted...')
      this.getComponent()
    }

  }
</script>

<style lang="less" scoped>

</style>
