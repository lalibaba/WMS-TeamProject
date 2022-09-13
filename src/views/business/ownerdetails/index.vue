<template>
  <div class="container">
    <el-collapse>
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
                <p>{{ OwnerInfo.code }}</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>货主名称</p>
                <p>{{ OwnerInfo.name }}</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
              <el-col
                :span="5"
              ><p>联系人</p>
                <p>{{ OwnerInfo.personName }}</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>联系人电话</p>
                <p>{{ OwnerInfo.phone }}</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
            </el-row>
            <el-row>
              <el-col
                :span="5"
              ><p>联系人邮箱</p>
                <p>{{ OwnerInfo.email||'暂无' }}</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
              <el-col
                :span="5"
              ><p>省/市/区</p>
                <p>{{ OwnerInfo.location }}</p>
                <div
                  class="grid-content bg-purple-light"
                /></el-col>
              <el-col
                :span="5"
              ><p>详细地址</p>
                <p>{{ OwnerInfo.address }}</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>

            </el-row>
            <el-row>
              <el-col
                :span="5"
              ><p>备注</p>
                <p>{{ OwnerInfo.remark||'暂无' }}</p>
                <div
                  class="grid-content bg-purple"
                /></el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-card>
      <el-card class="elradis">
        <el-collapse-item>
          <template slot="title">
            <div class="title">
              <span>库位信息</span>
              <span>收起</span>
            </div>
          </template>
          <div class="infoTip">
            总计：{{ total }}个库位 {{ OwnerInfo.goodsTotal }}个 货品
          </div>
          <div>
            <!-- 表格 -->
            <template v-if="tableData.length!==0">
              <!-- v-fit-columns -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                stripe
                :header-cell-style="{
                  textAlign: 'center',
                  height: '44px',
                  background: '#f9f6ee',
                  padding:'0',
                  fontSize: '13px'
                }"
                :cell-style="{height: '44px',padding:'0',textAlign: 'center',}"
              >

                <el-table-column
                  type="index"
                  label="序号"
                />
                <el-table-column
                  prop="warehouseName"
                  label="仓库名称"
                />
                <el-table-column
                  prop="areaName"
                  label="库区名称"
                />
                <el-table-column
                  prop="locationCode"
                  label="库位编号"
                />
                <el-table-column
                  prop="locationName"
                  label="库位名称"
                />

              </el-table>
              <!-- 分页组件 -->
              <div style="display: flex; justify-content: center;margin:20px 0">
                <el-pagination
                  :current-page="page.current"
                  :page-sizes="[5,10, 20, 30, 40]"
                  :page-size="page.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>

            </template>
          </div>
        </el-collapse-item>
      </el-card>
    </el-collapse>
  </div>
</template>

<script>
import { getOwnerDetail, getPageDetail } from '@/api'
export default {
  name: 'Details2',
  components: {},
  props: {},
  data() {
    return {
      OwnerInfo: {},
      tableData: [],
      total: 0,
      page: {
        current: 1,
        size: 10,
        ownerId: this.$route.params.id
      }
    }
  },
  watch: {},
  created() {
    this.getOwnerDetail()
    this.getPageDetail()
  },
  destroyed() {},
  methods: {

    // 分页
    handleSizeChange(val) {
      this.page.size = val
      this.getPageDetail()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getPageDetail()
    },
    async getOwnerDetail() {
      this.OwnerInfo = await getOwnerDetail(this.$route.params.id)
    },
    // 获取货主库位列表
    async  getPageDetail() {
      const { records, size, total, current } = await getPageDetail(this.page)
      this.tableData = records
      this.total = +total
      this.page.current = +current // 当前页
      this.page.size = +size // 当前页数
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
  // .el-collapse-item__arrow {
  //   transform: rotateZ(-90deg);
  // }
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
.infoTip {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 25px;
    margin: 20px 0;
}

</style>
