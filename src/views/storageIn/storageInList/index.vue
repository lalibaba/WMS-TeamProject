<template>
  <div class="main-box">
    <search
      :input1="'入库单号'"
      :input2="'运单编号'"
      :input3="'货主名称'"
      @search="searchfn"
      @reset="searchfn"
    />
    <div class="content-box">
      <div class="box-top">
        <el-button class="search" @click="godetails">新增入库单</el-button>
        <el-button class="reset">生成收获任务</el-button>
      </div>
      <!-- 列表组件 -->
      <div class="box">
        <tablecomponent :tablelist="tablelist">
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
              label="入库单号"
              width="120"
            />
            <el-table-column
              prop="billCode"
              label="运单编号"
              width="120"
            />
            <el-table-column
              prop="planArrivalTime"
              label="计划到达时间"
              width="200"
            />
            <el-table-column
              prop="ownerCode"
              label="货主编号"
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
              width="120"
            />
            <el-table-column
              prop="license"
              label="车牌号"
              width="200"
            />
            <el-table-column
              prop="deliveryName"
              label="送货人名称"
              width="200"
            />
            <el-table-column
              prop="deliveryPhone"
              label="送货人电话"
              width="200"
            />
            <el-table-column
              prop="status"
              label="入库单状态"
              width="160"
            />
            <el-table-column
              prop="planNum"
              label="预计到货数"
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
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="250"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">查看详细</el-button>
              </template>
            </el-table-column>
          </template>
        </tablecomponent>
      </div>
      <!-- 分页组件 -->
      <mypage1 :total="total" :currentpage="currentpage" @currentpage="currentpagefn" />
    <!-- <detailsss /> -->
    </div>
  </div>
</template>

<script>
import search from '@/components/storageIn/search'
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { getstorageinlist } from '@/api/storageIn'
export default {
  name: 'StorageInList',
  components: {
    search,
    tablecomponent,
    mypage1
  },
  data() {
    return {
      options: {
        code: '',
        billCode: '',
        ownerName: '',
        current: 1,
        size: 10
      },
      tablelist: [],
      total: 0,
      currentpage: 1,
      pageSize: 1
    }
  },
  created() {
    this.getstorageinlist()
  },
  methods: {
    // 分页查询入库单明细
    async getstorageinlist() {
      try {
        const res = await getstorageinlist({ ...this.options })
        this.tablelist = res.records
        this.total = parseInt(res.total)
        this.options.current = res.current
      } catch (e) {
        console.log(e)
      }
    },
    // 新增入库单
    async godetails() {
      this.$router.push('/storageIn/storageInList/details')
    },
    // 查看详细
    handleClick() {
      this.$router.push('/storageIn/storageInList/list-details')
    },
    searchfn(value) {
      this.options.code = value.value1
      this.options.billCode = value.value2
      this.options.ownerName = value.value3
      this.getstorageinlist()
    },
    currentpagefn(val) {
      this.options.current = val
      this.getstorageinlist()
      console.log(val)
    }
  }
}
</script>

<style scoped>
.main-box{
  margin: 20px 30px 30px 30px;
}
.content-box{
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
}
.box-top{
  padding: 20px 30px;
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
.reset{
  width: 121px;
  height: 40px;
  background: rgb(248, 245, 245);
  box-shadow: 0px 2px 6px rgba(144, 142, 142, 0.17);;
  border-radius: 20px;
  color: rgb(51, 41, 41);
  font-family: PingFang SC;
  font-size: 14px;
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
