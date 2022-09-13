<template>
  <div class="container">
    <el-card class="elradis">

      <!-- 基础信息 -->
      <template>
        <el-form
          ref="formData"
          :inline="true"
          :model="formData"
          class="demo-form-inline"
          :rules="rules"
        >
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="code" label="货品编号" class="huozhu">
                <el-input
                  v-model="formData.code"
                  clearable
                  :disabled="true"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="goodsTypeId" label="货品类型">

                <el-autocomplete
                  v-model="formData.goodsTypeId"
                  clearable
                  :fetch-suggestions="querySearchAsync1"
                  placeholder="请输入"
                  suffix-icon="el-icon-search"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="name" label="货品名称">
                <el-input
                  v-model="formData.name"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="barCode" label="货品条码">
                <el-input
                  v-model="formData.barCode"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 2 -->
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="ownerName" label="货主">
                <el-autocomplete
                  v-model="formData.ownerName"
                  clearable
                  :fetch-suggestions="querySearchAsync2"
                  placeholder="请输入"
                  suffix-icon="el-icon-search"
                  @select="getAllareaList"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="inspectionType" label="质检方式">
                <el-select v-model="formData.inspectionType" placeholder="请选择">
                  <el-option v-for="(item,index) in inspectionType" :key="index" :label="item" :value="index" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="temperatureType" label="温度要求">
                <el-select v-model="formData.temperatureType" placeholder="请选择">
                  <el-option v-for="(item,index) in temperatureType" :key="index" :label="item" :value="index" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="bearingType" label="承重要求">
                <el-select v-model="formData.bearingType" placeholder="请选择">
                  <el-option v-for="(item,index) in bearingType" :key="index" :label="item" :value="index" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--3-->
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="volume" label="体积">
                <el-input
                  v-model="formData.volume"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="areaName" label="指定货区">
                <el-select v-model="formData.areaName" placeholder="请选择">
                  <el-option v-for="(item,index) in 2" :key="index" :label="item" :value="index" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="price" label="单价">
                <el-input
                  v-model="formData.price"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="unit" label="单位">
                <el-input
                  v-model="formData.unit"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!--4-->
          <el-row :gutter="28">
            <el-col :span="6">
              <el-form-item prop="guaranteeDay" label="质保天数">
                <el-input
                  v-model="formData.guaranteeDay"
                  clearable
                  placeholder="请输入"
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
            @click="addGood"
          >提交</el-button>
        </div>
      </template>
      <!-- 分配库位 -->
      <!-- <SetPoint v-else :owner-id="ownerId" /> -->
    </el-card>
  </div>
</template>

<script>
import { goodsTypeVague, ownerVague, nextCode, getOwnerDetail, addGood, getAllareaList } from '@/api'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
// import SetPoint from '../component/setPoint.vue'
export default {
  name: 'Index',
  // components: { SetPoint },
  props: {},
  data() {
    return {
      goodsTypeVagues: [],
      ownerVagues: [],
      inspectionType: { BCL: '不处理', QJ: '全检', CJ: '抽检' },
      temperatureType: { CW: '常温', LC: '冷藏', HW: '恒温' },
      bearingType: { ZX: '重型', QX: '轻型', BX: '中型' },

      ownerId: '',
      options: regionData,
      formData: {
        code: '',
        goodsTypeId: 'hh',
        name: '默认',
        barCode: 'hh',
        ownerName: '默认',
        inspectionType: '',
        temperatureType: '',
        bearingType: '',
        volume: '88',
        areaName: '',
        price: '',
        unit: '',
        guaranteeDay: '88'
      },
      rules: {
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        goodsTypeId: [{ required: true, message: '请输入货品类型名称/货品类型编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入货品名称', trigger: 'blur' }],
        barCode: [{ required: true, message: '请输入货品条码', trigger: 'blur' }],
        ownerName: [{ required: true, message: '请输入货主', trigger: 'blur' }],
        inspectionType: [{ required: true, message: '请输入质检方式', trigger: 'blur' }],
        temperatureType: [{ required: true, message: '请输入温度要求', trigger: 'blur' }],
        bearingType: [{ required: true, message: '请输入承重要求', trigger: 'blur' }],
        volume: [{ required: true, message: '请输入体积', trigger: 'blur' }]

      }
    }
  },
  watch: {},
  created() {
    // this.getOwnerDetail()
    this.goodsTypeVague()
    this.ownerVague()
  },
  mounted() {

  },
  destroyed() {},
  methods: {
    // // 回显货品信息
    // async getOwnerDetail() {
    //   const res = await getOwnerDetail(this.$route.params.id)
    //   this.formData = res
    //   // 处理回显问题 v-model中的Location 单独处理
    //   res.location = res.location.split('/')
    //   this.Location = []
    //   this.Location[0] = TextToCode[res.location[0]].code
    //   this.Location[1] = TextToCode[res.location[0]][res.location[1]].code
    //   this.Location[2] = TextToCode[res.location[0]][res.location[1]][res.location[2]].code
    // },

    // 货品类型建议
    querySearchAsync1(queryString, cb) {
      const restaurants = this.goodsTypeVagues
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results) // 有值则没有加载符号
      }, 3000 * Math.random())
    },
    async goodsTypeVague() {
      const res = await goodsTypeVague({ params: '' })
      this.goodsTypeVagues = res.map(ele => {
        ele.value = ele.name
        return ele
      })
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 货主建议
    querySearchAsync2(queryString, cb) {
      const restaurants = this.ownerVagues
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results) // 有值则没有加载符号
      }, 3000 * Math.random())
    },
    async ownerVague() {
      const res = await ownerVague({ params: '' })
      this.ownerVagues = res.map(ele => {
        ele.value = ele.name
        return ele
      })
    },
    // 获取货主货区
    async getAllareaList(item) {
      await getAllareaList({ ownerId: item.id })
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
    async addGood() {
      try {
        await this.$refs.formData.validate()
        const { id: ownerId } = await addGood(this.formData)
        this.ownerId = ownerId
        this.$message.success('修改成功')
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

</style>
