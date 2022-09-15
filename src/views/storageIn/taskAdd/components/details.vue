<template>
  <div class="main-box">
    <div class="top-box">
      <div class="title-box">上架任务</div>
      <div class="progress-box">
        <el-progress :percentage="percentage" :stroke-width="6" :color="'#6ee696'" :show-text="false" />
      </div>
      <div>{{ goodsGroundingTotal }}/{{ goodsRealTotal }}</div>
    </div>
    <div class="box">
      <tablecomponent :tablelist="data">
        <template v-slot:table>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          />
          <el-table-column
            prop="goodsCode"
            label="货品编号"
            width="160"
          />
          <el-table-column
            prop="goodsName"
            label="货品名称"
            width="160"
          />
          <el-table-column
            prop="goodsTypeName"
            label="货品类型"
            width="160"
          />
          <el-table-column
            prop="ownerName"
            label="货主名称"
            width="160"
          />
          <el-table-column
            prop="warehouseName"
            label="仓库"
            width="160"
          />
          <el-table-column
            prop="realNum"
            label="货品数量"
            width="160"
          />
          <el-table-column
            prop="groundingNum"
            label="实上数量"
            width="160"
          />
          <el-table-column
            prop="groundingDifferenceNum"
            label="差异数"
            width="160"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small">查看上架信息</el-button>
            </template>
          </el-table-column>
        </template>
      </tablecomponent>
    </div>
    <div class="mypage">
      <mypage1 :total="total" />
    </div>
    <div class="btnbox">
      <el-button class="gobtn" @click="btnback">返回</el-button>
    </div>
  </div>
</template>

<script>
import tablecomponent from '@/components/storageIn/table1'
import mypage1 from '@/components/storageIn/mypage1'
import { receiptListsum } from '@/api/storageIn'
export default {
  name: 'Details',
  components: {
    tablecomponent,
    mypage1
  },
  data() {
    return {
      goodsRealTotal: 0,
      goodsGroundingTotal: 0
    }
  },
  computed: {
    data() {
      return this.$store.getters.groundingDetail.records
    },
    total() {
      return parseInt(this.$store.getters.groundingDetail.total)
    },
    masterId() {
      return this.$store.getters.groundingDetail.records[0].masterId
    },
    percentage() {
      return this.goodsGroundingTotal / this.goodsRealTotal * 100
    }
  },
  created() {
    this.receiptListsum()
  },
  methods: {
    btnback() {
      this.$router.go(-1)
    },
    async receiptListsum() {
      const res = await receiptListsum(this.masterId)
      this.goodsRealTotal = res.goodsRealTotal
      this.goodsGroundingTotal = res.goodsGroundingTotal
    }
  }
}
</script>

<style scoped>
.main-box{
  background-color: #fff;
  margin: 20px 30px 30px 30px;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgba(144,142,142,.17);
}
.progress-box{
  width: 200px;
}
.top-box{
  display:flex;
  align-items: center;
  padding: 32px 0 40px 20px;
}
.top-box .title-box{
  text-align: center;
}
.mypage{
  margin: 0 auto;
  text-align: center;
  padding-top: 18px;
  padding-bottom: 34px;
}
.btnbox{
  text-align: center;
}
.btnbox .gobtn{
  background: #f8f5f5;
  color: #332929;
  height: 40px;
  width: 170px;
  border-radius: 20px;
  margin: 0 15px;
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
