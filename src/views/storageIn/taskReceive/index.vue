<template>
  <div class="main-box">
    <search :input1="'上架编号'" :input2="'入库单号'" :input3="'货主名称'" />
    <div class="content-box">
      <div class="box-top">
        <el-button class="search">收货完成</el-button>
      </div>
      <div class="box">
        <tablecomponent>
          <template v-slot:table>
            <el-table-column
              type="selection"
              width="50"
            />
            <el-table-column
              type="index"
              label="序号"
              width="50"
            />
            <el-table-column
              prop="name"
              label="收货任务编号"
              width="120"
            />
            <el-table-column
              prop="province"
              label="入库单号"
              width="120"
            />
            <el-table-column
              prop="city"
              label="创建人"
              width="120"
            />
            <el-table-column
              prop="address"
              label="创建时间"
              width="120"
              sortable
            />
            <el-table-column
              prop="zip"
              label="货主名称"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="仓库名称"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="库区名称"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="预计到货数"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="收获状态"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="收货人"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="实收总数"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="收获差异"
              width="120"
            />
            <el-table-column
              prop="zip"
              label="收货完成时间"
              width="120"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="godetails(scope.row)">查看详细</el-button>
              </template>
            </el-table-column>
          </template>
        </tablecomponent>
      </div>
      <mypage1 />
    </div>
  </div>
</template>

<script>
import search from '@/components/storageIn/search'
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { receivingPageDetail } from '@/api/taskReceive'
export default {
  name: 'TaskReceive',
  components: {
    search,
    tablecomponent,
    mypage1
  },
  props: {

  },
  data() {
    return {

    }
  },
  watch: {

  },
  mounted() {
    this.receivingPageDetail()
  },
  destroyed() {
  },
  methods: {
    godetails() {
      this.$router.push('/storageIn/taskReceive/details')
    },
    async receivingPageDetail() {
      await receivingPageDetail()
    }
  }
}
</script>
<style scoped>
.main-box{
  margin: 20px 20px 30px 20px;
}
.main-box .content-box{
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
}
.box-top{
  background-color: #fff;
  padding: 30px;
}
.search{
  background: rgb(0, 190, 118);
  box-shadow: 0px 2px 9px rgba(255, 178, 0, 0.47);;
  border-radius: 20px;
  width: 126px;
  height: 40px;
  color: rgb(255, 255, 255);
  font-family: PingFang SC;
  font-size: 14px;
  letter-spacing: 0px;
  text-align: center;
}
/deep/ .box .el-table th{
  text-align: center;
  background-color: #f8f5f5;
}
/deep/ .el-table--enable-row-transition .el-table__body td{
  text-align: center;
}
/deep/ .el-form-item .el-form-item__label {
  font-size: 12px;
  font-family: PingFangSC,PingFangSC-Medium;
  font-weight: 500;
  color: #887e7e;
  padding: 0;
}
</style>
