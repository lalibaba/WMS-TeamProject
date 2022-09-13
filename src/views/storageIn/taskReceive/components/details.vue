<template>
  <div class="main-box">
    <div class="box">
      <tablecomponent :tablelist="data">
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
            prop="ownerName"
            label="货主名称"
            width="150"
          />
          <el-table-column
            prop="goodsCode"
            label="货品编码"
            width="150"
          />
          <el-table-column
            prop="goodsName"
            label="货品名称"
            width="150"
          />
          <el-table-column
            prop="goodsTypeName"
            label="货品类型"
            width="150"
          />
          <el-table-column
            prop="goodsPrice"
            label="货品单价(天)"
            width="150"
          />
          <el-table-column
            prop="goodsGuaranteeDay"
            label="保质天数(天)"
            width="150"
          />
          <el-table-column
            prop="goodsUnit"
            label="单位"
            width="150"
          />
          <el-table-column
            prop="goodsVolume"
            label="体积(m³)"
            width="150"
          />
          <el-table-column
            prop="planNum"
            label="到货数量"
            width="150"
          />
          <el-table-column
            prop="realNum"
            label="实收总数"
            width="150"
          />
          <el-table-column
            prop="realDifferenceNum"
            label="收货差异"
            width="150"
          />
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
export default {
  name: 'Details',
  components: {
    tablecomponent,
    mypage1
  },
  computed: {
    data() {
      return this.$store.getters.receivingDetail.records
    },
    total() {
      return parseInt(this.$store.getters.receivingDetail.total)
    }
  },
  methods: {
    btnback() {
      this.$router.go(-1)
    },
    format() {
      return 1
    }
  }
}
</script>

<style scoped>
.box{
  background-color: #fff;
  margin: 20px 15px;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgba(144,142,142,.17);
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
