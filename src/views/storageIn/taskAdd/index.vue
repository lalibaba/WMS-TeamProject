<template>
  <div class="main-box">
    <search
      :input1="'上架编号'"
      :input2="'入库单号'"
      :input3="'货主名称'"
      @search="searchfn"
      @reset="searchfn"
    />
    <div class="box">
      <tablecomponent :tablelist="groundinglist">
        <template v-slot:table>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column
            prop="code"
            label="上架任务编号"
            width="160"
          />
          <el-table-column
            prop="receiptCode"
            label="入库单号"
            width="160"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="160"
            sortable
          />
          <el-table-column
            prop="ownerName"
            label="货主名称"
            width="160"
            sortable
          />
          <el-table-column
            prop="warehouseName"
            label="仓库名称"
            width="160"
          />
          <el-table-column
            prop="areaName"
            label="库区名称"
            width="160"
          />
          <el-table-column
            prop="personName"
            label="负责人"
            width="160"
          />
          <el-table-column
            prop="status"
            label="上架状态"
            width="160"
          />
          <el-table-column
            prop="planNum"
            label="货品数量"
            width="160"
          />
          <el-table-column
            prop="realNum"
            label="实收总数"
            width="160"
          />
          <el-table-column
            prop="groundingNum"
            label="上架数量"
            width="160"
          />
          <el-table-column
            prop="differenceNum"
            label="差异总数"
            width="160"
          />
          <el-table-column
            prop="completionTime"
            label="收货完成时间"
            width="160"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="godetails(scope.row.masterId)">查看详细</el-button>
            </template>
          </el-table-column>
        </template>
      </tablecomponent>
      <mypage1 :total="total" />
    </div>
  </div>
</template>

<script>
import search from '@/components/storageIn/search'
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { groundingpageDetail, receiptListpageDetail } from '@/api/storageIn'
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
      groundinglist: [],
      options: {
        code: '',
        receiptCode: '',
        ownerName: '',
        current: 1,
        size: 10
      },
      total: 0
    }
  },
  watch: {

  },
  mounted() {
    this.groundingpageDetail()
  },
  destroyed() {
  },
  methods: {
    // 查看详细
    async godetails(masterId) {
      const res = await receiptListpageDetail({ masterId: masterId })
      console.log(res)
      this.$store.dispatch('storageIn/groundingDetail', res)
      this.$router.push('/storageIn/taskAdd/details')
    },
    // 查询上架任务
    async groundingpageDetail() {
      const res = await groundingpageDetail({ ...this.options })
      this.groundinglist = res.records
      this.total = parseInt(res.total)
    },
    searchfn(value) {
      console.log(value)
      this.options.code = value.value1
      this.options.receiptCode = value.value2
      this.options.ownerName = value.value3
      this.groundingpageDetail()
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
