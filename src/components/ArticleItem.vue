<template>
  <div class="article">
    <div class="left">
      <span class="title">{{item.title}}</span><br/>
      <span class="desc">{{item.desc}}</span>
      <div class="left-bottom">
        <van-icon name="like" size="20" :color="item.collect?'#333333':'#666666'"/>
        <span class="author">{{item.author}}</span>
        <span class="date">{{this.$formatDate(item.publishTime,'yyyy-MM-dd hh:mm') }}</span>
      </div>
    </div>
    <div class="right">
      <img v-lazy="item.envelopePic"/>
    </div>

  </div>
</template>

<script>
  import { formatDate } from '@/filters/filter'

  export default {
    name: 'ArticleItem',
    props: ['item'],
    methods: {}
  }
</script>

<style lang="scss" scoped>

  .article {
    background: white;
    display: flex;
    height: 180px;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: #e0e0e0 solid 1px;
    width: 100%;

    .left {
      position: relative;
      margin: 0 10px;
      width: 75%;
      max-width: 75%;
      overflow: hidden;

      .title {
        display: block;
        color: #333333;
        font-size: 15px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

      }

      .desc {
        display: block;
        max-lines: 3;
        color: #666666;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5; /* 行数 */
        -webkit-box-orient: vertical;
        line-height: 25px;
      }

      .left-bottom {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          font-size: 13px;
          color: #666666;
        }

        .author {
          margin: 0 15px;
        }
      }
    }

    .right {
      margin-right: 10px;
      width: 25%;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 3px;
      }

    }


  }

</style>
