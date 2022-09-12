<template>
  <div class="container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-card class="elradis">
        <el-collapse-item title="基础信息">
          <template slot="title">
            <div class="title">
              <span>基础信息</span>
              <span>收起</span>
            </div>
          </template>
          <div class="baseInfo">
            <el-row>
              <el-col
                :span="5"
              ><p>货主编号</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>货主名称</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
              <el-col
                :span="5"
              ><p>联系人</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>联系人电话</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
            </el-row>
            <el-row>
              <el-col
                :span="5"
              ><p>联系人邮箱</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>省/市/区</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
              <el-col
                :span="5"
              ><p>详细地址</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>联系人电话</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
            </el-row>
            <el-row>
              <el-col
                :span="5"
              ><p>备注</p>
                <p>xxx</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-card>
      <el-card class="elradis">
        <el-collapse-item title="库位信息">
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
          <div>
            在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </div>
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
</template>

<script>
import { getOwnerDetail } from '@/api'
export default {
  name: 'Details2',
  components: {},
  props: {},
  data() {
    return {}
  },
  watch: {},
  created() {
    this.getOwnerDetail()
  },
  destroyed() {},
  methods: {
    async getOwnerDetail() {
      await getOwnerDetail(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss"   scoped>
.container {
  margin: 20px 30px 30px 30px;

  ::v-deep .el-collapse {
    border-bottom: 0px solid #ebeef5;
    border-top: 0px solid #ebeef5;
    .el-collapse-item__header {
      border-bottom: 0px solid #ebeef5;
    }
  }
}

::v-deep .elradis {
  border-radius: 12px;
  margin-bottom: 20px;

  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .el-card__body {
    padding: 10px 30px;
  }
  .el-collapse-item__arrow {
    transform: rotateZ(-90deg);
  }
  .el-collapse-item__wrap {
    border: 0px solid #ebeef5;
  }
}
 ::v-deep.el-row{
      margin-bottom: 20px;
}
.baseInfo {
  margin-top:20px;
  background: #fdfcf9;
  border: 1px solid #f7f2f1;
  padding: 25px 30px;
  p{
    margin: 1px;
    &:first-child{
        color: #887e7e;
    }
  }
}

</style>
