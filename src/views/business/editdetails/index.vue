<template>
  <div class="container">
    <!-- 搜索卡片 -->
    <el-card class="elradis">

      <div class="steps">
        <el-steps :space="500">
          <el-step :status="ischange?'process':'success'" title="基础信息" />
          <el-step :status="ischange?'wait':'process '" title="分配库位" style="flex-basis: 100px" />
        </el-steps>
      </div>

      <!-- 基础信息 -->
      <template v-if="ischange">
        <el-form
          ref="formData"
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          :rules="rules"
        >
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="code" label="货主编号" class="huozhu">
                <el-input
                  v-model="formData.code"
                  clearable
                  :disabled="true"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="货主名称">
                <el-input
                  v-model="formData.name"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="personName" label="联系人">
                <el-input
                  v-model="formData.personName"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="phone" label="联系电话">
                <el-input
                  v-model="formData.phone"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 2 -->
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="email" label="联系人邮箱">
                <el-input
                  v-model="formData.email"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="location" label="省/市/区">
                <el-cascader
                  v-if="isShowAddressInfo"
                  ref="cascader"
                  v-model="Location"
                  clearable
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="address" label="详细地址">
                <el-input
                  v-model="formData.address"
                  clearable
                  placeholder="请输入"
                />
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
        <div
          style="
            border-top: solid 1px #ccc;
            padding: 0 25px;
            display: flex;
            justify-content: center;
          "
        >
          <el-button
            round
            style="
              width: 170px;
              margin: 30px;
              background-color: #f8f5f5;
              border: 0px solid #000;
            "
            @click="$router.push('/business/goodsOwner')"
          >返回</el-button>
          <el-button
            round
            type="primary"
            style="width: 170px; color: #000; margin: 30px"
            @click="editOwner"
          >下一步</el-button>
        </div>
      </template>
      <!-- 分配库位 -->
      <SetPoint v-else :owner-id="ownerId" />
    </el-card>
  </div>
</template>

<script>
import { nextCode, getOwnerDetail, editOwner } from '@/api'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import SetPoint from '../component/setPoint.vue'
export default {
  name: 'Index',
  components: { SetPoint },
  props: {},
  data() {
    return {
      // prop1:{
      //   expandTrigger: 'hover',
      //   label:
      // },
      // prop2:{

      // },
      isShowAddressInfo: true,
      ownerId: '',
      ischange: true,
      options: regionData,
      Location: [],
      formData: {
        id: null,
        code: '',
        name: 'gfd',
        personName: 'hgf',
        phone: '18270164631',
        email: '5165184@qq.com',
        location: '',
        address: 'hg',
        remark: 'jgh',
        province: '',
        area: '',
        city: ''
      },
      rules: {
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [{ required: true, message: '请输入货主名称', trigger: 'blur' }],
        personName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入手机号格式',
            trigger: 'blur'
          }
        ],
        location: [
          { required: true, message: '请输入省/市/区', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  created() {
    this.getOwnerDetail()
  },
  mounted() {
    // setTimeout(() => {
    //   this.isShowAddressInfo = true
    // }, 500)
  },
  destroyed() {},
  methods: {
    // 回显货主信息
    async getOwnerDetail() {
      const res = await getOwnerDetail(this.$route.params.id)
      this.formData = res
      // 处理回显问题 v-model中的Location 单独处理
      res.location = res.location.split('/')
      this.Location = []
      this.Location[0] = TextToCode[res.location[0]].code
      this.Location[1] = TextToCode[res.location[0]][res.location[1]].code
      this.Location[2] = TextToCode[res.location[0]][res.location[1]][res.location[2]].code
    },
    handleChange(val) {
      this.formData.province = val[0]
      this.formData.area = val[1]
      this.formData.city = val[2]
      this.formData.location =
        CodeToText[val[0]] +
        '/' +
        CodeToText[val[1]] +
        '/' +
        CodeToText[val[2]]
    },
    // 获取下一个编码
    async nextCode() {
      const res = await nextCode('HZ')
      this.formData.code = res
    },
    // 修改请求
    async editOwner() {
      try {
        await this.$refs.formData.validate()
        const { id: ownerId } = await editOwner(this.formData)
        this.ownerId = ownerId
        this.$message.success('修改成功')
        this.ischange = false
      } catch (e) {
        // this.$message.error('新增失败')
        console.dir(e)
      }
    }

    // // 新增
    // async addowner() {
    //   try {
    //     await this.$refs.formData.validate()
    //     const { id: ownerId } = await addowner(this.formData)
    //     this.ownerId = ownerId
    //     this.$message.success('新增成功')
    //     this.ischange = false
    //   } catch (e) {
    //     // this.$message.error('新增失败')
    //     console.dir(e)
    //   }
    // }
  }
}
</script>
<style lang="scss"  scoped>
.container {
  margin: 20px 30px 30px 30px;
}
/* 顶部样式 */

</style>
<style scoped lang="scss" >
::v-deep .el-card {
  margin-bottom: 20px;
}
::v-deep.elradis {
  border-radius: 12px;

  .el-card__body {
    padding: 40px 0px 20px 0px;
  }
}

// form样式
::v-deep .el-form {
  margin: 30px;
}
::v-deep .el-form-item__label {
  position: absolute;
  top: -34px;
  font-size: 12px;
  font-weight: 500;
  color: #887e7e;
}
::v-deep .el-form-item {
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
  background: #f8f5f5;
}
::v-deep .el-textarea__inner {
  background: #f8f5f5 !important;
  border: 1px solid #f8f5f5;
}
::v-deep .huozhu {
  .el-input__inner {
    background: #f3ebeb !important;
  }
}
::v-deep .el-input {
  width: 100%;
}

 ::v-deep .steps {
     width: 600px;
    margin: 0 auto;
    height: 100px;
    margin-top: 56px;
    .el-step{
      &:last-child{
    flex-basis: 100px !important;
      }
    }

}

</style>
