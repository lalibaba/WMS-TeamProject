<template>
  <div>
    <TapeCruger class="big">
      <span slot="new">
        <el-form :inline="true" label-position="top">
          <el-form-item label="仓库">
            <el-select v-model="formInline.region" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select></el-form-item>
          <el-form-item label="库区">
            <el-select v-model="formInline.region" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="库位">
            <el-select v-model="formInline.name" style="width: 92%" placeholder="请选择">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="货主名称">
            <el-input v-model="formInline.name" style="width: 92%" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="货品名称">
            <el-input v-model="formInline.name" style="width: 92%" placeholder="请输入" />
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
    <Libraryfrom>
      <span slot="buttom">
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
            label="仓库名称"
            width="160"
          />
          <el-table-column
            align="center"
            prop="date"
            label="库区编号"
            width="160"
          />
          <el-table-column
            align="center"
            prop="name"
            label="库区名称"
            width="160"
          />
          <el-table-column
            align="center"
            prop="province"
            label="库位名称"
            width="200"
          />
          <el-table-column
            align="center"
            prop="city"
            label="货主编码"
            width="160"
          />
          <el-table-column
            align="center"
            prop="address"
            label="货主名称"
            width="160"
          />
          <el-table-column
            align="center"
            prop="zip"
            label="货品编码"
            sortable
            width="160"
          />
          <el-table-column
            align="center"
            prop="zip"
            label="货品条码"
            width="160"
          />
          <el-table-column
            align="center"
            prop="zip"
            label="货品名称"
            sortable
            width="160"
          />
          <el-table-column
            align="center"
            prop="zip"
            label="单位"
            width="160"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="总库存数"
            width="160"
            prop="zip"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="可用库存"
            width="160"
            prop="zip"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="冻结库存"
            width="160"
            prop="zip"
          />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">库存日志</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="el-pagination"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="9"
          @size-change="handleSizeChange"
        />
      </span>
    </Libraryfrom>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentPage: '',
      name: '',
      formInline: {
        region: '',
        name: ''
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
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
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
.el-pagination{
  text-align:center;
  margin-top:20px;
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
