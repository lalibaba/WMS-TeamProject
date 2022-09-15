<template>
  <div class="main-box">
    <search
      :input1="'任务编号'"
      :input2="'货主名称'"
      :input3="'收货状态'"
      :isinput3="false"
      @search="searchfn"
      @reset="resetfn"
    />
    <div class="content-box">
      <div class="box-top">
        <el-button class="search">收货完成</el-button>
      </div>
      <div class="box">
        <tablecomponent :tablelist="receivinglist">
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
              prop="code"
              label="收货任务编号"
              width="160"
            />
            <el-table-column
              prop="receiptCode"
              label="入库单号"
              width="160"
            />
            <el-table-column
              prop="createName"
              label="创建人"
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
              prop="planNum"
              label="预计到货数"
              width="160"
            />
            <el-table-column
              prop="statusname"
              label="收获状态"
              width="160"
              :filters="receivingstatus"
              :filter-method="filterhandle"
            />
            <el-table-column
              prop="receiverName"
              label="收货人"
              width="160"
            />
            <el-table-column
              prop="realNum"
              label="实收总数"
              width="160"
            />
            <el-table-column
              prop="differenceNum"
              label="收获差异"
              width="160"
            />
            <el-table-column
              prop="completionTime"
              label="收货完成时间"
              width="160"
              sortable
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
      </div>
      <div class="pagebox">
        <mypage1 :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/storageIn/search'
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { receivingPageDetail } from '@/api/taskReceive'
import { receiptListpageDetail } from '@/api/storageIn'
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
      receivinglist: [],
      total: 0,
      options: {
        code: '',
        ownerName: '',
        current: 1,
        size: 10
      },
      status: '',
      receivingstatus: [
        {
          value: 1,
          text: '待分配'
        },
        {
          value: 2,
          text: '收货中'
        },
        {
          value: 3,
          text: '收货完成'
        },
        {
          value: 4,
          text: '已取消'
        }
      ]
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
    // 往对象里加statusname属性,值为代表状态的数字对应的中文
    changestatus(data) {
      const statusname = 'statusname'
      data.forEach(ele => {
        this.receivingstatus.forEach(item => {
          if (item.value === ele.status) {
            ele[statusname] = item.text
          }
        })
      })
      return data
    },
    // 查看详细
    async godetails(masterId) {
      const res = await receiptListpageDetail({ masterId: masterId })
      console.log(res)
      this.$store.dispatch('storageIn/receivingdetails', res)
      this.$router.push('/storageIn/taskReceive/details')
    },
    // 查询收货任务
    async receivingPageDetail() {
      const res = await receivingPageDetail({ ...this.options })
      this.receivinglist = this.changestatus(res.records)
      // this.receivinglist = res.records
      console.log(this.receivinglist)
      this.total = parseInt(res.total)
    },
    // 搜索功能
    async searchfn(value) {
      console.log(value)
      this.options.code = value.value1
      this.options.ownerName = value.value2
      this.status = value.value3
      const res = await receivingPageDetail({ ...this.options, status: this.status })
      this.receivinglist = this.changestatus(res.records)
      // this.receivinglist = res.records
      console.log(this.receivinglist)
      this.total = parseInt(res.total)
    },
    // 重置
    resetfn() {
      this.options.code = ''
      this.options.ownerName = ''
      this.status = ''
      this.receivingPageDetail()
    },
    // 状态筛选过滤器
    filterhandle(value, row, column) {
      console.log(value)
      console.log(row)
      console.log(column)
      return row.status === value
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
.pagebox{
  padding-top: 18px;
  padding-bottom: 34px;
}
/deep/ .el-table--scrollable-x .el-table__body-wrapper {
    padding-bottom: 5px;
    margin-bottom: 5px;
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
