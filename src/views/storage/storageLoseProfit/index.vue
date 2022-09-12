<template>
  <div>
    <TapeCruger class="big">
      <span slot="new">
        <el-form :inline="true" label-position="top">
          <el-form-item label="盘点单号">
            <el-input v-model="name" style="width: 92%" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="盘点状态">
            <el-select v-model="formInline.region" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="盘点类型">
            <el-select v-model="formInline.name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="货主">
            <el-select v-model="formInline.name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="small">
          <el-row>
            <el-button type="warning" round>搜索</el-button>
            <el-button round>重置</el-button>
          </el-row>
        </div>
      </span>
    </TapeCruger>
    <libraryfrom>
      <span slot="buttom">
        <div class="upconter">
          <div class="smallconter">
            <span class="total">合计</span>
            <span class="ge">188个</span>
            <span class="yuan">10000.00元</span>
          </div>
        </div>
        <div>
          <el-table
            :row-class-name="TableRowClassName"
            :data="tableData"
            :cell-style="{padding:'0px'}"
            border
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="50"
            />
            <el-table-column
              align="center"
              prop="date"
              label="盘点单号"
              width="160"
            />
            <el-table-column
              align="center"
              prop="date"
              label="任务编号"
              width="160"
            />
            <el-table-column
              align="center"
              prop="name"
              label="任务状态"
              width="160"
            />
            <el-table-column
              align="center"
              prop="province"
              label="创建时间"
              width="200"
            />
            <el-table-column
              align="center"
              prop="city"
              label="计划作业时间"
              width="160"
            />
            <el-table-column
              align="center"
              prop="address"
              label="货主"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="盘点维度"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="盘点类型"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="仓库"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              prop="zip"
              label="创建人"
              width="160"
            />
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              width="160"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </span>
    </libraryfrom>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      formInline: {
        name: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    TableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return ''
      } else {
        return 'statistics-warning-row'
      }
    }
  }
}
</script>

<style scoped>
.big{
  position: relative;
}
.small{
    position: absolute;
    top: 47px;
    right: 15px;
}
.upconter{
 height: 70px;
 position: relative;
}
.smallconter{
  width: 186.5px;
  height: 30px;
  background: #fff9eb;
  border: 1px solid #ffb200;
  position:absolute;
	left: 20px;
	top: 0;
	bottom: 0;
	margin: auto;
  font-size: 14px;
  font-family: PingFangSC-Regular,PingFang SC;
  font-weight: 400;
  line-height: 32px;
}
.total{
  color: #332929;
  margin-right: 9px;
  margin-left: 9px;
}
.ge{
  padding-right: 18px;
  color: #ffb200;
}
.yuan{
  color: #ffb200;
}
</style>
<style>
.el-form-item__label{
  line-height: 0;
}
.el-form--inline .el-form-item{
  margin-left: 20px;
}
.el-form-item{
width: 25%;
}
.el-input .el-input__inner:focus{
border: 1px solid #ffb200!important;
}
.el-input{
margin-top: 5px ;
}
.el-input__inner{
  background: #f8f5f5;
}
.el-form--inline .el-form-item__label{
  font-size: 12px;
  color: #887e7e;
}
.el-table th{
  background: #f9f6ee;
}
.el-table__row.statistics-warning-row{
  background-color: #fdfcf9;
}
.el-table__body .el-table__row.hover-row td {
  background-color: #f9f6ee !important;
}
.el-button--text{
  color:rgb(255, 178, 0);
}
/* .el-select .el-input.is-focus .el-input__inner:hover {
  border: 2px solid red !important;
} */
.el-pager li.active{
    color: #ffb200;
}
.el-select .el-input.is-focus .el-input__inner{
  border: 1px solid #ffb200!important;
}
.el-select-dropdown__item.selected{
  color: #ffb200;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #fff6e2;
}
</style>
