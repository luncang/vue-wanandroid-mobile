<template>
  <div>

    <van-pull-refresh :disabled="false" v-model="refreshing" @refresh="onRefresh" v-if="list.length>0">


      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        loading-text="加载中...."
        finished-text="没有更多了"
        @load="onLoad">


        <div class="item">
          <article-item v-for="(article,index) in list" :item="article" :key="index"></article-item>
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
    props: ['list'],
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
        this.$emit('onrefresh')
      },

      onLoad() {
        this.$emit('onload')
      },

      //刷新或加载结束时调用
      onFinish() {
        if (this.refreshing) {
          this.refreshing = false
        }
        this.loading = false
      },

      //没有更多数据时调用
      onNoMoreData() {
        this.finished = true
      }

    }
  }
</script>

<style lang="less" scoped>

</style>
