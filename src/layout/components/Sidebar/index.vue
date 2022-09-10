<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="true" :collapse="false" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="userInfo">
      <img style="width:32px; height:32px" src="@/assets/login/avatar@2x.4f4a758f.png" alt="">
      <div class="title">{{ $store.getters.name }}</div>
      <div class="divSplit">|</div>
      <img style="width:21px; height:21px;cursor:pointer" src="@/assets/login/quit.png" alt="" @click="logout">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.userInfo{
    height: 62px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #f5efee;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:0 14px 0 41px;
    .title{
      width: 43px;
      color: #000;
    font-size: 14px;
    margin: 0 10px;
    }
    .divSplit{
      width: 20px;
        color: #ccc;
    font-size: 16px;
    }
}

</style>
<style scoped >
.el-scrollbar{
        height: calc(100% - 163px) !important;
}
</style>
