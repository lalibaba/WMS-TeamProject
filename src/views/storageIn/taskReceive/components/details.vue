<template>
  <div class="box">
    <tablecomponent>
      <template v-slot:table>
        <el-table-column
          type="index"
          label="序号"
          width="120"
        />
        <el-table-column
          prop="name"
          label="货主名称"
          width="120"
        />
        <el-table-column
          prop="province"
          label="货品编号"
          width="120"
        />
        <el-table-column
          prop="city"
          label="货品名称"
          width="120"
        />
        <el-table-column
          prop="address"
          label="货品类型"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="货品单价(元)"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="保质天数(天)"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="单位"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="体积(m³)"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="到货数量"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="实收总数"
          width="120"
        />
        <el-table-column
          prop="zip"
          label="收货差异"
          width="120"
        />
      </template>
    </tablecomponent>
    <div class="mypage">
      <mypage1 />
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
</style>
