<template>
  <div class="app-container">
    <el-card class="my-card">
      <el-form ref="warehouseForm" :model="wareHouseData" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库编码">
              <el-input v-model="wareHouseData.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库名称" prop="name">
              <el-input v-model="wareHouseData.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库类型" prop="type">
              <el-select v-model="wareHouseData.type" placeholder="请选择">
                <el-option v-for="item in warehouseType" :key="item.type" :label="item.name" :value="item.type" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="省/市/区" prop="location1">
              <el-cascader
                ref="local"
                v-model="wareHouseData.location1"
                :options="options"
                :props="{ expandTrigger: 'hover'}"
                @change="handleChangeLocal"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="详细地址">
              <el-input v-model="wareHouseData.address" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8" class="wareHouseStatus">
            <el-form-item label="仓库状态" prop="status">
              <el-radio-group v-model="wareHouseData.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓库面积">
              <el-input v-model="wareHouseData.surface" placeholder="请输入"><template slot="append">m³</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="personName">
              <el-input v-model="wareHouseData.personName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="wareHouseData.phone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="mt-btn">
          <el-button round class="reset-btn" @click="$router.back()">返回</el-button>
          <el-button round class="search-btn" @click="wareHouseConfirm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import { warehouseType } from '@/api/constant/warehouse'
import { checkPhoneNum } from '@/utils/validate'
import { getWareHouseCode, addNewWarehouse, getWareHouseDetail, changeNewWarehouse } from '@/api/baseInfo'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!checkPhoneNum(value) && value !== '') {
        return callback(new Error('请输入正确的电话号码'))
      } else {
        return callback()
      }
    }
    return {
      wareHouseData: {
        address: '',
        area: '',
        city: '',
        code: '',
        location1: [],
        location: '',
        name: '',
        personName: '',
        phone: '',
        province: '',
        status: '1',
        surface: '',
        type: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择仓库类型', trigger: 'change' }
        ],
        location1: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择仓库状态', trigger: 'blur' }
        ],
        personName: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      warehouseType: warehouseType,
      options: regionData
    }
  },
  async mounted() {
    // 判断是新增还是编辑修改仓库
    if (this.$route.params.id !== 'null') {
      this.$route.meta.title = '编辑仓库'
      this.getWareHouseDetail(this.$route.params.id)
    } else {
      this.wareHouseData.code = await getWareHouseCode()
    }
    this.$store.dispatch('tagsView/addView', this.$route)
  },
  methods: {
    async wareHouseConfirm() {
      try {
        await this.$refs.warehouseForm.validate()
        this.$route.params.id ? await changeNewWarehouse(this.wareHouseData) : await addNewWarehouse(this.wareHouseData)
        this.$message.success('恭喜你，提交成功')
        this.$router.back()
        this.$refs.warehouseForm.resetField()
        this.wareHouseData = {
          address: '',
          area: '',
          city: '',
          code: '',
          location1: [],
          location: '',
          name: '',
          personName: '',
          phone: '',
          province: '',
          status: '1',
          surface: '',
          type: ''
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getWareHouseDetail(id) {
      const res = await getWareHouseDetail(id)
      res.location1 = [res.province, res.city, res.area]
      res.status = res.status.toString()
      this.wareHouseData = res
    },
    handleChangeLocal(val) {
      this.options.forEach(ele => {
        if (ele.value === val[0]) {
          this.wareHouseData.location = ele.label + '/'
          ele.children.forEach(item => {
            if (item.value === val[1]) {
              this.wareHouseData.location += item.label + '/'
              item.children.forEach(i => {
                if (i.value === val[2]) {
                  this.wareHouseData.location += i.label
                }
              })
            }
          })
        }
      })
      // this.options.children.forEach(ele => { if (ele.value === val[1]) { this.wareHouseData.location += ele.label } })
      this.wareHouseData.province = val[0]
      this.wareHouseData.city = val[1]
      this.wareHouseData.area = val[2]
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card{
  padding-top: 31px;
  padding-bottom: 30px;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  box-sizing: border-box;
  ::v-deep .el-card__body{
        padding: 0 15px;
        .wareHouseStatus{
          .el-form-item{
            margin-bottom: 0;
            .el-radio-group{
              position: absolute;
              top:40px;
              left: 0;
              color: #1f2d3d;
            }
          }
        }
        .el-form-item{
            margin: unset;
            padding-left: 15px;
            padding-right: 15px;
            margin-bottom: 30px;
            .el-form-item__label{
                display:block;
                height:18px !important;
                line-height:12px;
                font-size: 12px;
                font-weight: 500;
                color:#887e7e;
                padding-right: 0;
                margin-bottom: 10px;
                float: left;
            }
            .el-form-item__content
            {
                width: 100%;
                font-size: 14px;
                .el-cascader{
                  width: 100%;
                }
                .el-input{
                    height: 40px;
                    .el-input-group__append{
                      height: 40px;
                      background: #e7dfdf;
                      border-radius: 0 6px 6px 0;
                      padding: 0 10px;
                      border: 0;
                      color: #5d5d5d;
                    }
                    .el-input__inner{
                         &:hover{
                        outline: none;
                        border: 1px solid #887E7E;
                    }
                        &:focus{
                        outline: none;
                        border: 1px solid #FFB200;
                    }
                        line-height: 40px;
                        border: 1px solid #f8f5f5;
                        background: #f8f5f5;
                        border-radius: 6px;
                        padding: 0 12px;
                    }
                }
                .is-disabled{
                  .el-input__inner{
                    background-color: #f3ebeb;
                  }
                }
                .el-select{
                    width: 100%;
                }
            }
        }
        .is-error{
          .el-form-item__content{
            .el-input__inner{
              border-color: #d9021c !important;
            }
          }
        }
        .mt-btn{
          margin-bottom: 0;
          height: 68px;
          padding-right:0px;
            .el-form-item__content{
              height: 100%;
              display:flex;
              justify-content: center;
              align-items: flex-end;
              .el-button{
                  width: 170px;
                  height:40px;
                  color: #332929;
                  font-weight: 500;
                  padding-left: 26px;
                  padding-right: 26px;
                  border: none;
                  margin-left: 20px;
              }
              .search-btn{
                  background-color:#ffb200;
                  &:hover{
                       background-color: #FF8E00;
                  }
              }
              .reset-btn{
                    background-color:#f8f5f5;
                    &:hover{
                      background-color: #ffb200;
                  }
              }
            }

        }
    }
}
</style>
