<template>
  <div>
    <van-search
      shape="round"
      background="#e0e0e0"
      :placeholder="key"
      @input="onInputChange"
    />
  </div>
</template>

<script>
  var timer
  export default {
    name: 'SearchBar',
    props: {
      hotkeys: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        key: '请输入搜索内容'
      }
    },
    methods: {

      showKeys() {
        let i = 0
        timer = setInterval(() => {
          this.key = this.hotkeys[i].name
          i++
          if (i >= this.hotkeys.length) {
            i = 0
          }
        }, 2000)
      },

      onInputChange(value) {
        this.$emit('on-search-input-change', value)
      }


    },

    activated() {
      console.log('searchbar')
      this.showKeys()
    },

    deactivated() {
      clearInterval(timer)
    }
  }
</script>

<style lang="less" scoped>

</style>
