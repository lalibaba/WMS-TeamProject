<template>
  <div>
    <libraryfrom class="buttom">
      <span slot="buttom">
        <div class="line">
          <el-steps :active="active" finish-status="success">
            <el-step title="请填写基本信息" />
            <el-step title="填写盘点清单" />
          </el-steps>
        </div>
        <el-form :inline="true" label-position="top">
          <el-form-item style="width: 24%" label="盘点单号">
            <el-input readonly style="width: 92%" placeholder="禁止状态" />
          </el-form-item>
          <el-form-item style="width: 24%" label="盘点原因">
            <el-select v-model="name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item style="width: 24%" label="盘点维度">
            <el-select v-model="name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item style="width: 24%" label="盘点类型">
            <el-select v-model="name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item style="width: 24%" label="库区">
            <el-select v-model="name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item style="width: 24%" label="计划时间">
            <el-col :span="22">
              <el-date-picker v-model="date" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
          </el-form-item>
        </el-form>
        <div class="buttonBox">
          <el-row>
            <el-button style="width:10%;" round>返回</el-button>
            <el-button style="width:10%;" type="primary" round>下一步</el-button>
          </el-row>

        </div>
      </span>
    </libraryfrom>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      active: 0,
      name: '',
      date: '',
      readonly: true
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style>
.el-form-item__label{
    font-size: 12px;
    color:#887e7e;
}
.buttonBox{
        padding: 25px 0 0;
    margin: 0 -30px -5px;
    border-top: 1px solid #f5efee;
    text-align: center;
}
</style>
<style scoped>
.buttom{
    padding: 30px;
}
.line{
    width:400px;
    height:100px;
    margin-top: 56px;
    margin-left: 30% ;
}
</style>
