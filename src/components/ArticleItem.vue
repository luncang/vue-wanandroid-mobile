<template>
  <div class="article">
    <div class="left">
      <span class="title">{{item.title}}</span><br/>
      <span class="desc">{{item.desc}}</span>
      <div class="article-address">
        <span class="ripple" @click="openNewUrl(item.link)">看文章</span>
        <span class="ripple" @click="openNewUrl(item.projectLink)">看项目</span>
      </div>
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

  export default {
    name: 'ArticleItem',
    props: ['item'],
    methods: {
      openNewUrl(url) {
        window.open(url, '_blank')
      }
    }
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
        color: #666666;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* 行数 */
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

      .article-address {
        width: 100%;
        position: absolute;
        bottom: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        span {
          font-size: 13px;
          color: white;
          background: #07c160;
          height: 25px;
          text-align: center;
          line-height: 25px;
          border-radius: 10px;
          width: 40%;
        }

        :nth-child(2) {
          margin-left: 50px;
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
