<template>
  <div id="tags-view-container" class="tags-view-container">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :key="tag.path"
      :class="isActive(tag)?'active':''"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      tag="span"
      class="tags-view-item"
      @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
      @contextmenu.prevent.native="openMenu(tag,$event)"
    >
      <!-- 多语言设置 -->
      {{ tag.meta.title }}
      <!-- {{ $t('route.'+tag.name) }} -->
      <span v-if="!isAffix(tag)&&tag.name!=='Dashboard'" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />

    </router-link>
    <div class="divDropDown">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-back" @click.native="colseLeft(selectedTag)">关闭左侧</el-dropdown-item>
          <el-dropdown-item icon="el-icon-right" @click.native="colseRight(selectedTag)">关闭右侧</el-dropdown-item>
          <el-dropdown-item icon="el-icon-close" @click.native="closeOthersTags">关闭其他</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close" @click.native="closeAllTags(selectedTag)">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="colseLeft(selectedTag)">{{ '关闭左侧' }}</li>
      <li v-if="!isAffix(selectedTag)" @click="colseRight(selectedTag)">{{ '关闭右侧' }}</li>
      <li @click="closeOthersTags">{{ '关闭其他' }}</li>
      <li @click="closeAllTags(selectedTag)">{{ '关闭所有' }}</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'TagsView',
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      affixTags: []
    }
  },
  computed: {
    selectedTag: {
      set(val) {
        return val
      },
      get(val) {
        return this.$route
      }
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      // return this.$store.state.permission.routes
      return this.$router.options.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            // this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    // 关闭左侧
    colseLeft(view) {
      this.$store.commit('tagsView/colseLeft', view)
      this.moveToCurrentTag()
    },
    // 关闭右侧
    colseRight(view) {
      this.$store.commit('tagsView/colseRight', view)
      this.moveToCurrentTag()
    },

    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }

  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 64px;
  width: 100%;
  background: #f5f1f1;
  padding: 10px 10px;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  // .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      // border: 1px solid #d8dce5;
          border-radius: 6px;
      color: #b5abab;
      background: #fff;
      padding: 0 15px;
      font-size: 13px;
      margin-left: 10px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
      margin-left: 10px;
        height: 36px;
        background-color: #fff;
        color: #ffb200;
        border-color: #409EFF;
        // &::before {
        //   content: '';
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
    }
  // }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: transparent;
      }
    }
  }
}
</style>

<style lang="scss">
.divDropDown {
  position: absolute;
    top: 15px;
    right: 24px;
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    padding-right: 4px;
    justify-content: center;
    align-items: center;
}
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      font-size: 18px;
      height: 27px;
      vertical-align:middle;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: transparent;
        color: #fff;
      }
    }
  }
}
</style>
