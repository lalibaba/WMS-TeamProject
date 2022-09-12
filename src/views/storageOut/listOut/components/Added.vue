<template>
  <div>
    <div class="search">
      <div class="form-groud">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写出库基础信息" />
          <el-step title="填写承运商信息" />
          <el-step title="填写货品明细信息" />
        </el-steps>
      </div>
      <div v-if="qweok">
        <el-row :gutter="24">
          <el-form label-width="100px" label-position="top">
            <el-col :span="8">
              <el-form-item label="出库单号">
                <el-input
                  :disabled="true"
                  style="width:100%"
                  placeholder="HP008851"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库名称">
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库区名称">
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="24" style="margin-top: 12px">
          <el-form label-width="100px" label-position="top">
            <el-col :span="8">
              <el-form-item label="货主">
                <el-input
                  style="width:100%"
                  placeholder="请输入货主名称/编码"
                  suffix-icon="el-icon-search"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出库类型">
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input
                  style="width:100%"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="buttonBox">
          <el-button round @click="$router.go(-1)">返回</el-button>
          <el-button round @click="next">下一步</el-button>
        </div>
      </div>
      <div v-if="qweok2">
        <el-row :gutter="24">
          <el-form label-width="100px" label-position="top">
            <el-col :span="6">
              <el-form-item label="运货单号">
                <el-input
                  style="width:100%"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="承运商">
                <el-select v-model="value" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="计划出库时间">
                <el-date-picker type="date" placeholder="选择日期时间" style="width: 100%;" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="司机姓名">
                <el-input
                  style="width:100%"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="24">
          <el-form label-width="100px" label-position="top">
            <el-col :span="6">
              <el-form-item label="司机电话">
                <el-input
                  style="width:100%"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车牌号">
                <el-input
                  style="width:100%"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货人名称">
                <el-input
                  style="width:100%"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="buttonBox">
          <el-button round @click="btnOK">上一步</el-button>
          <el-button round @click="next">下一步</el-button>
        </div>
      </div>
      <div v-if="qweok3">
        <div class="tableInfo">
          <el-button round>添加货品</el-button>
          <el-button round>删除货品</el-button>
        </div>
        <div class="emptyTip">
          <span class="imgIcon" />
          <p data-v-6f7b1be2="">暂无货品</p>
        </div>
        <div class="buttonBox">
          <el-button round @click="btnOK">上一步</el-button>
          <el-button round @click="next">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Added',
  data() {
    return {
      qweok: true,
      qweok2: false,
      qweok3: false,
      active: 0,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) {
        this.active = 0
        this.qweok = true
        this.qweok3 = false
      } else if (this.active === 1) {
        this.qweok = false
        this.qweok2 = true
      } else if (this.active === 2) {
        this.qweok2 = false
        this.qweok3 = true
      }
      console.log(this.active)
    },
    btnOK() {
      if (this.active === 1) {
        this.active = 0
        this.qweok = true
        this.qweok2 = false
      } else if (this.active === 2) {
        this.active = 1
        this.qweok2 = true
        this.qweok3 = false
      }
    }
  }
}
</script>

<style lang='scss'>
  .search{
      background-color: #fff;
      border-radius: 12px;
      margin-top: 20px;
      margin-left: 29px;
      margin-right: 29px;
      padding: 30px;
      .form-groud{
        width: 600px;
        height: 100px;
        margin: 0 auto;
        margin-top: 56px;
      }
      .el-form-item__label{
        line-height: 0px;
        padding-left: 5px;
        font-size: 12px;
        font-weight: 500;
        color: #887e7e;
        padding-bottom: 12px;
      }
      .el-input__inner{
          border-radius: 6px;
          background: #f8f5f5;
        }
        .buttonBox{
          padding: 25px 0 0;
          border-top: 1px solid #f5efee;
          text-align: center;
          .el-button{
            width: 170px;
            height: 40px;
          }
        }
        .tableInfo{
          padding-bottom:18px;
          border-bottom: 1px solid #f5efee;
        }
        .emptyTip{
          text-align: center;
          padding: 100px 0;
          color: #b5abab;
          font-size: 14px;
          .imgIcon{
          width: 160px;
          height: 160px;
          display: inline-block;
          background: url('../../../../assets/404_images/empty.4300e933.png') no-repeat;
          background-size: contain;
        }
        }
  }
</style>
