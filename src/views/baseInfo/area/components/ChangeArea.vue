<template>
  <div class="app-container">
    <el-card class="my-card">
      <el-form ref="wareAreaForm" :model="wareAreaData" :inline="true" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="库区编号" required>
              <el-input v-model="wareAreaData.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属仓库" prop="warehouseId">
              <el-select v-model="wareAreaData.warehouseId" placeholder="请选择">
                <el-option v-for="item in warehouseId" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库区名称" prop="name">
              <el-input v-model="wareAreaData.name" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="wareAreaData.temperatureType" placeholder="请选择">
                <el-option v-for="item in wareTemplateType" :key="item.type" :label="item.name" :value="item.temperatureType" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="承重类型" prop="bearingType">
              <el-select v-model="wareAreaData.bearingType" placeholder="请选择">
                <el-option v-for="item in wareAreaBearType" :key="item.type" :label="item.name" :value="item.bearingType" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用途属性" prop="useType">
              <el-select v-model="wareAreaData.useType" placeholder="请选择">
                <el-option v-for="item in wareUserType" :key="item.type" :label="item.name" :value="item.useType" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人" prop="personName">
              <el-input v-model="wareAreaData.personName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="wareAreaData.phone" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="库区状态" prop="status">
              <el-radio-group v-model="wareAreaData.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="mt-btn">
          <el-button round class="reset-btn" @click="$router.back()">返回</el-button>
          <el-button round class="search-btn" @click="confirmSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { checkPhoneNum } from '@/utils/validate'
import { wareAreaBearType, wareTemplateType, wareUserType } from '@/api/constant/warehouse'
import { searchWareHouse, getWareHouseCode, addNewWareArea } from '@/api/baseInfo'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!checkPhoneNum(value) && value !== '') {
        this.wareAreaData.phone = ''
        return callback(new Error('请输入正确的电话号码'))
      } else {
        return callback()
      }
    }
    return {
      wareAreaData: {
        bearingType: '',
        code: '',
        warehouseId: '',
        useType: '',
        temperatureType: '',
        status: '1',
        phone: '',
        personName: '',
        name: ''
      },
      rules: {
        warehouseId: [{ required: true, message: '请选择仓库类型', trigger: 'blur' }],
        name: [{ required: true, message: '请输入库区名称', trigger: 'blur' }],
        temperatureType: [{ required: true, message: '请选择温度类型', trigger: 'blur' }],
        bearingType: [{ required: true, message: '请选择承重类型', trigger: 'blur' }],
        useType: [{ required: true, message: '请选择用途类型', trigger: 'blur' }],
        personName: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        status: [{ required: true, message: '请选择库区状态', trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }]
      },
      warehouseId: [],
      wareAreaBearType: wareAreaBearType,
      wareTemplateType: wareTemplateType,
      wareUserType: wareUserType
    }
  },
  async mounted() {
    // 判断是新增还是编辑修改
    if (this.$route.params.id !== 'null') {
      this.$route.meta.title = '编辑库区'
    //   this.getWareHouseDetail(this.$route.params.id)
    } else {
      this.wareAreaData.code = await getWareHouseCode('KQ')
    }
    this.$store.dispatch('tagsView/addView', this.$route)
    this.searchWareHouse()
  },
  methods: {
    async searchWareHouse() {
      this.warehouseId = await searchWareHouse({ status: '1' })
    },
    async confirmSubmit() {
      try {
        await this.$refs.wareAreaForm.validate()
        console.log(this.$route.params.id)
        this.$route.params.id !== 'null' ? await 'changeNewWarehouse(this.wareHouseData)' : await addNewWareArea(this.wareAreaData)
        this.$message.success('恭喜你，提交成功')
        this.$router.back()
        this.$refs.wareAreaForm.resetField()
      } catch (e) {
        console.log(e)
      }
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
            width: 100%;
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
          width: 100%;
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
