<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            path: '/home'
          },
          icon: 'wap-home'
        },
        {
          title: '关于',
          to: {
            path: '/about'
          },
          icon: 'user-o'
        },
        {
          title:'项目',
          to: {
            path: '/project'
          },
          icon: 'vip-card'
        },
        {
          title:'体系',
          to: {
            path: '/system'
          },
          icon: 'fire'
        },
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
