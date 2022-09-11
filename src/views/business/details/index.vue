<template>
  <div class="container">
    <!-- 搜索卡片 -->
    <el-card class="elradis">
      <div class="steps">
        <div class="stepsDiv isActive">
          <div class="round">①</div>
          <div class="title">基础信息</div>
        </div>
        <div class="line" />
        <div class="stepsDiv">
          <div class="round">②</div>
          <div class="title">分配库位</div>
        </div>
      </div>
      <el-form :inline="true" :model="formData" class="demo-form-inline" :rules="rules">
        <el-row :gutter="28">
          <el-col :span="6">
            <el-form-item prop="code" label="货主编号" class="huozhu">
              <el-input v-model="formData.code" clearable :disabled="true" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="name" label="货主名称">
              <el-input v-model="formData.name" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="personName" label="联系人">
              <el-input v-model="formData.personName" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="phone" label="联系电话">
              <el-input v-model="formData.phone" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 2 -->
        <el-row :gutter="28">
          <el-col :span="6">
            <el-form-item prop="email" label="联系人邮箱">
              <el-input v-model="formData.email" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="location" label="省/市/区">
              <el-cascader
                v-model="formData.location"
                :options="options"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="address" label="详细地址">
              <el-input v-model="formData.address" clearable placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 2 -->
        <el-row :gutter="28">
          <el-col :span="12">
            <el-form-item prop="remark" label="备注">
              <el-input
                v-model="formData.remark"
                type="textarea"
                placeholder="请输入内容"
                resize="none"
              />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div style="border-top: solid 1px #ccc;padding:0 25px;display:flex;justify-content:center">
        <el-button round style="width:170px;margin:30px;background-color:#f8f5f5;border:0px solid #000" @click="reset">返回</el-button>
        <el-button round type="primary" style="width:170px; color:#000;margin:30px" @click="reset">下一步</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import { addowner, nextCode } from '@/api'
import options from '@/utils/chainLocation'
export default {
  name: 'Index',
  components: {

  },
  props: {

  },
  data() {
    return {
      options: options,
      formData: {
        code: '',
        name: '',
        personName: '',
        phone: '',
        email: '',
        location: '',
        address: '',
        remark: ''
      },
      rules: {
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [{ required: true, message: '请输入货主名称', trigger: 'blur' }],
        personName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }, { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入手机号格式', trigger: 'blur' }],
        location: [{ required: true, message: '请输入省/市/区', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }]
      }
    }
  },
  watch: {

  },
  mounted() {
    this.nextCode()
  },
  destroyed() {
  },
  methods: {
    // 获取下一个编码
    async  nextCode() {
      const res = await nextCode('HZ')
      this.formData.code = res
    },
    // 新增
    async addowner() {
      const res = await addowner(this.formData)
      console.log(res)
    }
  }
}
</script>
<style lang="scss"  scoped>
.container {
  margin: 20px 30px 30px 30px;
}
/* 顶部样式 */
.steps{
  display:flex;
  justify-content: center;
  position: relative;
  margin:10px 0 80px 0;
  .stepsDiv {
    width: 70px;
    font-size:16px;
    font-weight: 800;
    color:#ccc;
    margin: 0 225px;
    .round{
      font-size:25px;
      padding: 20px
    }

  }
  .isActive{
    color:#000
  }
  .line{
    position: absolute;
    top: -3px;
    left: 280px;
    border-bottom:2px solid #ccc;
    width:496px;
    height: 40px;
  }
}

</style>
<style scoped lang="scss" >
 ::v-deep .el-card{
  margin-bottom:20px
}
 ::v-deep.elradis {
  border-radius:12px ;

.el-card__body {
  padding: 40px 0px 20px 0px;
}
}

// form样式
::v-deep .el-form{
  margin: 30px;
}
::v-deep .el-form-item__label {
    position: absolute;
    top: -34px;
    font-size: 12px;
    font-weight: 500;
    color: #887e7e;
  }
::v-deep .el-form-item{
  width: 100%;
      margin-bottom: 52px;
}
  ::v-deep .el-form-item__content {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    border-radius: 6px;
    background: #f8f5f5 ;

  }
  ::v-deep .el-textarea__inner{
    background: #f8f5f5 !important;
    border: 1px solid #f8f5f5;
  }
   ::v-deep .huozhu{
    .el-input__inner{
    background: #f3ebeb  !important;
    }
  }
   ::v-deep .el-input {
    width: 100%;

  }
</style>
