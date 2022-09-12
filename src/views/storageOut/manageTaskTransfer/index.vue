<template>
  <div class="ground">
    <div class="search">
      <div class="demo-input-size">
        <el-row :gutter="130">
          <el-form label-width="120px" label-position="top">
            <el-col :span="8">
              <el-form-item label="交接编号">
                <el-input
                  style="width:155%"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出库单号">
                <el-input
                  style="width:155%"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承运商">
                <el-input
                  style="width:155%"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div class="bunok" style="padding-left:185px">
        <el-button round>搜索</el-button>
        <el-button round>重置</el-button>
      </div>
    </div>
    <div class="result">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center"
        />
        <el-table-column
          prop="date"
          label="交接编号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="name"
          label="出库单号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="address"
          label="创建时间"
          sortable
          width="200"
          align="center"
        />
        <el-table-column
          prop="sear"
          label="创建人"
          width="160"
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="承运商"
          width="160"
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="运单号"
          width="160"
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="交接状态"
          width="180"
          align="center"
          column-key="date"
          :filters="filters"
        />
        <el-table-column
          prop="qeir"
          label="交接员"
          width="160"
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="交接完成时间"
          width="200"
          sortable
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="交接司机"
          width="160"
          align="center"
        />
        <el-table-column
          prop="qeir"
          label="交接司机电话"
          width="160"
          align="center"
        />
        <el-table-column
          label="操作"
          width="160"
          align="center"
          fixed="right"
        />
      </el-table>
      <div class="block">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="10"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterHandler',
  data() {
    return {
      tableData: [{
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      }, {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      }, {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      }, {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      },
      {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      },
      {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      },
      {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      },
      {
        date: 'HP000015',
        name: '66666666',
        address: 'B2B出库',
        sear: '王姐',
        qeir: '1号仓库'
      }
      ],
      filters: [{ text: '新建', value: '' },
        { text: '新建', value: '' },
        { text: '新建', value: '' },
        { text: '新建', value: '' }],
      currentPage4: 1
    }
  }
}
</script>

<style lang='scss'>
      .ground{
        background-color: #fdfafa;
        .search{
      display: flex;
      height: 127px;
      align-items: center;
      padding-left: 30px;
      padding-top: 20px;
      background-color: #fff;
      border-radius: 12px;
      margin: 20px 25px;
      .demo-input-size{
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
      }
    }
  .result{
    margin: 0 25px;
    background-color: #fff;
    border-radius: 12px;
    .el-table th{
      background: #f9f6ee;
      .el-table th>.cell{
        font-size: 13px;
        font-weight: 500;
        color: #887e7e;
      }
    }
    .el-table .cell{
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      color: #332929;
    }
    .el-button{
      color: #fff;
    }
    .tableInfo{
      padding: 20px 30px;
    }
    .el-button--text{
      color: #ffb200 !important;
    }
    .block{
    margin: 0 auto;
    text-align: center;
    padding-top: 18px;
    padding-bottom: 34px;
    .el-pager li.active{
      color: #ffb200;
    }
    }
  }
      }
</style>
