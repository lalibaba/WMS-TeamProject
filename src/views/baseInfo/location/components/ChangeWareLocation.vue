<template>
  <div class="app-container">
    <el-card class="my-card">
      <el-form ref="wareLocationForm" :model="wareLocationData" :inline="true" :rules="rules">

        <el-form-item class="mt-btn">
          <el-button round class="reset-btn" @click="$router.back()">返回</el-button>
          <el-button round class="search-btn">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wareLocationData: {

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
