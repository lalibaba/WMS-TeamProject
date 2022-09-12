<template>
  <div class="app-container">
    <el-card class="my-card">
      <el-form ref="wareLocationForm" :model="wareLocationData" :inline="true" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="库区" prop="location">
              <el-cascader
                ref="local"
                v-model="wareLocationData.location"
                :props="props"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位编号">
              <el-input v-model="wareLocationData.code" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库位名称">
              <el-input v-model="wareLocationData.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="温度类型" prop="temperatureType">
              <el-select v-model="wareLocationData.temperatureType" placeholder="请选择">
                <el-option v-for="item in wareTemplateType" :key="item.type" :label="item.name" :value="item.temperatureType" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="承重类型" prop="bearingType">
              <el-select v-model="wareLocationData.bearingType" placeholder="请选择">
                <el-option v-for="item in wareAreaBearType" :key="item.type" :label="item.name" :value="item.bearingType" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用途属性" prop="useType">
              <el-select v-model="wareLocationData.useType" placeholder="请选择">
                <el-option v-for="item in wareUserType" :key="item.type" :label="item.name" :value="item.useType" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库区状态" prop="status">
              <el-radio-group v-model="wareLocationData.status">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="承载体积">
              <el-input v-model="wareLocationData.maxVolume" placeholder="请输入"><template slot="append">m³</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载上限">
              <el-input v-model="wareLocationData.maxNum" placeholder="请输入"><template slot="append">个</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承载重量">
              <el-input v-model="wareLocationData.maxWeight" placeholder="请输入"><template slot="append">Kg</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <el-form-item label="库位排/列/层">
              <el-input v-model="wareLocationData.locationRow" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <template #label>
                <span style="color:#fff">库位排/列/层</span>
              </template>
              <el-input v-model="wareLocationData.locationColumn" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <template #label>
                <span style="color:#fff">库位排/列/层</span>
              </template>
              <el-input v-model="wareLocationData.locationLayer" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="库位长/宽/高">
              <el-input v-model="wareLocationData.locationLength" placeholder="请输入"><template slot="append">cm</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <template #label>
                <span style="color:#fff">库位长/宽/高</span>
              </template>
              <el-input v-model="wareLocationData.locationWidth" placeholder="请输入"><template slot="append">cm</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <template #label>
                <span style="color:#fff">库位长/宽/高</span>
              </template>
              <el-input v-model="wareLocationData.locationHigh" placeholder="请输入"><template slot="append">cm</template></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="mt-btn">
          <el-button round class="reset-btn" @click="$router.back()">返回</el-button>
          <el-button round class="search-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { wareAreaBearType, wareTemplateType, wareUserType } from '@/api/constant/warehouse'
import { searchWareHouse, getWareHouseCode, searchAllWareArea } from '@/api/baseInfo'
export default {
  data() {
    return {
      wareLocationData: {
        areaId: '',
        bearingType: '',
        code: '',
        location: [],
        locationColumn: null,
        locationHigh: '',
        locationLayer: null,
        locationLength: '',
        locationRow: null,
        locationWidth: '',
        maxNum: '',
        maxVolume: '',
        maxWeight: '',
        name: '',
        status: '1',
        temperatureType: '',
        useType: '',
        warehouseId: ''
      },
      rules: {},
      options: [],
      props: {
        value: 'id',
        label: 'name',
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, data } = node
          let nodes
          switch (level) {
            case 0:
              nodes = await searchWareHouse({ status: '1' })
              break
            case 1:
              nodes = await searchAllWareArea({ warehouseId: data.id, status: data.status })
              nodes.forEach(
                (item) => { item.leaf = 2 }
              )
              break
          }
          resolve(nodes)
        }
      },
      wareAreaBearType: wareAreaBearType,
      wareTemplateType: wareTemplateType,
      wareUserType: wareUserType
    }
  },
  async mounted() {
    // 判断是新增还是编辑修改
    if (this.$route.params.id !== 'null') {
      this.$route.meta.title = '编辑库位'
    //   this.getWareAreaDetail(this.$route.params.id)
    } else {
      this.wareLocationData.code = await getWareHouseCode('KW')
    }
    this.$store.dispatch('tagsView/addView', this.$route)
  },
  methods: {
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
                .el-input-group--append{
                    .el-input__inner{
                        border-end-end-radius: 0;
                        border-top-right-radius: 0;
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
